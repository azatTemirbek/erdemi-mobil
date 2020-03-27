import React from "react";
import {StyleSheet} from "react-native";
import hoistStatics from "hoist-non-react-statics";
import {
  BaseColor,
  Typography,
  FontWeight,
  generateColors
} from "../../config";
import * as Utils from "../../utils";
const styles = StyleSheet.create({
  ...generateColors(undefined, "color", "color"),
  ...generateColors()
});

export const withFont = ({
  baseColor = BaseColor,
  typography = Typography,
  fontWeight = FontWeight
} = {
  baseColor : BaseColor,
  typography : Typography,
  fontWeight : FontWeight
}) => Component => {
  const displayName = `withFont(${Component.displayName || Component.name})`;
  const C = ({
    wrappedComponentRef,
    //props style
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
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    primaryColor,
    darkPrimaryColor,
    lightPrimaryColor,
    accentColor,
    textSecondaryColor,
    lightGrayColor,
    grayColor,
    darkGrayColor,
    darkBlueColor,
    dividerColor,
    whiteColor,
    fieldColor,
    navyBlue,
    center,
    color,
    bgColor,
    margin,
    padding,
    //custom,
    left,
    right,
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
      /** default color */
      StyleSheet.flatten({
        color: baseColor.textPrimaryColor
      }),
      /** applying colors directly */
      primaryColor && StyleSheet.flatten({ color: baseColor.primaryColor }),
      darkPrimaryColor &&
        StyleSheet.flatten({
          color: baseColor.darkPrimaryColor
        }),
      lightPrimaryColor &&
        StyleSheet.flatten({
          color: baseColor.lightPrimaryColor
        }),
      accentColor && StyleSheet.flatten({ color: baseColor.accentColor }),
      textSecondaryColor &&
        StyleSheet.flatten({
          color: baseColor.textSecondaryColor
        }),
      lightGrayColor && StyleSheet.flatten({ color: baseColor.lightGrayColor }),
      grayColor && StyleSheet.flatten({ color: baseColor.grayColor }),
      darkGrayColor && StyleSheet.flatten({ color: baseColor.darkGrayColor }),
      darkBlueColor && StyleSheet.flatten({ color: baseColor.darkBlueColor }),
      dividerColor && StyleSheet.flatten({ color: baseColor.dividerColor }),
      whiteColor && StyleSheet.flatten({ color: baseColor.whiteColor }),
      fieldColor && StyleSheet.flatten({ color: baseColor.fieldColor }),
      navyBlue && StyleSheet.flatten({ color: baseColor.navyBlue }),
      /** text alignment */
      StyleSheet.flatten({ textAlign: "auto" }),
      center && StyleSheet.flatten({ textAlign: "center" }),
      left && StyleSheet.flatten({ textAlign: "left" }),
      right && StyleSheet.flatten({ textAlign: "right" }),
      justify && StyleSheet.flatten({ textAlign: "justify" }),
      /** Text Color */
      color && styles[`color-${color}`],
      color &&
        !styles[`color-${color}`] &&
        StyleSheet.flatten({ color: color }),
      /** background Color */
      bgColor && styles[`${bgColor}`],
      bgColor &&
        !styles[`${bgColor}`] &&
        StyleSheet.flatten({ backgroundColor: bgColor }),
      margin && StyleSheet.flatten(Utils.handleMargins(margin)),
      padding && StyleSheet.flatten(Utils.handlePaddings(padding)),
      style && style
    ]);
    return (
      <Component
        style={blockStyles}
        {...remainingProps}
        ref={wrappedComponentRef}
      />
    );
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
};

export default withFont;
