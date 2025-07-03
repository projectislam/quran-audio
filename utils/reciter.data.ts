import reciters from "../assets/data/reciters.json";

export const getAllReciters = () => {
  return reciters;
};

export const getReciterById = (id: number) => {
  return reciters.find((reciter) => reciter.id === id);
};
