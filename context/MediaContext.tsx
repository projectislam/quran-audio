import { AudioDetail } from "@/utils/audio.data";
import {
  AudioPlayer,
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import React, { useCallback, useEffect, useMemo } from "react";

interface MediaContextType {
  player: AudioPlayer | null;
  status: AudioStatus | null;
  mediaState: string;
  downloadProgress: number;
  audioSource: string | null;
  audioDetail: AudioDetail | null;
  goToVerse: (verseKey: string) => void;
  setAudioDetail: (detail: AudioDetail | null) => void;
  setAudioSource: (source: string | null) => void;
  setDownloadProgress: (progress: number) => void;
}

const MediaContext = React.createContext<MediaContextType>({
  player: null,
  status: null,
  mediaState: "loading",
  goToVerse: () => {},
  audioSource: null,
  audioDetail: null,
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
  const [nonce, setNonce] = React.useState(0);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [audioSource, setAudioSource] = React.useState<string | null>(null);
  const [audioDetail, setAudioDetail] = React.useState<AudioDetail | null>(
    null
  );
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  const mediaState = useMemo(() => {
    if (downloadProgress < 100 && downloadProgress > 0) return "downloading";
    if (!audioDetail || !audioSource) return "download";
    if (status?.playing) return "playing";
    if (status?.isLoaded || player?.isLoaded) return "paused";
    return "loading";
  }, [status, player, audioDetail, audioSource, downloadProgress, nonce]);

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

  useEffect(() => {
    setTimeout(() => {
      setNonce(Math.random());
    }, 3000);
  }, []);

  return (
    <MediaContext.Provider
      value={{
        player,
        status,
        mediaState,
        downloadProgress,
        audioSource,
        audioDetail,
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
