import quranData from "../assets/quran_text.json";

export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  verseCount: number;
}

export function getSurahs(): Surah[] {
  try {
    const surahs: Surah[] = quranData.map((surah: any) => ({
      id: surah.index,
      name: surah.name,
      nameArabic: surah.name,
      verseCount: surah.ayas.length,
    }));

    return surahs;
  } catch (error) {
    console.error("Error loading Quran data:", error);
    throw error;
  }
}
