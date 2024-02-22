import { NextAuthOptions } from "next-auth"
import type { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account", account, "profile", profile)
      return true
    },
    async jwt({ token, account, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email as string
        }
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (account) {
        return { ...token, id: dbUser.id, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      // console.log("session", session, "token", token)
      // return { ...session, accessToken: token.accessToken }
      if (token) {
        // session.user.accessToken = token.accessToken as string
        return {
          ...session,
          user: { ...session.user, id: token.id, accessToken: token.accessToken }
        }
      }
      return session
    }
  },
  // pages: {
  //     // signIn: "/login",
  // },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  }
}

export default authOptions
