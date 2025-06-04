import surahs from "../assets/data/surahs.json";

export const getAllSurahs = () => {
  return surahs;
};

export const getSurahByNumber = (number: number) => {
  return surahs.find((surah) => surah.number === number);
};
