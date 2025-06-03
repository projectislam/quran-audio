import { styles } from "@/styles/header";
import { Ionicons } from "@expo/vector-icons";
import {
  I18nManager,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Header() {
  const isDarkMode = useColorScheme() === "dark";
  const isRTL = I18nManager.isRTL;

  return (
    <View style={styles.header}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        القرآن الكريم
      </Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons
          name="settings-outline"
          size={24}
          color={isDarkMode ? "#fff" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
}
