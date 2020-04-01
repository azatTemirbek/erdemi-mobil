import { StyleSheet } from "react-native";
import hoistStatics from "hoist-non-react-statics";
import { Typography, FontWeight, generateColors } from "../../config";
import createElement from "../utils/createElement";
/** will generate bgColors */
const styles = StyleSheet.create({
  ...generateColors()
});

export const withFont = (
  { typography = Typography, fontWeight = FontWeight } = {
    typography: Typography,
    fontWeight: FontWeight
  }
) => Component => {
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
    style,
    ...remainingProps
  }) => {
    const blockStyles = StyleSheet.flatten([
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
      thin && StyleSheet.flatten({ fontWeight: fontWeight.thin }),
      ultraLight &&
        StyleSheet.flatten({
          fontWeight: fontWeight.ultraLight
        }),
      light && StyleSheet.flatten({ fontWeight: fontWeight.light }),
      regular && StyleSheet.flatten({ fontWeight: fontWeight.regular }),
      medium && StyleSheet.flatten({ fontWeight: fontWeight.medium }),
      semibold && StyleSheet.flatten({ fontWeight: fontWeight.semibold }),
      bold && StyleSheet.flatten({ fontWeight: fontWeight.bold }),
      heavy && StyleSheet.flatten({ fontWeight: fontWeight.heavy }),
      black && StyleSheet.flatten({ fontWeight: fontWeight.black }),
      /** text alignment */
      { textAlign: "auto" },
      center && { textAlign: "center" },
      left && { textAlign: "left" },
      right && { textAlign: "right" },
      justify && { textAlign: "justify" },
      /** bg colors */ 
      bgColor && styles[bgColor],
      bgColor && !styles[bgColor] && { backgroundColor: bgColor },
      style && style
    ]);
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
