import { themes, useAppContext } from "@/context/AppContext";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const DropdownList = () => {
  const { theme, setTheme } = useAppContext();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.dropdownScroll}>
        {Object.values(themes).map((t, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setTheme(t.key)}
            style={[styles.fontSizeOption, index === 0 && styles.firstOption]}
          >
            <Text
              style={[
                styles.fontSizeOptionText,
                t.key === theme.key
                  ? { color: theme.selectedText }
                  : { color: theme.primaryText },
              ]}
            >
              {t.label}
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
    right: 0,
    marginTop: 16,

    borderRadius: 8,
    zIndex: 10,
    width: 150,
    maxHeight: 292,
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
    padding: 8,
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
