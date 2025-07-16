import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
  state: string;
};

export const State: React.FC<Props> = ({ state }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      color: isDarkMode ? "white" : "black",
    }),
    [isDarkMode]
  );

  return <Text style={[styles.root, themeStyle]}>{state}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 12,
  },
});
