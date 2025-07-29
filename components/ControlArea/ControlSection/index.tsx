import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { AudioControl } from "./AudioControl";
import { AudioPlayer } from "./AudioControl/AudioPlayer";
import { FontControl } from "./FontControl";
import { MediaContextProvider } from "./context/MediaContext";

export const ControlSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.root}>
      <MediaContextProvider>
        <AudioControl />
        <AudioPlayer />
      </MediaContextProvider>
      <FontControl />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
