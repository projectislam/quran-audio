import quranData from "../assets/quran_text.json";

export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  verseCount: number;
}

export interface Ayah {
  number: number;
  text: string;
  bismillah?: string;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
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

export function getSurahDetail(surahId: number): SurahDetail | null {
  try {
    const surah = quranData.find((s: any) => s.index === surahId);
    if (!surah) return null;

    return {
      id: surah.index,
      name: surah.name,
      nameArabic: surah.name,
      verseCount: surah.ayas.length,
      ayahs: surah.ayas.map((ayah: any) => ({
        number: ayah.index,
        text: ayah.text,
        bismillah: ayah.bismillah,
      })),
    };
  } catch (error) {
    console.error("Error loading surah detail:", error);
    throw error;
  }
}
