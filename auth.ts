import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { QueryResultRow, sql } from '@vercel/postgres';
import { UserRole, User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { createUser } from './app/lib/actions';
import { getRandomColor } from './app/lib/utils';


export async function getUser(email: string): Promise<User | undefined> {
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
    const user = await getUser(profile.email);
    if (!user) {
        const userData = new FormData();
        userData.append('name', profile.name);
        userData.append('email', profile.email);
        userData.append('image', profile.picture.data.url);
        userData.append('password', profile.password);
        userData.append('role', UserRole.USER);
        userData.append('color', getRandomColor());

        const result = await createUser(userData);
        return (result as QueryResultRow).rowCount > 0 ? 'created' : 'existed';

    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        session({ session, token }) {
            session.user.role = token.role
            return session
        }
    },
    providers: [
        Facebook({
            async profile(profile) {
                await createUserIfNotExists({ ...profile, password: 'facebook' });
                const user = await getUser(profile.email);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    role: user?.role
                };
            }
        }),
        Google({
            async profile(profile) {
                await createUserIfNotExists({ ...profile, password: 'google' });
                const user = await getUser(profile.email);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: user?.role
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
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return {
                        name: user.name,
                        email: user.email,
                        image: user.image_url,
                        role: user.role
                    };
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});