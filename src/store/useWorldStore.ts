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
  menuQuestion: Menu;
  setMenuQuestion: (key: string, value: any) => void;
  getQuantity: (key: string) => number;
  getScore: (key: string) => number[];
  getScoreContinents: (key: string) => number;
  mute: boolean;
  setMute: (mute: boolean) => void;
}

const useWorldStore = create<WorldState>()(
  persist(
    (set, get) => ({
      languageState: 'VI',
      setLanguageState: (languageState: string) => set({languageState}),
      menuQuestion: {
        // country
        quantityCountry: 10,
        scoreCountry: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        //world
        quantityWorld: 10,
        scoreWorld: [0, 0, 0, 0, 0, 0, 0, 0, 0],

        scoreAfrica: 0,
        scoreAsia: 0,
        scoreEurope: 0,
        scoreNAmerica: 0,
        scoreSAmerica: 0,
        scoreOceania: 0,
      },
      setMenuQuestion: (key: string, value: any) =>
        set({
          menuQuestion: {
            ...get().menuQuestion,
            [key]: value,
          },
        }),
      getQuantity: (key: string) => {
        return get().menuQuestion[key];
      },
      getScore: (key: string) => {
        return get().menuQuestion[key];
      },
      getScoreContinents: (key: string) => {
        return get().menuQuestion[key];
      },
      mute: false,
      setMute: (mute: boolean) => set({mute}),
    }),
    {
      name: 'world',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useWorldStore;
