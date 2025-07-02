import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";

export const Header = () => {
  const { isDarkMode, toggleTheme } = useAppContext();

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      textAlign: "center",
      flex: 1,
    },
    themeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
    },
  });

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1e293b" : "#ffffff"}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name="settings-outline"
            size={20}
            color={isDarkMode ? "#94a3b8" : "#64748b"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>القرآن الكريم</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "sunny-outline" : "moon-outline"}
            size={20}
            color={isDarkMode ? "#fbbf24" : "#64748b"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
