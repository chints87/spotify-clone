import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collabortive',
  'user-read-mail',
  'straming',
  'user-read-private',
  'user-library-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-follow-read',
].join(',');

const params = {
  scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOSPOTIFY_PUBLIC_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
