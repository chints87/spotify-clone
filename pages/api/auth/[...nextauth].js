import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from 'lib/spotify';

const refreshAccessToken = async (token) => {
  try {
    // Set tokens on spotify webapi
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    // Calling function on the spotify webapi to get refresh token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshAccessToken.expires_in * 1000,
      // It returns the right operand ( rightExpression ) if the left operand
      // ( leftExpression ) is null or undefined .
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
      // Authentication request to spotify. This is specific url given
      // by the provider
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  // Token received from spotify gets encrypted with this secret
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in and since there is no token
      if (account && user) {
        console.log('Logged in');
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Return previous token if access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log('Access token valid');
        return token;
      }

      // Access token expires, then get new access token using refresh token
      console.log('Access token expired');
      return refreshAccessToken(token);
    },

    // To make contents available on the browser
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
