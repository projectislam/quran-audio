import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    overflow: "hidden",
  },
  numberText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  surahInfo: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 12,
  },
  surahName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "right",
    marginBottom: 4,
  },
  surahNameEnglish: {
    fontSize: 15,
    color: "#666",
    textAlign: "right",
    fontWeight: "500",
  },
  verseCount: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    fontWeight: "500",
  },
  darkText: {
    color: "#fff",
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  darkSurahItem: {
    backgroundColor: "#2a2a2a",
    borderBottomColor: "#333",
  },
  darkVerseCount: {
    backgroundColor: "#333",
  },
  darkVerseCountText: {
    color: "#ccc",
  },
});
