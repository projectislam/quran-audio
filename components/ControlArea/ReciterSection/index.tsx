import { useMemo, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { getAllReciters, getReciterById } from "../../../utils/reciter.data";
import { DropdownButton } from "./DropdownButton";
import { ReciterList } from "./ReciterList";
import { Root } from "./Root";

export const ReciterSelection = () => {
  const { currentReciter, setCurrentReciter } = useAppContext();
  const [open, setOpen] = useState(false);

  const reciters = useMemo(() => {
    const reciters = getAllReciters();
    return reciters.map((reciter) => ({
      ...reciter,
      name: getReciterDisplayName(reciter),
    }));
  }, []);

  const reciter = useMemo(() => {
    const reciter = getReciterById(currentReciter);
    return {
      ...reciter,
      name: getReciterDisplayName(reciter),
    };
  }, [currentReciter]);

  const handleSelection = (reciterId: number) => {
    setCurrentReciter(reciterId);
    setOpen(false);
  };

  return (
    <Root>
      <DropdownButton name={reciter.name} onPress={() => setOpen(!open)} />
      {open && <ReciterList reciters={reciters} onSelect={handleSelection} />}
    </Root>
  );
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
