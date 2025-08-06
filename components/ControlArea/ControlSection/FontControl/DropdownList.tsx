import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const DropdownList = () => {
  const { isDarkMode, fontSize, setFontSize } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      root: {
        backgroundColor: isDarkMode ? "#475569" : "#e2e8f0",
      },
      selectedFontSize: {
        backgroundColor: isDarkMode ? "#059669" : "#10b981",
      },
      fontSizeTextOption: {
        color: isDarkMode ? "white" : "black",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={[styles.root, themeStyle.root]}>
      <ScrollView style={styles.dropdownScroll}>
        {Array.from({ length: 39 }, (v, k) => k + 12).map((fs, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setFontSize(fs)}
            style={[
              styles.fontSizeOption,
              fs === fontSize && themeStyle.selectedFontSize,
              index === 0 && styles.firstOption,
            ]}
          >
            <Text
              style={[styles.fontSizeOptionText, themeStyle.fontSizeTextOption]}
            >
              {fs}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: "100%",
    left: -5,
    right: 0,

    borderRadius: 8,
    zIndex: 10,
    width: 50,
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
  fontSizeOptionText: {
    fontSize: 14,
    textAlign: "center",
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
