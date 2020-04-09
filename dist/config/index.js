import {
  BaseColor as baseColor,
  generateColors,
  RedColor,
  ExtraColors,
  BlueColor,
  PinkColor,
  GreenColor,
  YellowColor,
  OrangeColor
} from "./color";
import {Typography, FontWeight, FontFamily} from "./typography";
import {BaseSetting} from "./setting";
import {BaseStyle} from "./theme";
import {ScreenSize} from "./sizes";

const BaseColor = {
  ...RedColor,
  ...ExtraColors,
  ...baseColor
};

export {
  BaseColor,
  generateColors,
  Typography,
  FontWeight,
  FontFamily,
  BaseSetting,
  BaseStyle,
  ScreenSize,
  BlueColor,
  PinkColor,
  GreenColor,
  YellowColor,
  OrangeColor
};
