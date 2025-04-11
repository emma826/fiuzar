import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                if (!credentials.email && !credentials.password) {
                    return null;
                }

                if (
                    credentials.email === process.env.ADMIN_EMAIL &&
                    credentials.password === process.env.ADMIN_PASSWORD
                ) {
                    user = { _id: 1, name: "Admin", email: process.env.ADMIN_EMAIL, role: "ADMIN" };
                    return user;
                }

                try {
                    throw new Error("No user");
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
});
