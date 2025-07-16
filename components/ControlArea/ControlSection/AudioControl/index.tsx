import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const AudioControl: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
