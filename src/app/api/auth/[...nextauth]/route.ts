import { API_BASE_URL } from "@/app/config/constants";
import { assert } from "console";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", placeholder: "Enter username" },
                password: { label: "Password", placeholder: "Enter password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${API_BASE_URL}/auth/authenticate`, {
                        method: "POST",
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                        headers: { 
                            "Content-Type": "application/json",
                            "accept": "application/json"
                         },
                    });

                    if (!res.ok) {
                        return null;
                    }

                    const parsedResponse: any = await res.json();

                    const data = parsedResponse;

                    //  console.log("DATA ", data)

                    // localStorage.setItem('user', JSON.stringify(data.user));


                    return {
                        ...credentials,
                        avatar: data.user.logoImage,
                        name: data.user.name,
                        id: data.user.id.toString(),
                        jwt: data.accessToken,
                    };

                    // return {
                    //     ...credentials,
                    //     // name: .user.name,
                    //     // id: data.user.id.toString(),
                    //     jwt: parsedResponse.access_token,
                    // };

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
                    avatar: user.avatar,
                    jwt: user.jwt,
                };
            }
            return token;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            if (token) {
                session.jwt = token.jwt;
                session.user.avatar = token.avatar
            }
            return session;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/dashboard`;
        }
    },
    events: {
       
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }