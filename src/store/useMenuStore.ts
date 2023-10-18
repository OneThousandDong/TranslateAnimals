import {create} from 'zustand';
import { Country } from "../model/Country";

export type Continent = {
  [key: string]: any;
  //africa
  quantityAfrica: number;
  //asia
  quantityAsia: number;
  //eu
  quantityEurope: number;
  //namerica
  quantityNAmerica: number;
  //samerica
  quantitySAmerica: number;
  //oceania
  quantityOceania: number;
};

export interface MenuState {
  typeCategory: string;
  setTypeCategory: (typeCategory: string) => void;
  arrayQuestion: number[];
  setArrayQuestion: (arrayQuestion: []) => void;

  continent: Continent;
  getQuantityContinent: (key: string) => number;

  nameCategory: string;
  setNameCategory: (nameCategory: string) => void;
}

const useMenuStore = create<MenuState>((set, get) => ({
  // type: Country/World/Africa/Asia/Europe/NAmerica/SAmerica/Oceania
  typeCategory: 'Country',
  setTypeCategory: (typeCategory: string) => set({typeCategory}),
  arrayQuestion: [],
  setArrayQuestion: (arrayQuestion: []) => set({arrayQuestion}),
  continent: {
    quantityAfrica: 54,
    quantityAsia: 48,
    quantityEurope: 44,
    quantityNAmerica: 23,
    quantitySAmerica: 12,
    quantityOceania: 14,
  },
  getQuantityContinent: (key: string) => {
    return get().continent[key];
  },
  nameCategory: '',
  setNameCategory: (nameCategory: string) => set({nameCategory}),
}));

export default useMenuStore;
