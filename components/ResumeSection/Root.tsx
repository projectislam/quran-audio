import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useAppContext();

  return (
    <View style={[styles.root, { backgroundColor: theme.surface }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
