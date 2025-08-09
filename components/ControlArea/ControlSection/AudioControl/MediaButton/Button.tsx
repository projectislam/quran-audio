import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  icon: string;
  onPress?: () => void;
};

export const Button: React.FC<Props> = ({ icon, onPress }) => {
  const { theme } = useAppContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, { backgroundColor: theme.buttonBG }]}
    >
      <Ionicons name={icon as any} size={24} color={theme.buttonText} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#10b981",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
