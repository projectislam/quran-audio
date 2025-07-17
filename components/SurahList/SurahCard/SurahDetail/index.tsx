import { EnglishName } from "./EnglishName";
import { Root } from "./Root";
import { VerseCount } from "./VerseCount";

type Props = {
  surah: {
    number: number;
    arabic: string;
    english: string;
    translation: string;
    verses: number;
  };
};

export const SurahDetail: React.FC<Props> = ({ surah }) => {
  return (
    <Root>
      <EnglishName name={surah.english} translation={surah.translation} />
      <VerseCount arabic={surah.arabic} verseCount={surah.verses} />
    </Root>
  );
};
