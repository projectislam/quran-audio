import { RotationControl } from "@/components/common/RotationControl";
import { StyleSheet, View } from "react-native";
import { AudioControl } from "./AudioControl";
import { FontControl } from "./FontControl";

export const ControlSection = () => {
  return (
    <View style={styles.root}>
      <AudioControl />

      <View style={styles.settingButtons}>
        <RotationControl />
        <FontControl />
      </View>
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
  settingButtons: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
