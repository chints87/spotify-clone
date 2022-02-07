import { atom } from 'recoil';

export const songTrackIdState = atom({
  key: 'songTrackIdState',
  default: '',
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
