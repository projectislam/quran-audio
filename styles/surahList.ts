import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  surahInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  surahName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    textAlign: "right",
  },
  surahNameEnglish: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    textAlign: "right",
  },
  verseCount: {
    marginRight: 10,
  },
  verseCountText: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  darkText: {
    color: "#fff",
  },
});
