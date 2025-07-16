import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";

export const ChangeFontSize = () => {
  const { fontSize, setFontSize, isDarkMode } = useAppContext();
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);

  const styles = StyleSheet.create({
    fontSizeSection: {
      position: "relative",
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? "#475569" : "#e2e8f0",
      borderRadius: 8,
      zIndex: 10,
      maxHeight: 192,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    dropdownScroll: {
      flex: 1,
    },
    fontSizeOption: {
      paddingHorizontal: 10,
    },
    selectedFontSize: {
      backgroundColor: isDarkMode ? "#059669" : "#10b981",
    },
    firstOption: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    lastOption: {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    fontSizeOptionText: {
      fontSize: 14,
      color: isDarkMode ? "white" : "black",
    },
    fontSettingButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
    },
  });

  return (
    <View style={styles.fontSizeSection}>
      <TouchableOpacity
        onPress={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
        style={styles.fontSettingButton}
      >
        <Ionicons
          name="text-outline"
          size={20}
          color={isDarkMode ? "#fbbf24" : "#64748b"}
        />
      </TouchableOpacity>

      {showFontSizeDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {Array.from({ length: 39 }, (v, k) => k + 12).map((fs, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setFontSize(fs)}
                style={[
                  styles.fontSizeOption,
                  fs === fontSize && styles.selectedFontSize,
                  index === 0 && styles.firstOption,
                ]}
              >
                <Text style={styles.fontSizeOptionText}>{fs}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
