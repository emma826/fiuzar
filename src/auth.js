import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                let user = null;

                if (!credentials.email && !credentials.password) {
                    return null
                }

                if (credentials.email == process.env.ADMIN_EMAIL || credentials.password == process.env.ADMIN_PASSWORD) {
                    user = { _id: 1, name: "Admin", email: process.env.ADMIN_EMAIL, role: "ADMIN" }
                    return user
                }

                try {

                    throw new Error("No user");

                } catch (error) {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        // signOut: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id
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