import React, { useState } from "react";
import { DropdownButton } from "./DropdownButton";
import { DropdownList } from "./DropdownList";
import { Root } from "./Root";

export const ToggleTheme = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <Root>
      <DropdownButton onPress={toggleDropdown} />
      {open && <DropdownList />}
    </Root>
  );
};
