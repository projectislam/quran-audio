import { useAppContext } from "@/context/AppContext";
import { getAudioDetail } from "@/utils/audio.data";
import { numberToArabic } from "@/utils/numberToArabic";
import { getSurahByNumber } from "@/utils/quran.data";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { hafsFontBase64 } from "./hafsFontBase64";

export const SurahVerses = () => {
  const {
    currentSurah,
    currentVerse,
    setCurrentVerse,
    isDarkMode,
    soundRef,
    currentReciter,
  } = useAppContext();

  const firstTime = useRef(true);
  const webViewRef = useRef<WebView>(null);
  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

  const handleVerseSelection = async (verse: number) => {
    if (soundRef.current) {
      const audioDetail = await getAudioDetail(currentReciter, currentSurah);

      const currentVerseKey = `${currentSurah}:${verse}`;
      const verseTimestamp = audioDetail.timestamps.find(
        (v) => v.verse_key === currentVerseKey
      );

      if (!verseTimestamp) {
        return;
      }

      await soundRef.current?.setPositionAsync(verseTimestamp.timestamp_from);
    }

    setCurrentVerse(verse);
  };

  useEffect(() => {
    if (!firstTime.current) {
      scrollToVerse(currentVerse);
    }
    firstTime.current = false;
  }, [currentVerse]);

  // Generate HTML content for the WebView
  const htmlContent = useMemo(() => {
    if (!surah?.ayas) return "";

    const verses = surah.ayas
      .map((verse) => {
        const verseText = `${verse.text} ${String.fromCharCode(
          0xfd3f
        )}${numberToArabic(verse.index)}${String.fromCharCode(0xfd3e)}`;
        return `<span class="verse" data-verse="${verse.index}" onclick="selectVerse(${verse.index})">${verseText}</span>`;
      })
      .join(" ");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          @font-face {
            font-family: 'Hafs';
            src: url('${hafsFontBase64}') format('opentype');
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Hafs', Arial, sans-serif;
            font-size: 24px;
            line-height: 1.8;
            padding: 16px;
            color: ${isDarkMode ? "#ffffff" : "#000000"};
            direction: rtl;
            text-align: right;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 0 8px;
          }
          
          .verse {
            display: inline;
            cursor: pointer;
            padding: 2px 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
            position: relative;
          }
          
          .verse:hover {
          }
          
          .verse.current {
            color: ${isDarkMode ? "#6ee7b7" : "#059669"} !important;
          }
          
          .verse.playing {
            animation: pulse 1s infinite;
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar for webkit */
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${isDarkMode ? "#374151" : "#f1f5f9"};
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${isDarkMode ? "#6b7280" : "#cbd5e1"};
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${isDarkMode ? "#9ca3af" : "#94a3b8"};
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${verses}
        </div>
        
        <script>
          let currentVerse = ${currentVerse};
          
          function selectVerse(verseNumber) {
            // Remove previous highlighting
            const prevVerse = document.querySelector('.verse.current');
            if (prevVerse) {
              prevVerse.classList.remove('current');
            }
            
            // Highlight selected verse
            const selectedVerse = document.querySelector('[data-verse="' + verseNumber + '"]');
            if (selectedVerse) {
              selectedVerse.classList.add('current');
              selectedVerse.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            currentVerse = verseNumber;
            
            // Send message to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'verseSelected',
              verse: verseNumber
            }));
          }
          
          function highlightVerse(verseNumber) {
            // Remove all current highlighting
            const verses = document.querySelectorAll('.verse');
            verses.forEach(verse => {
              verse.classList.remove('current', 'playing');
            });
            
            // Highlight the specified verse
            const verse = document.querySelector('[data-verse="' + verseNumber + '"]');
            if (verse) {
              verse.classList.add('current');
              verse.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          
          function setPlayingVerse(verseNumber) {
            // Remove all playing states
            const verses = document.querySelectorAll('.verse');
            verses.forEach(verse => {
              verse.classList.remove('playing');
            });
            
            // Add playing state to current verse
            const verse = document.querySelector('[data-verse="' + verseNumber + '"]');
            if (verse) {
              verse.classList.add('playing');
            }
          }
          
          // Listen for messages from React Native
          document.addEventListener('message', function(event) {
            const data = JSON.parse(event.data);
            
            if (data.type === 'highlightVerse') {
              highlightVerse(data.verse);
            } else if (data.type === 'setPlayingVerse') {
              setPlayingVerse(data.verse);
            } else if (data.type === 'updateTheme') {
              // Handle theme updates
              location.reload();
            }
          });
          
          // Initialize with current verse
          if (currentVerse) {
            setTimeout(() => {
              highlightVerse(currentVerse);
            }, 500);
          }
        </script>
      </body>
      </html>
    `;
  }, [surah, isDarkMode]);

  const handleWebViewMessage = useCallback(
    (event: any) => {
      try {
        console.log(event.nativeEvent.data);
        const data = JSON.parse(event.nativeEvent.data);

        if (data.type === "verseSelected") {
          handleVerseSelection(data.verse);
        }
      } catch (error) {
        console.error("Error parsing WebView message:", error);
      }
    },
    [handleVerseSelection]
  );

  // Function to scroll to a specific verse
  const scrollToVerse = useCallback((verseNumber: number) => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "highlightVerse",
        verse: verseNumber,
      })
    );
  }, []);

  // Function to show playing state
  const setPlayingVerse = useCallback((verseNumber: number) => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "setPlayingVerse",
        verse: verseNumber,
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webView}
        onMessage={handleWebViewMessage}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        // Performance optimizations
        androidLayerType="hardware"
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={false}
        sharedCookiesEnabled={false}
        // Disable zoom
        injectedJavaScript={`
          const meta = document.createElement('meta');
          meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          meta.setAttribute('name', 'viewport');
          document.getElementsByTagName('head')[0].appendChild(meta);
        `}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
