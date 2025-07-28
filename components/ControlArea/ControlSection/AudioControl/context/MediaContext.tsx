import React from "react";

interface MediaContextType {
  state: string;
  setState: (state: string) => void;
}

const MediaContext = React.createContext<MediaContextType>({
  state: "loading",
  setState: () => {},
});

export const MediaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = React.useState("loading");

  return (
    <MediaContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => React.useContext(MediaContext);
