import { sql } from '@vercel/postgres';
import {
  CalendarEvent,
  CalendarUser,
  CustomerField,
  CustomersTableType,
  DBUserSettings,
  EventStatus,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  User,
  UserRole,
  UserSettings,
  // UserSettings,
} from './definitions';
import { formatCurrency, mapDBUserSettingsToUserSettings } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  //TODO: alter table invoices - switch to users instead of customers
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, users.name, users.image_url, users.email, invoices.id
      FROM invoices
      JOIN users ON invoices.customer_id = users.id
      JOIN calendar_events ON invoices.event_id = calendar_events.id
      WHERE calendar_events.status = ${EventStatus.ACTIVE}
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
      SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS "paid",
      SUM(CASE WHEN invoices.status = 'pending' AND calendar_events.status = 'active' THEN invoices.amount ELSE 0 END) AS "pending"
    FROM invoices
    JOIN calendar_events ON invoices.event_id = calendar_events.id
  `;


    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
          invoices.id,
          invoices.amount,
          invoices.date,
          invoices.status,
          users.name,
          users.email,
          users.image_url,
          calendar_events.status AS event_status,
          calendar_events.date AS event_date
      FROM invoices
      JOIN users ON invoices.customer_id = users.id
      JOIN calendar_events ON invoices.event_id = calendar_events.id
      WHERE
          calendar_events.status = ${EventStatus.ACTIVE} AND
          (
              users.name ILIKE ${`%${query}%`} OR
              users.email ILIKE ${`%${query}%`} OR
              invoices.amount::text ILIKE ${`%${query}%`} OR
              invoices.date::text ILIKE ${`%${query}%`} OR
              invoices.status ILIKE ${`%${query}%`}
          )
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM users
      WHERE role = ${UserRole.USER}
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchAllCalendarEvents() {
  try {
    const data = await sql<CalendarEvent>`
      SELECT 
        ce.id AS event_id, 
        ce.date, 
        ce.status,
        ce.adults,
        ce.children,
        ce.infants,
        ce.price,
        u.id AS user_id, 
        u.name, 
        u.email, 
        u.color,
        u.image_url
      FROM calendar_events ce
      JOIN users u ON ce.user_id = u.id
      WHERE ce.status = 'active';
    `;

    const events = data.rows.map((event) => ({
      ...event,
      price: event.price / 100,
    }));

    return events;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all events.');
  }
}

export async function fetchAllCalendarEventsForAdminOrHost() {
  try {
    const data = await sql<CalendarEvent>`
    SELECT
    ce.id AS event_id, 
    ce.date,
    ce.status,
    ce.adults,
    ce.children,
    ce.infants,
    ce.price,
    u.id AS user_id, 
    u.name, 
    u.email, 
    u.color,
    u.image_url,
    COALESCE(
        jsonb_agg(
            jsonb_build_object(
                'id', c.id,
                'event_id', c.event_id,
                'cancelled_by', cu.name,
                'cancelled_at', c.cancelled_at,
                'revoked_by', cu.name,
                'revoked_at', c.revoked_at
            ) ORDER BY c.cancelled_at ASC  -- Ordering cancellations by cancelled_at date in ascending order
        ) FILTER (WHERE c.id IS NOT NULL), 
        '[]'::jsonb
    ) AS cancellations
FROM calendar_events ce
JOIN users u ON ce.user_id = u.id
LEFT JOIN cancellation c ON ce.id = c.event_id
LEFT JOIN users cu ON c.cancelled_by = cu.id
GROUP BY ce.id, u.id;
`;

    const events = data.rows.map((event) => ({
      ...event,
      price: event.price / 100,
    }));

    return events;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all events.');
  }
}

export async function fetchAllUsersForAdmin() {
  try {
    const users = await sql<CalendarUser>`SELECT 
      u.id AS id,
      u.name AS name,
      u.email AS email,
      u.image_url AS image_url,
      u.color AS color,
      u.role AS role,
      COALESCE(
        json_agg(
          json_build_object(
            'event_id', e.id,
            'date', e.date,
            'status', e.status,
            'cancellations', (
              SELECT json_agg(
                json_build_object(
                  'event_id', c.event_id,
                  'cancelled_at', c.cancelled_at,
                  'cancelled_by', cb.name,
                  'revoked_at', c.revoked_at,
                  'revoked_by', rb.name
                )
              )
              FROM Cancellation c
              LEFT JOIN Users cb ON c.cancelled_by = cb.id
              LEFT JOIN Users rb ON c.revoked_by = rb.id
              WHERE c.event_id = e.id
            )
          )
        ) FILTER (WHERE e.id IS NOT NULL), '[]'
      ) AS events
    FROM 
      Users u
    LEFT JOIN 
      Calendar_Events e ON u.id = e.user_id
    GROUP BY 
      u.id
    ORDER BY 
      u.id;`;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchSettingsByUserId(id: string) {
  try {
    const data = await sql<DBUserSettings>`
      SELECT
        *
      FROM user_settings
      WHERE user_settings.user_id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user settings.');
  }
}

export async function fetchUserEmailsWithHostRole() {
  try {
    const data = await sql<Partial<User>>`
      SELECT
        email
      FROM users
      WHERE role = 'host';
    `;
    return data.rows.map(row => row.email) as string[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user settings.');
  }
}

export async function getUserMailSettingsByEmail({ email }: { email: string }) {
  try {
    const data = await sql<DBUserSettings>`
    SELECT 
      us.id AS id,
      us.user_id,
      us.create_profile,
      us.edit_my_profile,
      us.create_my_event,
      us.cancel_my_event,
      us.revoke_my_event,
      us.seven_day_reminder,
      us.one_day_reminder
    FROM 
      users u
    JOIN 
      user_settings us 
    ON 
      u.id = us.user_id
    WHERE 
      u.email = ${email};
  `;
    return mapDBUserSettingsToUserSettings(data.rows[0]) as UserSettings;
  } catch (error) {
    console.error('Database Error:', error);
  }
}