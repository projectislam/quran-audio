import quran from "../assets/data/quran.json";

export const getAllSurahs = () => {
  return quran;
};

export const getSurahByNumber = (number: number) => {
  return quran.find((surah) => surah.index === number);
};
