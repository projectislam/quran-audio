import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = PropsWithChildren & {
  onPress: () => void;
};

export const Root: React.FC<Props> = ({ children, onPress }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    }),
    [isDarkMode]
  );

  return (
    <TouchableOpacity style={[styles.root, themeStyle]} onPress={onPress}>
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
