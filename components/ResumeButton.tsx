import { styles } from "@/styles/resumeButton";
import { Ionicons } from "@expo/vector-icons";
import { I18nManager, Text, TouchableOpacity } from "react-native";

export default function ResumeButton() {
  const isRTL = I18nManager.isRTL;

  return (
    <TouchableOpacity style={styles.resumeButton}>
      <Ionicons name="play-circle-outline" size={24} color="#fff" />
      <Text style={styles.resumeText}>استئناف آخر تشغيل</Text>
    </TouchableOpacity>
  );
}
