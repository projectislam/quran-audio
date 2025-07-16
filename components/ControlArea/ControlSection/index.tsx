import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { AudioControl } from "./AudioControl";
import { FontControl } from "./FontControl";

export const ControlSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.root}>
      <AudioControl />
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
