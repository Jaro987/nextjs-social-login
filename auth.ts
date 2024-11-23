import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { QueryResultRow, sql } from '@vercel/postgres';
import { UserRole, User, UserSettings } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { createUser, createUserSettings } from './app/lib/actions';
import { getRandomColor, mapDBUserSettingsToUserSettings } from './app/lib/utils';
import { sendCreatedUserEmail } from './app/lib/mails';
import { fetchSettingsByUserId } from './app/lib/data';


export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

const getUserSettings = async (user?: User): Promise<UserSettings | undefined> =>
    user ? mapDBUserSettingsToUserSettings(await fetchSettingsByUserId(user.id)) : undefined;

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
            const createdUser = await getUserByEmail(profile.email);
            if (createdUser) {
                await createUserSettings({ userId: createdUser.id });
                await sendCreatedUserEmail({ recipientMailAddress: createdUser?.email, recipientName: createdUser?.name, origin: profile.password });
            }
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
                token.settings = user.settings;
            }
            return token
        },
        session({ session, token }) {
            session.user.role = token.role;
            session.user.phone = token.phone;
            session.user.settings = token.settings;
            return session
        }
    },
    providers: [
        Facebook({
            async profile(profile) {
                await createUserIfNotExists({ ...profile, password: 'facebook' });
                const user = await getUserByEmail(profile.email);
                const userSettings = await getUserSettings(user);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    role: user?.role,
                    phone: user?.phone,
                    settings: userSettings
                };
            }
        }),
        Google({
            async profile(profile) {
                await createUserIfNotExists({ ...profile, password: 'google' });
                const user = await getUserByEmail(profile.email);
                const userSettings = await getUserSettings(user);
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: user?.role,
                    phone: user?.phone,
                    settings: userSettings
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
                    const userSettings = await getUserSettings(user);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return {
                        name: user.name,
                        email: user.email,
                        image: user.image_url,
                        role: user.role,
                        phone: user.phone,
                        settings: userSettings
                    };
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});