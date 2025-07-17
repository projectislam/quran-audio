import { useMemo, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { getAllReciters, getReciterById } from "../../../utils/reciter.data";
import { DropdownButton } from "./DropdownButton";
import { ReciterList } from "./ReciterList";
import { Root } from "./Root";

export const ReciterSelection = () => {
  const {
    currentReciter,
    setCurrentReciter,
    setCurrentVerse,
    isDarkMode,
    soundRef,
    setIsPlaying,
  } = useAppContext();
  const [showReciterDropdown, setShowReciterDropdown] = useState(false);

  const reciters = useMemo(getAllReciters, []);
  const reciter = useMemo(
    () => getReciterById(currentReciter),
    [currentReciter]
  );

  const handleReciterSelection = async (reciterId: number) => {
    await soundRef.current?.pauseAsync();
    await soundRef.current?.unloadAsync();
    soundRef.current = null;

    // setCurrentVerse(1);
    setIsPlaying(false);
    setCurrentReciter(reciterId);
    setShowReciterDropdown(false);
  };

  const getReciterDisplayName = (reciter: any) => {
    if (
      reciter?.translated_name?.name &&
      reciter?.translated_name?.language_name === "urdu"
    ) {
      return `${reciter.name}\n${reciter.translated_name.name}`;
    }
    return reciter?.name || "Unknown Reciter";
  };

  return (
    <Root>
      <DropdownButton name="Reciter Name" />
      <ReciterList reciters={[]} />
    </Root>
  );
};
