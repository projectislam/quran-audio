import React from "react";
import { ContinueListeningText } from "./ContinueListeningText";
import { LastPlayedDetail } from "./LastPlayedDetail";
import { ResumeButton } from "./ResumeButton";
import { Root } from "./Root";

export const ResumeSection = () => {
  return (
    <Root>
      <ContinueListeningText />
      <LastPlayedDetail />
      <ResumeButton />
    </Root>
  );
};
