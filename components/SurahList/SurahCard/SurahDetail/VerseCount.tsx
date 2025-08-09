import { useAppContext } from "@/context/AppContext";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  arabic: string;
  verseCount: number;
};

export const VerseCount: React.FC<Props> = ({ arabic, verseCount }) => {
  const { theme } = useAppContext();

  return (
    <View style={styles.root}>
      <Text style={[styles.arabic, { color: theme.primaryText }]}>
        {arabic}
      </Text>
      <Text style={[styles.verseCount, { color: theme.secondaryText }]}>
        {verseCount} verses
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  arabic: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
  },
  verseCount: {
    fontSize: 12,
  },
});
