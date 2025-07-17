import { BackButton } from "./BackButton";
import { Root } from "./Root";
import { SurahDetail } from "./SurahDetail";

export const SurahHeader = () => {
  return (
    <Root>
      <BackButton />
      <SurahDetail />
    </Root>
  );
};
