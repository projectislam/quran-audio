import { Downloading } from "./Downloading";
import { Paused } from "./Paused";
import { Playing } from "./Playing";

export const MediaState = () => {
  const state: any = "downloading";

  switch (state) {
    case "downloading":
      return <Downloading />;
    case "playing":
      return <Playing />;
    case "paused":
      return <Paused />;
  }
};
