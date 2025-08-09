import { useAppContext } from "@/context/AppContext";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Reciter = {
  id: number;
  name: string;
};

type Props = {
  reciters: Reciter[];
  onSelect?: (id: number) => void;
};

export const ReciterList: React.FC<Props> = ({ reciters, onSelect }) => {
  const { theme, currentReciter } = useAppContext();

  return (
    <View
      style={[styles.dropdown, { backgroundColor: theme.secondaryButtonBG }]}
    >
      <ScrollView style={styles.dropdownScroll}>
        {reciters.map((reciter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect?.(reciter.id)}
            style={[
              styles.reciterOption,
              index === 0 && styles.firstOption,
              index === reciters.length - 1 && styles.lastOption,
            ]}
          >
            <Text
              style={[
                styles.reciterName,
                reciter.id === currentReciter
                  ? { color: theme.selectedText }
                  : { color: theme.primaryText },
              ]}
            >
              {reciter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 8,

    borderRadius: 8,
    zIndex: 10,
    maxHeight: 192,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownScroll: {
    flex: 1,
  },
  reciterOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastOption: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  reciterName: {
    fontSize: 14,
    textAlign: "left",
  },
});
