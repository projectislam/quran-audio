import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { getAllReciters, getReciterById } from "../utils/reciter.data";

export const ReciterSelection = () => {
  const { currentReciter, setCurrentReciter, isDarkMode } = useAppContext();
  const [showReciterDropdown, setShowReciterDropdown] = useState(false);

  const reciters = useMemo(getAllReciters, []);
  const reciter = useMemo(
    () => getReciterById(currentReciter),
    [currentReciter]
  );

  const handleReciterSelection = async (reciterId: number) => {
    setCurrentReciter(reciterId);
    setShowReciterDropdown(false);
  };

  const getReciterDisplayName = (reciter: any) => {
    if (
      reciter?.translated_name?.name &&
      reciter?.translated_name?.language_name === "urdu"
    ) {
      return `${reciter.name}\n${reciter.translated_name.name}`;
    }
    return reciter?.name || "Unknown Reciter";
  };

  const styles = StyleSheet.create({
    reciterSection: {
      position: "relative",
    },
    reciterButton: {
      backgroundColor: isDarkMode ? "#475569" : "#e2e8f0",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    reciterText: {
      fontSize: 14,
      color: isDarkMode ? "white" : "black",
      flex: 1,
      marginRight: 8,
    },
    chevron: {
      transform: [{ rotate: "0deg" }],
    },
    chevronRotated: {
      transform: [{ rotate: "180deg" }],
    },
    dropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      marginTop: 8,
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
    reciterOption: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    selectedReciter: {
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
    reciterOptionText: {
      fontSize: 14,
      color: isDarkMode ? "white" : "black",
      textAlign: "left",
    },
  });

  return (
    <View style={styles.reciterSection}>
      <TouchableOpacity
        onPress={() => setShowReciterDropdown(!showReciterDropdown)}
        style={styles.reciterButton}
      >
        <Text style={styles.reciterText}>
          Reciter: {getReciterDisplayName(reciter)}
        </Text>
        <Ionicons
          name="chevron-down"
          size={16}
          color={isDarkMode ? "white" : "black"}
          style={[styles.chevron, showReciterDropdown && styles.chevronRotated]}
        />
      </TouchableOpacity>

      {showReciterDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {reciters.map((reciter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleReciterSelection(reciter.id)}
                style={[
                  styles.reciterOption,
                  reciter.id === currentReciter && styles.selectedReciter,
                  index === 0 && styles.firstOption,
                  index === reciters.length - 1 && styles.lastOption,
                ]}
              >
                <Text style={styles.reciterOptionText}>
                  {getReciterDisplayName(reciter)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
