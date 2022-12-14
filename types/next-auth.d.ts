import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    session: {
      accessToken: string;
      expires: string;
      refreshToken: string;
      user: { name: string; id: number; image: string; name: string };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    token: number;
  }
}
