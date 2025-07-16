import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
};

export const DropdownButton: React.FC<Props> = ({ onPress }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
    }),
    [isDarkMode]
  );

  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, themeStyle]}>
      <Ionicons
        name="text-outline"
        size={20}
        color={isDarkMode ? "#fbbf24" : "#64748b"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 8,
    borderRadius: 20,
  },
});
