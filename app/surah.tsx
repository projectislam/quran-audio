import { numberToArabic } from "@/utils/numberToArabic";
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

const SurahDetailScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [selectedReciter, setSelectedReciter] = useState(
    "Abdul Rahman Al-Sudais"
  );
  const [showReciterDropdown, setShowReciterDropdown] = useState(false);

  // Sample verses data (Al-Fatiha)
  const surahData = {
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    meaning: "The Opening",
    verses: [
      { id: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
      { id: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
      { id: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ" },
      { id: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ" },
      { id: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
      { id: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" },
      {
        id: 7,
        arabic:
          "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      },
    ],
  };

  const reciters = [
    "Abdul Rahman Al-Sudais",
    "Mishary Rashid Alafasy",
    "Saad Al Ghamidi",
    "Maher Al Mueaqly",
    "Ahmed Ali Al Ajmy",
    "Yasser Al Dosari",
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVerseClick = (verseId: any) => {
    setCurrentVerse(verseId);
  };

  const handleReciterSelect = (reciter: any) => {
    setSelectedReciter(reciter);
    setShowReciterDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#334155" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#10b981" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.surahName}>{surahData.name}</Text>
            <Text style={styles.surahMeaning}>{surahData.meaning}</Text>
          </View>
        </View>
        <Text style={styles.arabicName}>{surahData.arabicName}</Text>
      </View>

      {/* Audio Controls */}
      <View style={styles.audioControls}>
        <View style={styles.audioControlsTop}>
          <View style={styles.playSection}>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color="white"
                style={!isPlaying && { marginLeft: 2 }}
              />
            </TouchableOpacity>
            <View style={styles.playInfo}>
              <Text style={styles.verseText}>Verse {currentVerse}</Text>
              <Text style={styles.playingText}>Playing</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Reciter Selection */}
        <View style={styles.reciterSection}>
          <TouchableOpacity
            onPress={() => setShowReciterDropdown(!showReciterDropdown)}
            style={styles.reciterButton}
          >
            <Text style={styles.reciterText}>Reciter: {selectedReciter}</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color="white"
              style={[
                styles.chevron,
                showReciterDropdown && styles.chevronRotated,
              ]}
            />
          </TouchableOpacity>

          {showReciterDropdown && (
            <View style={styles.dropdown}>
              <ScrollView style={styles.dropdownScroll}>
                {reciters.map((reciter, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleReciterSelect(reciter)}
                    style={[
                      styles.reciterOption,
                      selectedReciter === reciter && styles.selectedReciter,
                      index === 0 && styles.firstOption,
                      index === reciters.length - 1 && styles.lastOption,
                    ]}
                  >
                    <Text style={styles.reciterOptionText}>{reciter}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Verses */}
      <ScrollView
        style={styles.versesContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Simple Surah Header */}
        {/* <View style={styles.surahHeader}>
          <Text style={styles.surahHeaderText}>{surahData.arabicName}</Text>
        </View> */}

        {/* Verses Container */}
        <View style={styles.versesContent}>
          <View style={styles.versesText}>
            <Text
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {surahData.verses.map((verse, index) => (
                <Text
                  key={verse.id}
                  style={[
                    styles.arabicText,
                    currentVerse === verse.id && styles.currentArabicText,
                  ]}
                  onPress={() => handleVerseClick(verse.id)}
                >
                  {verse.arabic +
                    " " +
                    String.fromCharCode(0xfd3f) +
                    numberToArabic(verse.id) +
                    String.fromCharCode(0xfd3e) +
                    " "}
                </Text>
              ))}
            </Text>
            {/* {surahData.verses.map((verse, index) => (
              <View key={verse.id} style={styles.verseContainer}>
                <TouchableOpacity
                  onPress={() => handleVerseClick(verse.id)}
                  style={[
                    styles.verseTouch,
                    currentVerse === verse.id && styles.currentVerseTouch,
                  ]}
                >
                  <Text
                    style={[
                      styles.arabicText,
                      currentVerse === verse.id && styles.currentArabicText,
                    ]}
                  >
                    {verse.arabic}
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.verseNumber,
                    currentVerse === verse.id && styles.currentVerseNumber,
                  ]}
                >
                  <Text
                    style={[
                      styles.verseNumberText,
                      currentVerse === verse.id &&
                        styles.currentVerseNumberText,
                    ]}
                  >
                    {verse.id}
                  </Text>
                </View>
              </View>
            ))} */}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
  },
  header: {
    backgroundColor: "#334155",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    gap: 2,
  },
  surahName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  surahMeaning: {
    fontSize: 14,
    color: "#d1d5db",
  },
  arabicName: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  audioControls: {
    backgroundColor: "#334155",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#475569",
  },
  audioControlsTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  playSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playButton: {
    backgroundColor: "#10b981",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  playInfo: {
    gap: 2,
  },
  verseText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  playingText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  reciterSection: {
    position: "relative",
  },
  reciterButton: {
    backgroundColor: "#475569",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reciterText: {
    fontSize: 14,
    color: "white",
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }],
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: "#475569",
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
  selectedReciter: {
    backgroundColor: "#059669",
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastOption: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  reciterOptionText: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
  },
  versesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  surahHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  surahHeaderText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  versesContent: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  versesText: {
    alignItems: "flex-end",
  },
  verseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  verseTouch: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    flex: 1,
  },
  currentVerseTouch: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  arabicText: {
    fontSize: 24,
    lineHeight: 40,
    color: "white",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "hafs",
  },
  currentArabicText: {
    color: "#6ee7b7",
  },
  verseNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#475569",
    alignItems: "center",
    justifyContent: "center",
  },
  currentVerseNumber: {
    backgroundColor: "#10b981",
  },
  verseNumberText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#d1d5db",
  },
  currentVerseNumberText: {
    color: "white",
  },
  bottomSpacing: {
    height: 80,
  },
});

export default SurahDetailScreen;
