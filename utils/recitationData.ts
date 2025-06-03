import recitationData from "../assets/recitation.json";

export interface Reciter {
  id: string;
  name: string;
  nameArabic: string;
  folder: string;
}

export async function getReciters(): Promise<Reciter[]> {
  try {
    return recitationData as unknown as Reciter[];
  } catch (error) {
    console.error("Error loading recitation data:", error);
    throw error;
  }
}
