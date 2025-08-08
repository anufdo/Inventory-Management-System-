import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "ADMIN" | "STAFF";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "ADMIN" | "STAFF";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "STAFF";
  }
}



