import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from './mmkv';

export interface WorldState {
  languageState: string;
  setLanguageState: (languageState: string) => void;
  timeSuggest: number;
  setTimeSuggest: (timeSuggest: number) => void;
  resultApp: number[];
  setResultApp: (resultApp: number[]) => void;
}

const useStorageStore = create<WorldState>()(
  persist(
    (set, get) => ({
      languageState: 'VI',
      setLanguageState: (languageState: string) => set({languageState}),
      timeSuggest: 0,
      setTimeSuggest: (timeSuggest: number) => set({timeSuggest}),

    }),
    {
      name: 'store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useStorageStore;
