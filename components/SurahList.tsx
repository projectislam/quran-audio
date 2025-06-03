import { styles } from "@/styles/surahList";
import { getSurahs } from "@/utils/quranData";
import { useEffect, useState } from "react";
import {
  FlatList,
  I18nManager,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  verseCount: number;
}

export default function SurahList() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const colorScheme = useColorScheme();
  const isRTL = I18nManager.isRTL;

  useEffect(() => {
    const loadData = async () => {
      try {
        const surahsData = getSurahs();
        setSurahs(surahsData);
      } catch (error) {
        console.error("Error loading surahs:", error);
      }
    };

    loadData();
  }, []);

  const renderSurahItem = ({ item }: { item: Surah }) => (
    <TouchableOpacity style={styles.surahItem}>
      <View style={styles.surahNumber}>
        <Text
          style={[styles.numberText, colorScheme === "dark" && styles.darkText]}
        >
          {item.id}
        </Text>
      </View>
      <View style={styles.surahInfo}>
        <Text
          style={[styles.surahName, colorScheme === "dark" && styles.darkText]}
        >
          {item.nameArabic}
        </Text>
        <Text
          style={[
            styles.surahNameEnglish,
            colorScheme === "dark" && styles.darkText,
          ]}
        >
          {item.name}
        </Text>
      </View>
      <View style={styles.verseCount}>
        <Text
          style={[
            styles.verseCountText,
            colorScheme === "dark" && styles.darkText,
          ]}
        >
          {item.verseCount} آيات
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={surahs}
      renderItem={renderSurahItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}
