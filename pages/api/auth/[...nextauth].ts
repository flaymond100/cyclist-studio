import NextAuth from "next-auth";
import StravaProvider from "next-auth/providers/strava";

async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://www.strava.com/oauth/token?" +
      new URLSearchParams({
        client_id: process.env.STRAVA_ID!,
        client_secret: process.env.STRAVA_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  secret: process.env.STRAVA_SECRET,
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID!,
      clientSecret: process.env.STRAVA_SECRET!,
      authorization: {
        params: {
          scope: "activity:read_all",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt(data: any) {
      const { token, account, user } = data;

      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() > token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session(data: any) {
      const { session, token } = data;
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },
};

// noinspection JSUnusedGlobalSymbols
export default NextAuth(authOptions as any);
