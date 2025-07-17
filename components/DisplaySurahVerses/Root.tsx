import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const Root: React.FC<PropsWithChildren> = () => {
  return <View style={styles.root}></View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
