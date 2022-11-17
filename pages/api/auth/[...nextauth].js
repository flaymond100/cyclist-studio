import NextAuth from "next-auth";
import StravaProvider from "next-auth/providers/strava";

export const authOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID,
      clientSecret: process.env.STRAVA_SECRET,
    }),
  ],
};

// noinspection JSUnusedGlobalSymbols
export default NextAuth(authOptions);
