import { Root } from "./Root";
import { SurahDetail } from "./SurahDetail";
import { SurahNumber } from "./SurahNumber";

type Props = {
  onPress: () => void;
  surah: {
    number: number;
    arabic: string;
    english: string;
    translation: string;
    verses: number;
  };
};

export const SurahCard: React.FC<Props> = ({ onPress, surah }) => {
  return (
    <Root onPress={onPress}>
      <SurahNumber number={surah.number} />
      <SurahDetail surah={surah} />
    </Root>
  );
};
