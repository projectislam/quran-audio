import { AppContextProvider } from "@/context/AppContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    hafs: require("../assets/fonts/hafs.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AppContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppContextProvider>
  );
}
