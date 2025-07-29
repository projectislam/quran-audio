import * as FileSystem from "expo-file-system";

export interface Segment {
  /** Segment number within verse */
  0: number; // index or sub-segment
  /** Start time in milliseconds */
  1: number;
  /** End time in milliseconds */
  2: number;
}

export interface Timestamp {
  verse_key: string; // e.g., "1:1"
  timestamp_from: number; // in milliseconds
  timestamp_to: number; // in milliseconds
  duration: number; // in seconds
  segments: Segment[];
}

export interface AudioDetail {
  id: string;
  chapter_id: number;
  file_size: number;
  format: string; // e.g., "mp3"
  audio_url: string;
  timestamps: Timestamp[];
}

const getAccessToken = async () => {
  const tokenUrl = "https://oauth2.quran.foundation/oauth2/token";
  const scope = "content";
  // const credentials =
  // "YjgwMDljMjEtNWYxZC00ZWViLWJiZGYtYjY5ZDRlOTUzYWVkOk1lVFY1VS42a2VUYk1XMzRkbWd1TG45NUhW";

  const credentials =
    "YmMzNmUwMDAtY2U4Yi00YjkwLWIyZDItZDFlYzcwM2I4NTM0OmMzUmhpeFE1R3ZBNmg1SlI3bWxQVGhDS2Z5";

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope,
      }).toString(),
    });
    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export const fetchChapterRecitation = async (
  reciterId: number,
  chapterNumber: number
) => {
  try {
    const xClientId = "bc36e000-ce8b-4b90-b2d2-d1ec703b8534";
    const accessToken = await getAccessToken();

    const chapterRecitationUrl = `https://apis.quran.foundation/content/api/v4/chapter_recitations/${reciterId}/${chapterNumber}?segments=true`;

    const response = await fetch(chapterRecitationUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": xClientId,
        "x-auth-token": accessToken,
      },
    });

    const data = await response.json();

    return data.audio_file as AudioDetail;
  } catch (error) {
    console.error("Error fetching chapter recitation:", error);
  }
};

export const getAudioDetailFromCache = async (
  reciterId: number,
  surahId: number
) => {
  const filePath = `${FileSystem.documentDirectory}audio_meta/${reciterId}_${surahId}.json`;

  const info = await FileSystem.getInfoAsync(filePath);
  if (info.exists) {
    const json = await FileSystem.readAsStringAsync(filePath);
    return JSON.parse(json) as AudioDetail;
  }
  return null;
};

export const saveAudioDetailToCache = async (
  reciterId: number,
  surahId: number,
  data: any
) => {
  const dir = `${FileSystem.documentDirectory}audio_meta/`;
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

  const filePath = `${dir}${reciterId}_${surahId}.json`;
  await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
};

/**
 * Retrieves audio detail for a specified reciter and surah.
 * First attempts to fetch the audio detail from the cache.
 * If not available, it fetches from the remote source and caches it.
 *
 * @param reciterId - The ID of the reciter.
 * @param surahId - The ID of the surah.
 * @returns The audio detail as an AudioDetail object.
 */
export const getAudioDetail = async (reciterId: number, surahId: number) => {
  let audioDetail = await getAudioDetailFromCache(reciterId, surahId);

  if (!audioDetail) {
    audioDetail = (await fetchChapterRecitation(reciterId, surahId)) as any;
    await saveAudioDetailToCache(reciterId, surahId, audioDetail);
  }

  return audioDetail as AudioDetail;
};

export const getAudioFromCache = async (audioUrl: string, id: string) => {
  const fileName = id + "_" + audioUrl.split("/").pop();
  const localUri = `${FileSystem.documentDirectory}audio/${fileName}`;

  const fileInfo = await FileSystem.getInfoAsync(localUri);

  return { localUri, exist: fileInfo.exists };
};

export const downloadAudio = async (
  audioUrl: string,
  id: string,
  onProgress?: (progress: number) => void
) => {
  try {
    const { localUri, exist } = await getAudioFromCache(audioUrl, id);

    if (exist) {
      return localUri;
    }

    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}audio`,
      { intermediates: true }
    );

    const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
      const { totalBytesWritten, totalBytesExpectedToWrite } = downloadProgress;

      const percent = (totalBytesWritten / totalBytesExpectedToWrite) * 100;
      onProgress?.(percent);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      audioUrl,
      localUri,
      {},
      callback
    );
    await downloadResumable.downloadAsync();

    return localUri;
  } catch (e) {
    console.error("Error downloading audio:", e);
  }
};
