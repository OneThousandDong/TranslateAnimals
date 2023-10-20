import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from './mmkv';

export type Menu = {
  [key: string]: any;
  // country
  quantityCountry: number;
  scoreCountry: number[];
  //world
  quantityWorld: number;
  scoreWorld: number[];
  //africa
  scoreAfrica: number;
  //asia
  scoreAsia: number;
  //eu
  scoreEurope: number;
  //namerica
  scoreNAmerica: number;
  //samerica
  scoreSAmerica: number;
  //oceania
  scoreOceania: number;
};

export interface WorldState {
  languageState: string;
  setLanguageState: (languageState: string) => void;
  timeSuggest: number;
  setTimeSuggest: (timeSuggest: number) => void;
  // mute: boolean;
  // setMute: (mute: boolean) => void;
}

const useStorageStore = create<WorldState>()(
  persist(
    (set, get) => ({
      languageState: 'VI',
      setLanguageState: (languageState: string) => set({languageState}),
      timeSuggest: 0,
      setTimeSuggest: (timeSuggest: number) => set({timeSuggest}),
      // mute: false,
      // setMute: (mute: boolean) => set({mute}),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useStorageStore;
