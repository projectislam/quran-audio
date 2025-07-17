import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
  name: string;
};

export const DropdownButton: React.FC<Props> = ({ onPress, name }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      root: {
        backgroundColor: isDarkMode ? "#475569" : "#e2e8f0",
      },
      displayName: {
        color: isDarkMode ? "white" : "black",
      },
    }),
    [isDarkMode]
  );

  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, themeStyle.root]}>
      <Text style={[styles.displayName, themeStyle.displayName]}>
        Reciter: {name}
      </Text>
      <Ionicons
        name="chevron-down"
        size={16}
        color={isDarkMode ? "white" : "black"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  displayName: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
});
