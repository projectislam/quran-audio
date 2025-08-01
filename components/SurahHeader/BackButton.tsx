import { useMediaContext } from "@/context/MediaContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../context/AppContext";

export const BackButton = () => {
  const { status, player } = useMediaContext();
  const { isDarkMode } = useAppContext();

  const gotToBack = () => {
    if (status?.playing) {
      player?.pause();
    }
    router.back();
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.backButton} onPress={gotToBack}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDarkMode ? "white" : "#10b981"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  backButton: {
    padding: 4,
  },
});
