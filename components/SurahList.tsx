import { styles } from "@/styles/surahList";
import { getSurahs } from "@/utils/quranData";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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
  const router = useRouter();

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

  const handleSurahPress = (surahId: number) => {
    router.push(`/surah/${surahId}`);
  };

  const renderSurahItem = ({ item }: { item: Surah }) => (
    <TouchableOpacity
      style={[styles.surahItem, colorScheme === "dark" && styles.darkSurahItem]}
      onPress={() => handleSurahPress(item.id)}
    >
      <LinearGradient
        colors={["#4CAF50", "#45a049"]}
        style={styles.surahNumber}
      >
        <Text style={styles.numberText}>{item.id}</Text>
      </LinearGradient>
      <View style={styles.surahInfo}>
        <Text
          style={[styles.surahName, colorScheme === "dark" && styles.darkText]}
        >
          {item.nameArabic}
        </Text>
        <Text
          style={[styles.verseCount, colorScheme === "dark" && styles.darkText]}
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
      contentContainerStyle={[
        styles.listContainer,
        colorScheme === "dark" && styles.darkContainer,
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
}
