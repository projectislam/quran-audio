import { AudioDetail } from "@/utils/audio.data";
import React from "react";

interface MediaContextType {
  state: string;
  downloadProgress: number;
  audioSource: string | null;
  audioDetail: AudioDetail | null;
  setAudioDetail: (detail: AudioDetail) => void;
  setAudioSource: (source: string) => void;
  setState: (state: string) => void;
  setDownloadProgress: (progress: number) => void;
}

const MediaContext = React.createContext<MediaContextType>({
  state: "loading",
  audioSource: null,
  audioDetail: null,
  setAudioDetail: () => {},
  setAudioSource: () => {},
  downloadProgress: 0,
  setState: () => {},
  setDownloadProgress: () => {},
});

export const MediaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = React.useState("loading");
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [audioSource, setAudioSource] = React.useState<string | null>(null);
  const [audioDetail, setAudioDetail] = React.useState<AudioDetail | null>(
    null
  );

  return (
    <MediaContext.Provider
      value={{
        state,
        downloadProgress,
        audioSource,
        audioDetail,
        setAudioDetail,
        setAudioSource,
        setState,
        setDownloadProgress,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => React.useContext(MediaContext);
