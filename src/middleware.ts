import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/login", "/forgot-password", "/confirm-password"];

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname;

        const isAuth = await getToken({ req });

        const isAccessingPublicRoute = publicRoutes.some((route) =>
            pathname.startsWith(route)
        );

        if (isAccessingPublicRoute) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }

            return NextResponse.next();
        }

        if (!isAuth && !isAccessingPublicRoute) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);