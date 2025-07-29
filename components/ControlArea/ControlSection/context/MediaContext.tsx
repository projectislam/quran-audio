import React from "react";

interface MediaContextType {
  state: string;
  downloadProgress: number;
  audioSource: string | null;
  setAudioSource: (source: string) => void;
  setState: (state: string) => void;
  setDownloadProgress: (progress: number) => void;
}

const MediaContext = React.createContext<MediaContextType>({
  state: "loading",
  audioSource: null,
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

  return (
    <MediaContext.Provider
      value={{
        state,
        downloadProgress,
        audioSource,
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
