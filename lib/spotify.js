import SpotifyWebApi from 'spotify-web-api-node';

// Oauth Client id requests user consent so my app can
// access user's data and maybe provider's features

// This informs the user to choose the information
// that will be shared with app
const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collabortive',
  'user-read-mail',
  'streaming',
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

// Creates a key/pair value?
const queryParamString = new URLSearchParams(params);

//
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
