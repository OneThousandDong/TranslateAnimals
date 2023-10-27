import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from './mmkv';

export type DataResult = {
  name: number;
  result: number;
};
export interface WorldState {
  languageState: string;
  setLanguageState: (languageState: string) => void;
  timeSuggest: number;
  setTimeSuggest: (timeSuggest: number) => void;
  resultApp: DataResult[];
  setResultApp: (resultApp: DataResult[]) => void;
  currentData: number[];
  setCurrentData: (currentData: number) => void;
}

const useStorageStore = create<WorldState>()(
  persist(
    (set, get) => ({
      languageState: 'VI',
      setLanguageState: (languageState: string) => set({languageState}),
      timeSuggest: 0,
      setTimeSuggest: (timeSuggest: number) => set({timeSuggest}),
      resultApp: [
        {
          name: 4,
          result: 5,
        },
        {
          name: 5,
          result: 4,
        },
        {
          name: 6,
          result: 7,
        },
        {
          name: 7,
          result: 1,
        },
        {
          name: 8,
          result: 12,
        },
      ],
      setResultApp: (resultApp: DataResult[]) => set({resultApp}),
      currentData: [0, 1, 2, 3],
      setCurrentData: (currentData: number) =>
        set(state => ({currentData: [...state.currentData, currentData]})),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useStorageStore;
