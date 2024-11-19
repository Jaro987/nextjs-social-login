import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { QueryResultRow, sql } from '@vercel/postgres';
import { UserRole, User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { createUser, createUserSettings } from './app/lib/actions';
import { getRandomColor } from './app/lib/utils';


export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createUserIfNotExists(profile: any) {
    const user = await getUserByEmail(profile.email);
    if (!user) {
        const userData = new FormData();
        userData.append('name', profile.name);
        userData.append('email', profile.email);
        userData.append('image', profile.picture.data.url);
        userData.append('password', profile.password);
        userData.append('role', UserRole.USER);
        userData.append('color', getRandomColor());

        const result = await createUser(userData);
        if ((result as QueryResultRow).rowCount > 0) {
            const createdUser = await getUserByEmail(profile.email)
            await createUserSettings({ userId: createdUser?.id })
        }
        return (result as QueryResultRow).rowCount > 0 ? 'created' : 'existed';

    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.phone = user.phone;
            }
            return token
        },
        session({ session, token }) {
            session.user.role = token.role;
            session.user.phone = token.phone;
            return session
        }
    },
    providers: [
        Facebook({
            async profile(profile) {
                await createUserIfNotExists({ ...profile, password: 'facebook' });
                const user = await getUserByEmail(profile.email);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    role: user?.role,
                    phone: user?.phone
                };
            }
        }),
        Google({
            async profile(profile) {
                await createUserIfNotExists({ ...profile, password: 'google' });
                const user = await getUserByEmail(profile.email);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: user?.role,
                    phone: user?.phone
                };
            },
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return {
                        name: user.name,
                        email: user.email,
                        image: user.image_url,
                        role: user.role,
                        phone: user.phone
                    };
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});