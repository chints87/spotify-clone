import { playlistState } from 'atoms/playlistAtom';
import React from 'react';
import { useRecoilState } from 'recoil';
import Song from './Song';

export default function Songs() {
  const playlist = useRecoilState(playlistState);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <p style={{
        position: 'sticky',
        top: '6rem',
        backgroundColor: 'grey',
        zIndex: '2',
      }}
      >
        TABLE HEADING
      </p>
      {playlist ? playlist[0].tracks.items.map((track, i) => (
        <Song key={track.trackid} track={track.track} order={i} />
      )) : null }
    </div>

  );
}
