import { ControlSection } from "./ControlSection";
import { ReciterSelection } from "./ReciterSection";
import { Root } from "./Root";

export const ControlArea = () => {
  return (
    <Root>
      <ControlSection />
      <ReciterSelection />
    </Root>
  );
};
