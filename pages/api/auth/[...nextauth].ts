import NextAuth from "next-auth";
import StravaProvider from "next-auth/providers/strava";

export const authOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID || "",
      clientSecret: process.env.STRAVA_SECRET || "",
      authorization: {
        params: {
          scope: "activity:read_all",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session(data: any) {
      data.session.accessToken = data.token.accessToken;
      data.session.refreshToken = data.token.refreshToken;
      data.session.user.id = data.token.id;
      return data.session;
    },
    async jwt(data: any) {
      if (data.account) {
        data.token.accessToken = data.account.access_token;
        data.token.refreshToken = data.account.refresh_token;
        data.token.id = data.profile.id;
      }
      return data.token;
    },
  },
};

// noinspection JSUnusedGlobalSymbols
export default NextAuth(authOptions as any);
