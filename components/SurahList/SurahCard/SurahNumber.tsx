import { useAppContext } from "@/context/AppContext";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  number: number;
};

export const SurahNumber: React.FC<Props> = ({ number }) => {
  const { theme } = useAppContext();

  return (
    <View style={[styles.root, { backgroundColor: theme.buttonBG }]}>
      <Text style={[styles.text, { color: theme.buttonText }]}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
