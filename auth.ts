import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { createUser } from './app/lib/actions';

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
        console.log('userData', userData);

        await createUser(userData);

    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Facebook({
            async profile(profile) {
                await createUserIfNotExists(profile);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                };
            }
        }),
        Google({
            async profile(profile) {
                await createUserIfNotExists(profile);
                console.log('profile', profile);

                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                };
            }
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
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});