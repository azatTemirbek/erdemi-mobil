import hoistStatics from "hoist-non-react-statics";
import {Typography, FontWeight, generateColors} from "../../config";
import createElement from "../utils/createElement";
/** will generate bgColors */
const styles = generateColors();
export const withFont = (
  {typography = Typography, fontWeight = FontWeight} = {
    typography: Typography,
    fontWeight: FontWeight
  }
) => (Component) => {
  const displayName = `withFont(${Component.displayName || Component.name})`;
  const C = ({
    /** Defined typo */
    header,
    title1,
    title2,
    title3,
    headline,
    body1,
    body2,
    callout,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    /** custom for font */
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    center,
    left,
    right,
    justify,
    bgColor,
    underline,
    textDecorationLine,
    style,
    ...remainingProps
  }) => {
    const blockStyles = [
      /** Defined typo */
      header && typography.header,
      title1 && typography.title1,
      title2 && typography.title2,
      title3 && typography.title3,
      headline && typography.headline,
      body1 && typography.body1,
      body2 && typography.body2,
      callout && typography.callout,
      subhead && typography.subhead,
      footnote && typography.footnote,
      caption1 && typography.caption1,
      caption2 && typography.caption2,
      overline && typography.overline,
      /** custom for font */
      thin && {fontWeight: fontWeight.thin},
      ultraLight && {
        fontWeight: fontWeight.ultraLight
      },
      light && {fontWeight: fontWeight.light},
      regular && {fontWeight: fontWeight.regular},
      medium && {fontWeight: fontWeight.medium},
      semibold && {fontWeight: fontWeight.semibold},
      bold && {fontWeight: fontWeight.bold},
      heavy && {fontWeight: fontWeight.heavy},
      black && {fontWeight: fontWeight.black},
      /** text alignment */
      {textAlign: "auto"},
      center && {textAlign: "center"},
      left && {textAlign: "left"},
      right && {textAlign: "right"},
      justify && {textAlign: "justify"},
      /** textDecorationLine */
      underline && {textDecorationLine: "underline"},
      textDecorationLine && {textDecorationLine: textDecorationLine},
      /** bg colors */
      bgColor && styles[bgColor],
      bgColor && !styles[bgColor] && {backgroundColor: bgColor},
      style && style
    ];
    return createElement(Component, {
      ...remainingProps,
      style: blockStyles
    });
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
};

export default withFont;
