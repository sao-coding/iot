import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: { scope: "openid https://www.googleapis.com/auth/fitness.activity.read" },
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
            return { ...session, accessToken: token.accessToken }
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
