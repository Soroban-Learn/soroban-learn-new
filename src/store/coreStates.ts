import { atom } from 'recoil';

export const authModalState = atom<boolean>({
  key: 'authModalStateKey',
  default: false,
});

export const courseModalState = atom<boolean>({
  key: 'courseModalStateKey',
  default: false,
});
