import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authConfig: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email }).lean();
        if (!user) return null;
        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
        } satisfies { id: string; name?: string | null; email?: string | null; role?: "ADMIN" | "STAFF" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: { role?: "ADMIN" | "STAFF" } | null }) {
      if (user && "role" in user) {
        token.role = user.role as "ADMIN" | "STAFF" | undefined;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "STAFF" | undefined;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);


