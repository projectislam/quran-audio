import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const QuranHomeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSurah, setCurrentSurah] = useState("Al-Fatiha");

  const surahs = [
    {
      number: 1,
      arabic: "الفاتحة",
      english: "Al-Fatiha",
      translation: "The Opening",
      verses: 7,
    },
    {
      number: 2,
      arabic: "البقرة",
      english: "Al-Baqarah",
      translation: "The Cow",
      verses: 286,
    },
    {
      number: 3,
      arabic: "آل عمران",
      english: "Aal-E-Imran",
      translation: "The Family of Imran",
      verses: 200,
    },
    {
      number: 4,
      arabic: "النساء",
      english: "An-Nisa",
      translation: "The Women",
      verses: 176,
    },
    {
      number: 5,
      arabic: "المائدة",
      english: "Al-Maida",
      translation: "The Table",
      verses: 120,
    },
    {
      number: 6,
      arabic: "الأنعام",
      english: "Al-Anaam",
      translation: "The Cattle",
      verses: 165,
    },
    {
      number: 7,
      arabic: "الأعراف",
      english: "Al-Araf",
      translation: "The Heights",
      verses: 206,
    },
    {
      number: 8,
      arabic: "الأنفال",
      english: "Al-Anfal",
      translation: "The Spoils of War",
      verses: 75,
    },
    {
      number: 9,
      arabic: "التوبة",
      english: "At-Taubah",
      translation: "The Repentance",
      verses: 129,
    },
    {
      number: 10,
      arabic: "يونس",
      english: "Yunus",
      translation: "Jonah",
      verses: 109,
    },
    {
      number: 11,
      arabic: "هود",
      english: "Hud",
      translation: "Hud",
      verses: 123,
    },
    {
      number: 12,
      arabic: "يوسف",
      english: "Yusuf",
      translation: "Joseph",
      verses: 111,
    },
    {
      number: 13,
      arabic: "الرعد",
      english: "Ar-Rad",
      translation: "The Thunder",
      verses: 43,
    },
    {
      number: 14,
      arabic: "إبراهيم",
      english: "Ibrahim",
      translation: "Abraham",
      verses: 52,
    },
    {
      number: 15,
      arabic: "الحجر",
      english: "Al-Hijr",
      translation: "The Rock",
      verses: 99,
    },
    {
      number: 16,
      arabic: "النحل",
      english: "An-Nahl",
      translation: "The Bee",
      verses: 128,
    },
    {
      number: 17,
      arabic: "الإسراء",
      english: "Al-Isra",
      translation: "The Night Journey",
      verses: 111,
    },
    {
      number: 18,
      arabic: "الكهف",
      english: "Al-Kahf",
      translation: "The Cave",
      verses: 110,
    },
    {
      number: 19,
      arabic: "مريم",
      english: "Maryam",
      translation: "Mary",
      verses: 98,
    },
    {
      number: 20,
      arabic: "طه",
      english: "Ta-Ha",
      translation: "Ta-Ha",
      verses: 135,
    },
    {
      number: 21,
      arabic: "الأنبياء",
      english: "Al-Anbiya",
      translation: "The Prophets",
      verses: 112,
    },
    {
      number: 22,
      arabic: "الحج",
      english: "Al-Hajj",
      translation: "The Pilgrimage",
      verses: 78,
    },
    {
      number: 23,
      arabic: "المؤمنون",
      english: "Al-Muminun",
      translation: "The Believers",
      verses: 118,
    },
    {
      number: 24,
      arabic: "النور",
      english: "An-Nur",
      translation: "The Light",
      verses: 64,
    },
    {
      number: 25,
      arabic: "الفرقان",
      english: "Al-Furqan",
      translation: "The Criterion",
      verses: 77,
    },
    {
      number: 26,
      arabic: "الشعراء",
      english: "Ash-Shuara",
      translation: "The Poets",
      verses: 227,
    },
    {
      number: 27,
      arabic: "النمل",
      english: "An-Naml",
      translation: "The Ant",
      verses: 93,
    },
    {
      number: 28,
      arabic: "القصص",
      english: "Al-Qasas",
      translation: "The Stories",
      verses: 88,
    },
    {
      number: 29,
      arabic: "العنكبوت",
      english: "Al-Ankabut",
      translation: "The Spider",
      verses: 69,
    },
    {
      number: 30,
      arabic: "الروم",
      english: "Ar-Rum",
      translation: "The Romans",
      verses: 60,
    },
    {
      number: 31,
      arabic: "لقمان",
      english: "Luqman",
      translation: "Luqman",
      verses: 34,
    },
    {
      number: 32,
      arabic: "السجدة",
      english: "As-Sajdah",
      translation: "The Prostration",
      verses: 30,
    },
    {
      number: 33,
      arabic: "الأحزاب",
      english: "Al-Ahzab",
      translation: "The Clans",
      verses: 73,
    },
    {
      number: 34,
      arabic: "سبأ",
      english: "Saba",
      translation: "Sheba",
      verses: 54,
    },
    {
      number: 35,
      arabic: "فاطر",
      english: "Fatir",
      translation: "The Creator",
      verses: 45,
    },
    {
      number: 36,
      arabic: "يس",
      english: "Ya-Sin",
      translation: "Ya-Sin",
      verses: 83,
    },
    {
      number: 37,
      arabic: "الصافات",
      english: "As-Saffat",
      translation: "Those Ranged in Ranks",
      verses: 182,
    },
    { number: 38, arabic: "ص", english: "Sad", translation: "Sad", verses: 88 },
    {
      number: 39,
      arabic: "الزمر",
      english: "Az-Zumar",
      translation: "The Groups",
      verses: 75,
    },
    {
      number: 40,
      arabic: "غافر",
      english: "Ghafir",
      translation: "The Forgiver",
      verses: 85,
    },
    {
      number: 41,
      arabic: "فصلت",
      english: "Fussilat",
      translation: "Explained in Detail",
      verses: 54,
    },
    {
      number: 42,
      arabic: "الشورى",
      english: "Ash-Shura",
      translation: "The Consultation",
      verses: 53,
    },
    {
      number: 43,
      arabic: "الزخرف",
      english: "Az-Zukhruf",
      translation: "The Gold",
      verses: 89,
    },
    {
      number: 44,
      arabic: "الدخان",
      english: "Ad-Dukhan",
      translation: "The Smoke",
      verses: 59,
    },
    {
      number: 45,
      arabic: "الجاثية",
      english: "Al-Jathiyah",
      translation: "The Kneeling",
      verses: 37,
    },
    {
      number: 46,
      arabic: "الأحقاف",
      english: "Al-Ahqaf",
      translation: "The Curved Sand-hills",
      verses: 35,
    },
    {
      number: 47,
      arabic: "محمد",
      english: "Muhammad",
      translation: "Muhammad",
      verses: 38,
    },
    {
      number: 48,
      arabic: "الفتح",
      english: "Al-Fath",
      translation: "The Victory",
      verses: 29,
    },
    {
      number: 49,
      arabic: "الحجرات",
      english: "Al-Hujurat",
      translation: "The Dwellings",
      verses: 18,
    },
    { number: 50, arabic: "ق", english: "Qaf", translation: "Qaf", verses: 45 },
    {
      number: 51,
      arabic: "الذاريات",
      english: "Adh-Dhariyat",
      translation: "The Scatterers",
      verses: 60,
    },
    {
      number: 52,
      arabic: "الطور",
      english: "At-Tur",
      translation: "The Mount",
      verses: 49,
    },
    {
      number: 53,
      arabic: "النجم",
      english: "An-Najm",
      translation: "The Star",
      verses: 62,
    },
    {
      number: 54,
      arabic: "القمر",
      english: "Al-Qamar",
      translation: "The Moon",
      verses: 55,
    },
    {
      number: 55,
      arabic: "الرحمن",
      english: "Ar-Rahman",
      translation: "The Most Gracious",
      verses: 78,
    },
    {
      number: 56,
      arabic: "الواقعة",
      english: "Al-Waqiah",
      translation: "The Event",
      verses: 96,
    },
    {
      number: 57,
      arabic: "الحديد",
      english: "Al-Hadid",
      translation: "The Iron",
      verses: 29,
    },
    {
      number: 58,
      arabic: "المجادلة",
      english: "Al-Mujadilah",
      translation: "The Pleading",
      verses: 22,
    },
    {
      number: 59,
      arabic: "الحشر",
      english: "Al-Hashr",
      translation: "The Gathering",
      verses: 24,
    },
    {
      number: 60,
      arabic: "الممتحنة",
      english: "Al-Mumtahinah",
      translation: "The Tested",
      verses: 13,
    },
    {
      number: 61,
      arabic: "الصف",
      english: "As-Saff",
      translation: "The Row",
      verses: 14,
    },
    {
      number: 62,
      arabic: "الجمعة",
      english: "Al-Jumuah",
      translation: "Friday",
      verses: 11,
    },
    {
      number: 63,
      arabic: "المنافقون",
      english: "Al-Munafiqun",
      translation: "The Hypocrites",
      verses: 11,
    },
    {
      number: 64,
      arabic: "التغابن",
      english: "At-Taghabun",
      translation: "The Loss & Gain",
      verses: 18,
    },
    {
      number: 65,
      arabic: "الطلاق",
      english: "At-Talaq",
      translation: "The Divorce",
      verses: 12,
    },
    {
      number: 66,
      arabic: "التحريم",
      english: "At-Tahrim",
      translation: "The Prohibition",
      verses: 12,
    },
    {
      number: 67,
      arabic: "الملك",
      english: "Al-Mulk",
      translation: "The Kingdom",
      verses: 30,
    },
    {
      number: 68,
      arabic: "القلم",
      english: "Al-Qalam",
      translation: "The Pen",
      verses: 52,
    },
    {
      number: 69,
      arabic: "الحاقة",
      english: "Al-Haqqah",
      translation: "The Inevitable",
      verses: 52,
    },
    {
      number: 70,
      arabic: "المعارج",
      english: "Al-Maarij",
      translation: "The Ascending Stairways",
      verses: 44,
    },
    {
      number: 71,
      arabic: "نوح",
      english: "Nuh",
      translation: "Noah",
      verses: 28,
    },
    {
      number: 72,
      arabic: "الجن",
      english: "Al-Jinn",
      translation: "The Jinn",
      verses: 28,
    },
    {
      number: 73,
      arabic: "المزمل",
      english: "Al-Muzzammil",
      translation: "The Enshrouded One",
      verses: 20,
    },
    {
      number: 74,
      arabic: "المدثر",
      english: "Al-Muddaththir",
      translation: "The Cloaked One",
      verses: 56,
    },
    {
      number: 75,
      arabic: "القيامة",
      english: "Al-Qiyamah",
      translation: "The Resurrection",
      verses: 40,
    },
    {
      number: 76,
      arabic: "الإنسان",
      english: "Al-Insan",
      translation: "The Human",
      verses: 31,
    },
    {
      number: 77,
      arabic: "المرسلات",
      english: "Al-Mursalat",
      translation: "Those Sent Forth",
      verses: 50,
    },
    {
      number: 78,
      arabic: "النبأ",
      english: "An-Naba",
      translation: "The Great News",
      verses: 40,
    },
    {
      number: 79,
      arabic: "النازعات",
      english: "An-Naziat",
      translation: "Those Who Pull Out",
      verses: 46,
    },
    {
      number: 80,
      arabic: "عبس",
      english: "Abasa",
      translation: "He Frowned",
      verses: 42,
    },
    {
      number: 81,
      arabic: "التكوير",
      english: "At-Takwir",
      translation: "The Overthrowing",
      verses: 29,
    },
    {
      number: 82,
      arabic: "الانفطار",
      english: "Al-Infitar",
      translation: "The Cleaving",
      verses: 19,
    },
    {
      number: 83,
      arabic: "المطففين",
      english: "Al-Mutaffifin",
      translation: "Those Who Deal in Fraud",
      verses: 36,
    },
    {
      number: 84,
      arabic: "الانشقاق",
      english: "Al-Inshiqaq",
      translation: "The Splitting Asunder",
      verses: 25,
    },
    {
      number: 85,
      arabic: "البروج",
      english: "Al-Buruj",
      translation: "The Stars",
      verses: 22,
    },
    {
      number: 86,
      arabic: "الطارق",
      english: "At-Tariq",
      translation: "The Night-Comer",
      verses: 17,
    },
    {
      number: 87,
      arabic: "الأعلى",
      english: "Al-Ala",
      translation: "The Most High",
      verses: 19,
    },
    {
      number: 88,
      arabic: "الغاشية",
      english: "Al-Ghashiyah",
      translation: "The Overwhelming",
      verses: 26,
    },
    {
      number: 89,
      arabic: "الفجر",
      english: "Al-Fajr",
      translation: "The Dawn",
      verses: 30,
    },
    {
      number: 90,
      arabic: "البلد",
      english: "Al-Balad",
      translation: "The City",
      verses: 20,
    },
    {
      number: 91,
      arabic: "الشمس",
      english: "Ash-Shams",
      translation: "The Sun",
      verses: 15,
    },
    {
      number: 92,
      arabic: "الليل",
      english: "Al-Layl",
      translation: "The Night",
      verses: 21,
    },
    {
      number: 93,
      arabic: "الضحى",
      english: "Ad-Duha",
      translation: "The Forenoon",
      verses: 11,
    },
    {
      number: 94,
      arabic: "الشرح",
      english: "Ash-Sharh",
      translation: "The Opening Forth",
      verses: 8,
    },
    {
      number: 95,
      arabic: "التين",
      english: "At-Tin",
      translation: "The Fig",
      verses: 8,
    },
    {
      number: 96,
      arabic: "العلق",
      english: "Al-Alaq",
      translation: "The Clot",
      verses: 19,
    },
    {
      number: 97,
      arabic: "القدر",
      english: "Al-Qadr",
      translation: "The Night of Decree",
      verses: 5,
    },
    {
      number: 98,
      arabic: "البينة",
      english: "Al-Bayyinah",
      translation: "The Clear Evidence",
      verses: 8,
    },
    {
      number: 99,
      arabic: "الزلزلة",
      english: "Az-Zalzalah",
      translation: "The Earthquake",
      verses: 8,
    },
    {
      number: 100,
      arabic: "العاديات",
      english: "Al-Adiyat",
      translation: "Those That Run",
      verses: 11,
    },
    {
      number: 101,
      arabic: "القارعة",
      english: "Al-Qariah",
      translation: "The Striking Hour",
      verses: 11,
    },
    {
      number: 102,
      arabic: "التكاثر",
      english: "At-Takathur",
      translation: "The Piling Up",
      verses: 8,
    },
    {
      number: 103,
      arabic: "العصر",
      english: "Al-Asr",
      translation: "The Time",
      verses: 3,
    },
    {
      number: 104,
      arabic: "الهمزة",
      english: "Al-Humazah",
      translation: "The Slanderer",
      verses: 9,
    },
    {
      number: 105,
      arabic: "الفيل",
      english: "Al-Fil",
      translation: "The Elephant",
      verses: 5,
    },
    {
      number: 106,
      arabic: "قريش",
      english: "Quraish",
      translation: "Quraish",
      verses: 4,
    },
    {
      number: 107,
      arabic: "الماعون",
      english: "Al-Maun",
      translation: "The Small Kindnesses",
      verses: 7,
    },
    {
      number: 108,
      arabic: "الكوثر",
      english: "Al-Kawthar",
      translation: "The Abundance",
      verses: 3,
    },
    {
      number: 109,
      arabic: "الكافرون",
      english: "Al-Kafirun",
      translation: "The Disbelievers",
      verses: 6,
    },
    {
      number: 110,
      arabic: "النصر",
      english: "An-Nasr",
      translation: "The Help",
      verses: 3,
    },
    {
      number: 111,
      arabic: "المسد",
      english: "Al-Masad",
      translation: "The Palm Fiber",
      verses: 5,
    },
    {
      number: 112,
      arabic: "الإخلاص",
      english: "Al-Ikhlas",
      translation: "The Sincerity",
      verses: 4,
    },
    {
      number: 113,
      arabic: "الفلق",
      english: "Al-Falaq",
      translation: "The Daybreak",
      verses: 5,
    },
    {
      number: 114,
      arabic: "الناس",
      english: "An-Nas",
      translation: "The People",
      verses: 6,
    },
  ];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const selectSurah = (surahName: any) => {
    setCurrentSurah(surahName);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      textAlign: "center",
      flex: 1,
    },
    themeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
    },
    resumeSection: {
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      margin: 16,
      borderRadius: 16,
      padding: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    resumeTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      marginBottom: 8,
    },
    resumeSubtitle: {
      fontSize: 14,
      color: isDarkMode ? "#94a3b8" : "#64748b",
      marginBottom: 16,
    },
    resumeButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#10b981",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      elevation: 2,
      shadowColor: "#10b981",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    resumeButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 16,
    },
    surahItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      marginHorizontal: 16,
      marginVertical: 4,
      padding: 16,
      borderRadius: 12,
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    surahNumber: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#10b981" : "#10b981",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    surahNumberText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "bold",
    },
    surahContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    surahLeft: {
      flex: 1,
    },
    surahEnglish: {
      fontWeight: "600",
      marginBottom: 4,
      fontSize: 16,
      color: isDarkMode ? "#e2e8f0" : "#374151",
    },
    surahTranslation: {
      fontSize: 14,
      color: isDarkMode ? "#94a3b8" : "#64748b",
    },
    surahRight: {
      alignItems: "flex-end",
      marginLeft: 16,
    },
    surahArabic: {
      fontWeight: "bold",
      marginBottom: 4,
      fontSize: 18,
      color: isDarkMode ? "#ffffff" : "#1e293b",
    },
    surahVerses: {
      fontSize: 12,
      color: isDarkMode ? "#64748b" : "#94a3b8",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1e293b" : "#ffffff"}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name="settings-outline"
            size={20}
            color={isDarkMode ? "#94a3b8" : "#64748b"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>القرآن الكريم</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "sunny-outline" : "moon-outline"}
            size={20}
            color={isDarkMode ? "#fbbf24" : "#64748b"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Resume Section */}
        <View style={styles.resumeSection}>
          <Text style={styles.resumeTitle}>Continue Listening</Text>
          <Text style={styles.resumeSubtitle}>Last played: {currentSurah}</Text>
          <TouchableOpacity
            style={styles.resumeButton}
            onPress={togglePlayPause}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={20}
              color="#ffffff"
            />

            <Text style={styles.resumeButtonText}>
              {isPlaying ? "Pause" : "Resume"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Surahs List */}
        <Text style={styles.sectionTitle}>All Surahs</Text>

        {surahs.map((surah) => (
          <TouchableOpacity
            key={surah.number}
            style={styles.surahItem}
            onPress={() => selectSurah(surah.english)}
          >
            <View style={styles.surahNumber}>
              <Text style={styles.surahNumberText}>{surah.number}</Text>
            </View>

            <View style={styles.surahContent}>
              <View style={styles.surahLeft}>
                <Text style={styles.surahEnglish}>{surah.english}</Text>
                <Text style={styles.surahTranslation}>{surah.translation}</Text>
              </View>

              <View style={styles.surahRight}>
                <Text style={styles.surahArabic}>{surah.arabic}</Text>
                <Text style={styles.surahVerses}>{surah.verses} verses</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuranHomeScreen;
