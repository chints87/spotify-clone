import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import Songs from './Songs';
import styles from '@/styles/scss/Center.module.scss';
import useSpotify from '../hooks/useSpotify';

const COLORS = [
  'blue', 'red', 'pink', 'yellow',
];

export default function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    console.log('in 1');
    const random = Math.floor(Math.random() * COLORS.length);
    setColor(COLORS[random]);
  }, [playlistId]);

  useEffect(() => {
    console.log('in 2');
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body);
      }).catch((error) => console.log(error, 'Something went wrong'));
    }
  }, [playlistId, spotifyApi]);

  console.log(playlist);

  return (
    <div className={styles.center}>
      <header className={styles.profileIcon}>
        <h4>{session?.user.name}</h4>
        <ChevronDownIcon className={styles.arrow} />

      </header>
      <section
        style={{
          backgroundImage: `linear-gradient(180deg, ${color}, black)`,
          height: '40vh',
        }}
      >
        {playlist
          ? (
            <>
              <div className={styles.playlist}>
                <Image src={playlist?.images[0]?.url} alt="" width={150} height={150} />
                <div className={styles.playlistName}>
                  <h3>PLAYLIST</h3>
                  <span>{playlist?.name}</span>
                </div>
              </div>
              <Songs />
            </>

          )

          : null}

      </section>

    </div>

  );
}
