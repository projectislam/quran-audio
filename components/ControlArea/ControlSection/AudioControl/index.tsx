import { StyleSheet, View } from "react-native";
import { DisplayCurrentVerse } from "./DisplayCurrentVerse";
import { MediaButton } from "./MediaButton";
import { MediaState } from "./MediaState";
import { Root } from "./Root";

export const AudioControl = () => {
  return (
    <Root>
      <MediaButton />
      <View style={styles.infoContainer}>
        <DisplayCurrentVerse />
        <MediaState />
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    gap: 2,
  },
});
