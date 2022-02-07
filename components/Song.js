import React from 'react';
import Image from 'next/image';
import millisToMinutesAndSeconds from 'lib/utilities';
import { useRecoilState } from 'recoil';
import { isPlayingState, songTrackIdState } from 'atoms/songAtom';
import styles from '../styles/scss/Song.module.scss';
import useSpotify from '../hooks/useSpotify';

export default function Song({ order, track }) {
  const [songTrack, setSongTrack] = useRecoilState(songTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();
  console.log(songTrack, isPlaying);

  // Over here click will change
  // current track to clicked track on the api and cause
  // change on playing device
  const clickSong = () => {
    setSongTrack(track.id);
    setIsPlaying(true);
    if (spotifyApi.getAccessToken()) {
      spotifyApi.play({
        uris: [track.uri],
      });
    }
  };
  return (
    <div className={styles.songRow} onClick={() => clickSong()} role="presentation">
      <div className={styles.songDetails}>
        <p>{order + 1}</p>
        <div className={styles.poster}>
          <Image src={track.album?.images[0]?.url} width={50} height={50} alt="" />
        </div>
        <div className={styles.songArtist}>
          <span className={styles.name}>{track.name}</span>
          <span>{track.album.artists[0].name}</span>
        </div>
      </div>
      <div className={styles.songExtraDetails}>
        <p className={styles.songAlbum}>{track.album.name}</p>
        <p className={styles.duration}>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>

  );
}
