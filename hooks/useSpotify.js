import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import spotifyApi from '../lib/spotify';

export default function useSpotify() {
  // This function requests the user to sign in
  // again if there is a session error, else attaches
  // a access token to it to access resources
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }
      // Ensure NEXT_PUBLIC is added to the env var name for access to the browser
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}
