import { UserRole } from '../app/lib/definitions';
import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
    interface Session {
        user?: DefaultUser & { id: string; role?: UserRole };
    }
    interface User extends DefaultUser {
        role?: UserRole;
        phone?: string;
    }
}