import Header from "@/components/Header";
import ResumeButton from "@/components/ResumeButton";
import SurahList from "@/components/SurahList";
import { styles } from "@/styles/home";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <Header />
      <ResumeButton />
      <SurahList />
    </SafeAreaView>
  );
}
