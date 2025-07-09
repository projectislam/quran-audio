import { useAppContext } from "@/context/AppContext";
import { getAudioDetail } from "@/utils/audio.data";
import { numberToArabic } from "@/utils/numberToArabic";
import { getSurahByNumber } from "@/utils/quran.data";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const SurahVerses = () => {
  const {
    currentSurah,
    currentVerse,
    setCurrentVerse,
    isDarkMode,
    soundRef,
    currentReciter,
  } = useAppContext();
  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

  const handleVerseSelection = async (verse: number) => {
    console.log("handleVerseSelection", soundRef.current);
    if (soundRef.current) {
      const audioDetail = await getAudioDetail(currentReciter, currentSurah);

      const currentVerseKey = `${currentSurah}:${verse}`;
      const verseTimestamp = audioDetail.timestamps.find(
        (v) => v.verse_key === currentVerseKey
      );

      if (!verseTimestamp) {
        console.warn("Verse timestamp not found");
        return;
      }

      console.log("update sound record to", verseTimestamp.timestamp_from);
      await soundRef.current?.setPositionAsync(verseTimestamp.timestamp_from);
    }

    setCurrentVerse(verse);
  };

  const styles = StyleSheet.create({
    versesContent: {
      paddingHorizontal: 4,
      paddingVertical: 16,
    },
    versesText: {
      alignItems: "flex-end",
    },
    arabicText: {
      fontSize: 24,
      lineHeight: 40,
      color: isDarkMode ? "white" : "black",
      textAlign: "right",
      writingDirection: "rtl",
      fontFamily: "hafs",
    },
    currentArabicText: {
      color: isDarkMode ? "#6ee7b7" : "green",
    },
  });

  return (
    <View style={styles.versesContent}>
      <View style={styles.versesText}>
        <Text
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {surah?.ayas.map((verse) => (
            <Text
              key={verse.index}
              style={[
                styles.arabicText,
                currentVerse === verse.index && styles.currentArabicText,
              ]}
              onPress={() => handleVerseSelection(verse.index)}
            >
              {verse.text +
                " " +
                String.fromCharCode(0xfd3f) +
                numberToArabic(verse.index) +
                String.fromCharCode(0xfd3e) +
                " "}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
};
