import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read",
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            console.log("account", account, "profile", profile)
            return true
        },
        async jwt({ token, account, profile }) {
            if (account) {
                return { ...token, accessToken: account.access_token }
            }
            return token
        },
        async session({ session, token }) {
            // console.log("session", session, "token", token)
            // return { ...session, accessToken: token.accessToken }
            session.user.accessToken = token.accessToken as string
            return session
        },
    },
    // pages: {
    //     // signIn: "/login",
    // },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
}

export default authOptions
