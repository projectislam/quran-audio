import { useAppContext } from "@/context/AppContext";
import { StyleSheet, Text } from "react-native";

type Props = {
  state: string;
};

export const State: React.FC<Props> = ({ state }) => {
  const { theme } = useAppContext();

  return (
    <Text style={[styles.root, { color: theme.secondaryText }]}>{state}</Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 12,
  },
});
