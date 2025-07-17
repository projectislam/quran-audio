import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Reciter = {
  id: number;
  name: string;
};

type Props = {
  reciters: Reciter[];
  onSelect?: (id: number) => void;
};

export const ReciterList: React.FC<Props> = ({ reciters, onSelect }) => {
  const { isDarkMode, currentReciter } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      dropdown: {
        backgroundColor: isDarkMode ? "#475569" : "#e2e8f0",
      },
      selectedReciter: {
        backgroundColor: isDarkMode ? "#059669" : "#10b981",
      },
      reciterName: {
        color: isDarkMode ? "white" : "black",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={[styles.dropdown, themeStyle.dropdown]}>
      <ScrollView style={styles.dropdownScroll}>
        {reciters.map((reciter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect?.(reciter.id)}
            style={[
              styles.reciterOption,
              reciter.id === currentReciter && themeStyle.selectedReciter,
              index === 0 && styles.firstOption,
              index === reciters.length - 1 && styles.lastOption,
            ]}
          >
            <Text style={[styles.reciterName, themeStyle.reciterName]}>
              {reciter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 8,

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
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastOption: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  reciterName: {
    fontSize: 14,
    textAlign: "left",
  },
});
