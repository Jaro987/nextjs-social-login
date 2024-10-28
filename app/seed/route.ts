import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

// async function seedCalendarEvents() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

// await client.sql`
//   CREATE TABLE IF NOT EXISTS calendar_events (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     date VARCHAR(255) NOT NULL,
//     user_id UUID NOT NULL,
//     CONSTRAINT fk_user
//       FOREIGN KEY(user_id)
//       REFERENCES users(id)
//       ON DELETE CASCADE
//   );
// `;

//   // You can insert calendar events here, similar to other seeding functions
// }


// for adding image url to users:
// ALTER TABLE users
// ADD COLUMN image_url VARCHAR(255);
// UPDATE users
// SET image_url = md5(random()::text) || '.jpg';

// for adding color to users:
// ALTER TABLE users
// ADD COLUMN color VARCHAR(255);

// for adding role to users:
// ALTER TABLE users
// ADD COLUMN role VARCHAR(255);

//updating users with roles:
// UPDATE users
// SET role='host'
// WHERE users.id = 'ea5dd26b-5281-4a70-93bf-aa811bec9954'

//add user
// INSERT INTO users (name, email, password, image_url, color, role)
// VALUES ('Jaroslav Firmin', 'jaroslav.mucaji@badboy.solutions', '$2b$10$fKk/zeflsh6jx2nIO2XKrepnJCY0sOlK8O.S4CH.nM6jAq75mLZQW', '/jaroslav-firmin.png', '#02f5d4', 'user')


// update users
// set image_url='/ed-profile.png'
// where users.id = '1602aba9-8e45-4816-b0ff-8d7961d11600' (Jaroslav Firmin)


//create cancellation table
// await client.sql`
// CREATE TABLE IF NOT EXISTS cancellation (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//      event_id UUID NOT NULL,
//      cancelled_at TIMESTAMP NOT NULL,
//      cancelled_by UUID NOT NULL,
//      revoked_at TIMESTAMP,
//      revoked_by UUID,
  
//      FOREIGN KEY (event_id) REFERENCES calendar_events(id),
//      FOREIGN KEY (cancelled_by) REFERENCES users(id),
//      FOREIGN KEY (revoked_by) REFERENCES users(id)
//   );
//`

// for adding status to calendar_events:
// ALTER TABLE calendar_events
// ADD COLUMN status VARCHAR(255);

// INSERT INTO cancellation (event_id, cancelled_at, cancelled_by)
// VALUES ('ea5dd26b-5281-4a70-93bf-aa811bec9954', '2023-05-01 10:00:00', 'ea5dd26b-5281-4a70-93bf-aa811bec9954')