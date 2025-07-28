import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren, useMemo } from "react";
import { SafeAreaView } from "react-native";
import { AppStatusBar } from "./AppStatusBar";

export const Screen: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useAppContext();

  const style = useMemo(
    () => ({
      flex: 1,
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
    }),
    [isDarkMode]
  );

  return (
    <>
      <AppStatusBar />
      {/* <View style={{ marginTop: 32 }} /> */}
      <SafeAreaView style={style}>{children}</SafeAreaView>
    </>
  );
};
