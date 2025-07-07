import { audioDataMap } from "./audioDataMap";

interface AudioFile {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
  duration: number;
  verse_timings: Array<{
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
  }>;
}

interface ReciterChapterAudio {
  audio_files: AudioFile[];
}

/**
 * Get audio details for a specific reciter and chapter
 * @param reciterId - The ID of the reciter
 * @param chapterNumber - The chapter number (1-114)
 * @returns Promise containing the audio details or null if not found
 */
export async function getAudioDetails(
  reciterId: number,
  chapterNumber: number
): Promise<AudioFile | null> {
  try {
    const fileName = `${reciterId}_${chapterNumber}.json`;
    const data: ReciterChapterAudio = audioDataMap[fileName];

    return data.audio_files[0] || null;
  } catch (error) {
    console.error("Error fetching audio details:", error);
    return null;
  }
}

/**
 * Get the audio URL for a specific reciter and chapter
 * @param reciterId - The ID of the reciter
 * @param chapterNumber - The chapter number (1-114)
 * @returns Promise containing the audio URL or null if not found
 */
export async function getAudioUrl(
  reciterId: number,
  chapterNumber: number
): Promise<string | null> {
  const audioDetails = await getAudioDetails(reciterId, chapterNumber);
  return audioDetails?.audio_url || null;
}
