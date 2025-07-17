import { useAppContext } from "@/context/AppContext";
import { numberToArabic } from "@/utils/numberToArabic";
import { getSurahByNumber } from "@/utils/quran.data";
import { useMemo } from "react";
import { hafsFontBase64 } from "./hafsFontBase64";

export const useVersesHtml = () => {
  const { currentSurah, isDarkMode, fontSize, currentVerse } = useAppContext();

  const surah = useMemo(() => getSurahByNumber(currentSurah), [currentSurah]);

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
            font-size: ${fontSize}px;
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
  }, [surah, isDarkMode, fontSize]);

  return [htmlContent];
};
