// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image_url: string;
  phone?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
  event_status: EventStatus | null;
  event_date: string | null;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export enum UserRole {
  ADMIN = 'admin',
  HOST = 'host',
  USER = 'user'
}

export type CalendarUser = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  color: string;
  role: UserRole;
  events: CalendarEvent[];
  phone?: string
}

export type CalendarEvent = {
  event_id: string;
  date: string;
  user_id: string;
  name: string;
  email: string;
  color: string;
  image_url: string;
  cancellations?: Cancellation[] | null;
  status: EventStatus;
  adults: number;
  children: number;
  infants: number;
  price: number;
}

export type CalendarEventObj = {
  id: string;
  title: string;
  startStr: string;
  backgroundColor: string;
  extendedProps: {
    image_url: string,
    email: string,
    phone: string,
    show: boolean,
    myEvent: boolean,
    cancellations: Cancellation[] | null,
    status: EventStatus,
    adults: number;
    children: number;
    infants: number;
    price: number;
  }
}

export enum EventStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

export enum CreateEventError {
  DATE_BOOKED = 'DATE_BOOKED',
  NO_USER = 'NO_USER'
}

export type Cancellation = {
  event_id: string | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
  revoked_at: string | null;
  revoked_by: string | null;
}

export type UserSettings = {
  id: string;
  userId: string;
  createProfile: boolean;
  editMyProfile: boolean;
  createMyEvent: boolean;
  cancelMyEvent: boolean;
  revokeMyEvent: boolean;
  sevenDayReminder: boolean;
  oneDayReminder: boolean;
}

export type DBUserSettings = {
  id: string;
  user_id: string;
  create_profile: boolean;
  edit_my_profile: boolean;
  create_my_event: boolean;
  cancel_my_event: boolean;
  revoke_my_event: boolean;
  seven_day_reminder: boolean;
  one_day_reminder: boolean;
}