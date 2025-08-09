import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
  name: string;
};

export const DropdownButton: React.FC<Props> = ({ onPress, name }) => {
  const { theme } = useAppContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, { backgroundColor: theme.secondaryButtonBG }]}
    >
      <Text style={[styles.displayName, { color: theme.primaryText }]}>
        Reciter: {name}
      </Text>
      <Ionicons name="chevron-down" size={16} color={theme.primaryText} />
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
