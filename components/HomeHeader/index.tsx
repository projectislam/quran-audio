import React from "react";
import { Root } from "./Root";
import { Title } from "./Title";
import { ToggleTheme } from "./ToggleTheme";

export const Header = () => {
  return (
    <Root>
      <Title />
      <ToggleTheme />
    </Root>
  );
};
