import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { songTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

export default function useSong() {
  const spotifyApi = useSpotify();
  const songTrackId = useRecoilValue(songTrackIdState);
  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchSong = async () => {
      // On select it will fetch the song info,
      // If the web app player is playing then existing track will be loaded.
      if (songTrackId) {
        const trackSongInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${songTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          },
          // TODO: setState on response and if no song, then display no song selected
        ).then((res) => res.json());

        setSongInfo(trackSongInfo);
      }
    };
    fetchSong();
  }, [songTrackId, spotifyApi]);

  return songInfo;
}
