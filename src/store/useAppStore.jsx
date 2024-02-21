import create from 'zustand';

export const useAppStore = create(() => ({
  isShowModel: false,
  contentModel: null,
}));
