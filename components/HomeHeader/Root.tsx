import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useAppContext } from "../../context/AppContext";

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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
