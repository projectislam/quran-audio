import { useAppContext } from "@/context/AppContext";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useVersesHtml } from "./useVersesHtml";

type Props = {
  onVerseSelection?: (verse: number) => void;
};

export const RenderHtml: React.FC<Props> = ({ onVerseSelection }) => {
  const { currentVerse } = useAppContext();
  const firstTime = useRef(true);
  const webViewRef = useRef<WebView>(null);
  const [html] = useVersesHtml();

  const handleWebViewMessage = useCallback(
    (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);

        if (data.type === "verseSelected") {
          onVerseSelection?.(data.verse);
        }
      } catch (error) {
        console.error("Error parsing WebView message:", error);
      }
    },
    [onVerseSelection]
  );

  const scrollToVerse = useCallback((verseNumber: number) => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "highlightVerse",
        verse: verseNumber,
      })
    );
  }, []);

  useEffect(() => {
    if (!firstTime.current) {
      scrollToVerse(currentVerse);
    }
    firstTime.current = false;
  }, [currentVerse]);

  return (
    <WebView
      ref={webViewRef}
      source={{ html }}
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
      androidLayerType="hardware"
      mixedContentMode="compatibility"
      thirdPartyCookiesEnabled={false}
      sharedCookiesEnabled={false}
      injectedJavaScript={`
              const meta = document.createElement('meta');
              meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
              meta.setAttribute('name', 'viewport');
              document.getElementsByTagName('head')[0].appendChild(meta);
            `}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
