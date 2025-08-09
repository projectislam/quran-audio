import { useAppContext } from "@/context/AppContext";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  translation: string;
};

export const EnglishName: React.FC<Props> = ({ name, translation }) => {
  const { theme } = useAppContext();

  return (
    <View style={styles.root}>
      <Text style={[styles.name, { color: theme.primaryText }]}>{name}</Text>
      <Text style={[styles.translation, { color: theme.secondaryText }]}>
        {translation}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 16,
  },
  translation: {
    fontSize: 14,
  },
});
