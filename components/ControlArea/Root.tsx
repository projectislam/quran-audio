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
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    padding: 20,
  },
});
