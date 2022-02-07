/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import {
  PlayIcon, RewindIcon, SwitchHorizontalIcon, PauseIcon, FastForwardIcon,
} from '@heroicons/react/solid';
import spotifyApi from 'lib/spotify';
import { ReplyIcon } from '@heroicons/react/outline';
import useSpotify from '../hooks/useSpotify';
import useSong from '../hooks/useSong';
import { songTrackIdState, isPlayingState } from '../atoms/songAtom';
import styles from '@/styles/scss/Player.module.scss';

export default function Player() {
  const spotiftyApI = useSpotify();
  const { data: session } = useSession();
  const [songTrackId, setSongTrackId] = useRecoilState(songTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSong();

  const fetchCurrentPlayingSong = () => {
    // Over here, a spotify player needs to have a track playing or else
    // on selection it would give an error no devices found. The built app
    // when streaming music does not detect device,
    // while spotify's web player does.

    // This will update the songtrackID and the Isplaying. It would lead to
    // songInfo to update
    if (!songInfo) {
      if (spotiftyApI.getMyCurrentPlayingTrack()) {
        spotiftyApI.getMyCurrentPlayingTrack().then((data) => {
          setSongTrackId(data.body?.item?.id);

          spotiftyApI.getMyCurrentPlaybackState().then((info) => {
            setIsPlaying(info.body?.is_playing);
          });
        });
      }
    }
  };

  // If song is playing on another device with the spotify player, the details of that song
  // will be fetched from the API. Look at the fetchCurrentPlayingSong
  useEffect(() => {
    if (spotiftyApI.getAccessToken() && !songTrackId) {
      fetchCurrentPlayingSong();
      setVolume(50);
    }
  }, [songTrackId, spotiftyApI, session]);

  const handlePlayPause = () => {
    spotiftyApI.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotiftyApI.play();
        setIsPlaying(true);
      }
    });
  };

  return (
    <div className={styles.player}>
      {songInfo
        ? (
          <>
            <Image className={styles.poster} src={songInfo?.album?.images[0]?.url} width={50} height={50} alt="" />
            <div className={styles.info}>
              <h3>{songInfo?.name}</h3>
              <span>{songInfo?.artists?.[0].name}</span>
            </div>
            <div className={styles.control}>
              <SwitchHorizontalIcon className={styles.icon} />
              <RewindIcon className={styles.icon} />
              { isPlaying ? <PauseIcon onClick={() => handlePlayPause()} className={styles.icon} />
                : <PlayIcon onClick={() => handlePlayPause()} className={styles.icon} />}
              <FastForwardIcon className={styles.icon} />
              <ReplyIcon className={styles.icon} />
            </div>

          </>
        )

        : null }
    </div>

  );
}
