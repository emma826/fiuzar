import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET }); // Ensure the secret matches

    const protectedPaths = ["/app", "/admin"];
    const { pathname } = req.nextUrl;

    // Check if the route is protected and if the user is authenticated
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        if (!token) {
            // Redirect to login if not authenticated
            const loginUrl = new URL("/login", req.url);
            return NextResponse.redirect(loginUrl);
        }

        // Check if the user is an admin for admin paths
        if (pathname.startsWith("/admin") && !token.id.startsWith("Admin_")) {
            // Redirect to login if the user is not an admin
            const loginUrl = new URL("/login", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/app/:path*", "/admin/:path*"],
};
