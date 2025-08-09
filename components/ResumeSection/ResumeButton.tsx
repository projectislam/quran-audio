import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ResumeButton = () => {
  const { currentSurah, currentVerse, theme } = useAppContext();
  const { player, goToVerse } = useMediaContext();

  const handleResumePlay = () => {
    router.push("/surah");
    setTimeout(() => {
      const verseKey = `${currentSurah}:${currentVerse}`;
      goToVerse(verseKey);
      player?.play();
    }, 1000);
  };

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.buttonBG }]}
      onPress={handleResumePlay}
    >
      <Ionicons name="play" size={20} color={theme.buttonText} />
      <Text style={[styles.text, { color: theme.buttonText }]}>Resume</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
