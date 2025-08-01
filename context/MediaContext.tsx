import { AudioDetail } from "@/utils/audio.data";
import {
  AudioPlayer,
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import React, { useCallback } from "react";

interface MediaContextType {
  mediaState: string;
  player: AudioPlayer | null;
  status: AudioStatus | null;
  downloadProgress: number;
  audioSource: string | null;
  audioDetail: AudioDetail | null;
  setMediaState: (state: string) => void;
  goToVerse: (verseKey: string) => void;
  setAudioDetail: (detail: AudioDetail) => void;
  setAudioSource: (source: string) => void;
  setDownloadProgress: (progress: number) => void;
}

const MediaContext = React.createContext<MediaContextType>({
  mediaState: "loading",
  player: null,
  status: null,
  goToVerse: () => {},
  audioSource: null,
  audioDetail: null,
  setMediaState: () => {},
  setAudioDetail: () => {},
  setAudioSource: () => {},
  downloadProgress: 0,
  setDownloadProgress: () => {},
});

export const MediaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mediaState, setMediaState] = React.useState<string>("loading");
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [audioSource, setAudioSource] = React.useState<string | null>(null);
  const [audioDetail, setAudioDetail] = React.useState<AudioDetail | null>(
    null
  );
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  const goToVerse = useCallback(
    async (verseKey: string) => {
      if (!audioDetail) return 0;

      const currentVerse = audioDetail.timestamps.find(
        (t) => t.verse_key === verseKey
      );

      if (!currentVerse) return 0;

      const position = currentVerse.timestamp_from / 1000;
      player?.seekTo(position);
    },
    [player, audioDetail]
  );

  return (
    <MediaContext.Provider
      value={{
        mediaState,
        player,
        status,
        downloadProgress,
        audioSource,
        audioDetail,
        setMediaState,
        goToVerse,
        setAudioDetail,
        setAudioSource,
        setDownloadProgress,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => React.useContext(MediaContext);
