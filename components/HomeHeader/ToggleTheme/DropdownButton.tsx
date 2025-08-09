import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
};

export const DropdownButton: React.FC<Props> = ({ onPress }) => {
  const { theme } = useAppContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, { backgroundColor: theme.secondaryButtonBG }]}
    >
      <Ionicons
        name="color-palette-outline"
        size={20}
        color={theme.secondaryButtonText}
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
