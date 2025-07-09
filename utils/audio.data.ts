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
  console.log("getting access token 123");
  const tokenUrl = "https://prelive-oauth2.quran.foundation/oauth2/token";
  const scope = "content";
  const credentials =
    "YjgwMDljMjEtNWYxZC00ZWViLWJiZGYtYjY5ZDRlOTUzYWVkOk1lVFY1VS42a2VUYk1XMzRkbWd1TG45NUhW";

  try {
    console.log("send request");
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

    console.log("response", response);

    const data = await response.json();

    console.log("access token data", data);

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
    const xClientId = "b8009c21-5f1d-4eeb-bbdf-b69d4e953aed";
    console.log("getting access token");
    const accessToken = await getAccessToken();
    console.log("access token", accessToken);

    const chapterRecitationUrl = `https://apis-prelive.quran.foundation/content/api/v4/chapter_recitations/${reciterId}/${chapterNumber}?segments=true`;

    const response = await fetch(chapterRecitationUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": xClientId,
        "x-auth-token": accessToken,
      },
    });

    const data = await response.json();

    console.log(data);

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
    return JSON.parse(json);
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

export const getAudioDetail = async (reciterId: number, surahId: number) => {
  console.log("getAudioDetail", reciterId, surahId);
  let audioDetail = await getAudioDetailFromCache(reciterId, surahId);

  console.log("audioDetail", audioDetail);

  if (!audioDetail) {
    console.log("fetchChapterRecitation");
    audioDetail = await fetchChapterRecitation(reciterId, surahId);
    await saveAudioDetailToCache(reciterId, surahId, audioDetail);
  }

  return audioDetail as AudioDetail;
};
