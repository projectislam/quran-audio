import React from "react";

interface MediaContextType {
  state: string;
  downloadProgress: number;
  setState: (state: string) => void;
  setDownloadProgress: (progress: number) => void;
}

const MediaContext = React.createContext<MediaContextType>({
  state: "loading",
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

  return (
    <MediaContext.Provider
      value={{
        state,
        downloadProgress,
        setState,
        setDownloadProgress,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => React.useContext(MediaContext);
