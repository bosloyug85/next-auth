import { API_BASE_URL, users } from "@/app/config/constants";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", placeholder: "Enter email" },
                password: { label: "Password", placeholder: "Enter password" }
            },
            async authorize(credentials) {
                // if (!credentials || !credentials.email || !credentials.password) {
                //     return null;
                // }
                // const user = users.find((item) => item.email === credentials.email);

                // if (user?.password === credentials.password) {
                //     return user;
                // }

                // return null;
                try {
                    const res = await fetch(`${API_BASE_URL}/auth/login`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!res.ok) {
                        return null;
                    }

                    const parsedResponse: any = await res.json();

                    const data = parsedResponse.data;

                    return {
                        ...credentials,
                        name: data.user.name,
                        id: data.user.id.toString(),
                        jwt: data.token,
                    };
                } catch (e) {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/logout",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }: { token: any, user: any }) => {
            if (user) {
                return {
                    ...token,
                    jwt: user.jwt,
                };
            }
            return token;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            if (token) {
                session.jwt = token.jwt;
            }
            return session;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/dashboard`;
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }