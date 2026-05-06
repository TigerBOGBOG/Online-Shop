import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (user && user.password && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role ?? 'user'
          }
        } else {
          throw new Error('Invalid email or password')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {  // ← อันเดียว รวมทุก callback ไว้ที่นี่
    async redirect({ url, baseUrl }) {
      return baseUrl + '/profile'
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role ?? 'user'
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id ?? ''
        session.user.role = token.role ?? 'user'
      }
      return session
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }