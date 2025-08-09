import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const RotationControl = () => {
  const { setOrientation, theme } = useAppContext();

  const handleRotation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    const newOrientation =
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP
        ? ScreenOrientation.OrientationLock.LANDSCAPE
        : ScreenOrientation.OrientationLock.PORTRAIT_UP;

    ScreenOrientation.lockAsync(newOrientation);
    setOrientation(newOrientation);
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={handleRotation}
        style={[styles.button, { backgroundColor: theme.secondaryButtonBG }]}
      >
        <Ionicons
          name="phone-landscape-outline"
          size={20}
          color={theme.secondaryButtonText}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // position: "relative",
  },
  button: {
    padding: 8,
    borderRadius: 20,
  },
});
