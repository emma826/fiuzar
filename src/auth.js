import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { query } from "./lib/db";
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
                    return { id: "Admin_001", name: "Admin", email: process.env.ADMIN_EMAIL, role: "ADMIN" };
                }

                try {
                    const queryText = "SELECT * FROM users WHERE email = $1";
                    const { rows: get_email } = await query(queryText, [credentials.email]);
                    const user = get_email[0];

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const verify_password = bcrypt.compareSync(credentials.password, user.password);
                    if (!verify_password) {
                        throw new Error("Invalid password");
                    }

                    return user;
                } catch (error) {
                    console.error("Error during authentication:", error);
                    throw new Error("Authentication failed");
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            return session
        }
    }
})