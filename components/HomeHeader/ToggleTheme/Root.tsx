import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    position: "relative",
    padding: 8,
    borderRadius: 20,
  },
});
