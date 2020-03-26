import { Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

let mediumScreenHeight = 650;
let largeScreenHeight = 800;

let ScreenSize =
  height >= largeScreenHeight ? "l" : height >= mediumScreenHeight ? "m" : "s";

export { ScreenSize };
