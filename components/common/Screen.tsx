import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStatusBar } from "./AppStatusBar";

export const Screen: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useAppContext();

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        {children}
      </SafeAreaView>
    </>
  );
};
