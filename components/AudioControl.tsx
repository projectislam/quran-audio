import {
  AudioDetail,
  fetchChapterRecitation,
  getAudioDetailFromCache,
  saveAudioDetailToCache,
} from "@/utils/audio.data";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import { ReciterSelection } from "./ReciterSelection";

export const AudioControl = () => {
  const {
    currentVerse,
    currentSurah,
    currentReciter,
    isDarkMode,
    isPlaying,
    setIsPlaying,
    setCurrentVerse,
    soundRef,
  } = useAppContext();
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const handlePlayPause = () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  const pauseAudio = async () => {
    console.log("pause audio");
    await soundRef.current?.pauseAsync();
    setIsPlaying(false);
  };

  const playAudio = async () => {
    console.log("play audio");
    const audioDetail = await fetchAudioDetail(currentReciter, currentSurah);
    console.log("audioDetail");

    const currentVerseKey = `${currentSurah}:${currentVerse}`;
    const verseTimestamp = audioDetail.timestamps.find(
      (v) => v.verse_key === currentVerseKey
    );

    if (!verseTimestamp) {
      console.warn("Verse timestamp not found");
      return;
    }

    if (!soundRef.current) {
      console.log("setup soundRef");
      const fileUri = await downloadAudio(
        audioDetail.audio_url,
        audioDetail.id
      );
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri! });
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          return;
        }

        const position = status.positionMillis;

        const currentVerse = audioDetail.timestamps.find(
          (t) => position >= t.timestamp_from && position < t.timestamp_to
        );

        if (
          currentVerse &&
          currentVerse.verse_key !== currentVerseKey &&
          position > 0
        ) {
          console.log("set current verse", currentVerseKey, position);
          setCurrentVerse(Number(currentVerse.verse_key.split(":")[1]));
        }

        if (status.didJustFinish) {
          setCurrentVerse(1);
          setIsPlaying(false);
          soundRef.current?.unloadAsync();
          soundRef.current = null;
        }
      });
    }

    await soundRef.current?.setPositionAsync(verseTimestamp.timestamp_from);
    await soundRef.current?.playAsync();
    setIsPlaying(true);
  };

  const fetchAudioDetail = async (reciterId: number, surahId: number) => {
    console.log("getAudioDetail", reciterId, surahId);
    let audioDetail = await getAudioDetailFromCache(reciterId, surahId);

    // console.log("audioDetail", audioDetail);

    if (!audioDetail) {
      setDownloading(true);
      console.log("fetchChapterRecitation");
      audioDetail = await fetchChapterRecitation(reciterId, surahId);
      await saveAudioDetailToCache(reciterId, surahId, audioDetail);
      setDownloading(false);
    }

    return audioDetail as AudioDetail;
  };

  const downloadAudio = async (audioUrl: string, id: string) => {
    try {
      console.log("downloading audio..");
      const fileName = id + "_" + audioUrl.split("/").pop();
      const localUri = `${FileSystem.documentDirectory}audio/${fileName}`;

      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (!fileInfo.exists) {
        console.log("file not exist");
        setDownloading(true);
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}audio`,
          { intermediates: true }
        );

        let lastTime = Date.now();
        let lastBytes = 0;

        const callback = (
          downloadProgress: FileSystem.DownloadProgressData
        ) => {
          const { totalBytesWritten, totalBytesExpectedToWrite } =
            downloadProgress;

          const percent = totalBytesWritten / totalBytesExpectedToWrite;
          setDownloadProgress(percent);

          const now = Date.now();
          const timeElapsed = (now - lastTime) / 1000; // in seconds
          const bytesDownloaded = totalBytesWritten - lastBytes;

          if (timeElapsed > 0.5) {
            const speedKBps = bytesDownloaded / 1024 / timeElapsed;
            setDownloadSpeed(speedKBps);
            lastTime = now;
            lastBytes = totalBytesWritten;
          }
        };

        const downloadResumable = FileSystem.createDownloadResumable(
          audioUrl,
          localUri,
          {},
          callback
        );
        await downloadResumable.downloadAsync();
        console.log("download complete");
        setDownloading(false);
      }

      return localUri;
    } catch (e) {
      console.log(e);
    } finally {
      setDownloading(false);
    }
  };

  const styles = StyleSheet.create({
    audioControls: {
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      marginTop: 16,
      marginLeft: 16,
      marginRight: 16,
      borderRadius: 16,
      padding: 20,
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
      color: isDarkMode ? "white" : "black",
    },
    playingText: {
      fontSize: 12,
      color: isDarkMode ? "white" : "black",
    },
  });

  return (
    <View style={styles.audioControls}>
      <View style={styles.audioControlsTop}>
        <View style={styles.playSection}>
          <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
            <Ionicons
              name={downloading ? "arrow-down" : isPlaying ? "pause" : "play"}
              size={24}
              color="white"
              style={!isPlaying && { marginLeft: 2 }}
            />
          </TouchableOpacity>
          <View style={styles.playInfo}>
            <Text style={styles.verseText}>Verse {currentVerse}</Text>
            <Text style={styles.playingText}>
              {downloading
                ? `Downloading... ${downloadProgress * 100}%`
                : isPlaying
                ? "Playing"
                : "Paused"}
            </Text>
          </View>
        </View>
      </View>

      {/* Reciter Selection */}
      <ReciterSelection />
    </View>
  );
};
