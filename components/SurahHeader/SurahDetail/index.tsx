import { StyleSheet, View } from "react-native";
import { EnglishName } from "./EnglishName";
import { VerseCount } from "./VerseCount";

export const SurahDetail = () => {
  return (
    <View style={styles.root}>
      <EnglishName />
      <VerseCount />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
