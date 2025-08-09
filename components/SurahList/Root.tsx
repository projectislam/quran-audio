import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useAppContext();

  return (
    <>
      <Text style={[styles.root, { color: theme.primaryText }]}>
        All Surahs
      </Text>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
});
