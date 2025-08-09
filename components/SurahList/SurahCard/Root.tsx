import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = PropsWithChildren & {
  onPress: () => void;
};

export const Root: React.FC<Props> = ({ children, onPress }) => {
  const { theme } = useAppContext();

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.surface }]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});
