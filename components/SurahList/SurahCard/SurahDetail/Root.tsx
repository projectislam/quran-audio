import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
