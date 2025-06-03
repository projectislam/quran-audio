import { styles } from "@/styles/header";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  I18nManager,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

export default function Header() {
  const isDarkMode = useColorScheme() === "dark";
  const isRTL = I18nManager.isRTL;

  return (
    <LinearGradient colors={["#4CAF50", "#45a049"]} style={styles.header}>
      <Text style={styles.title}>القرآن الكريم</Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
