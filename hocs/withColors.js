import hoistStatics from "hoist-non-react-statics";
import {BaseColor, generateColors} from "../config";
import createElement from "./utils/createElement";
import React from "react";
/**
 * You can generate background or textColor using this hook
 * also supports for primaryColor:True
 * @param {String} ColorKey
 */
export const withColors = (
  ColorKey = "backgroundColor",
  base = BaseColor.whiteColor
) => (Component) => {
  const displayName = `withColors(${Component.displayName || Component.name})`;
  const C = React.forwardRef(
    (
      {
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
        lightPink,
        color,
        style,
        ...remainingProps
      },
      ref
    ) => {
      const innerRef = React.useRef(null);
      const attachRef = (el) => {
        innerRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else {
          ref = el;
        }
      };
      /** used to generate style colors */
      const styles = generateColors(undefined, ColorKey, ColorKey);
      const blockStyles = [
        {[ColorKey]: base},
        primaryColor && {[ColorKey]: BaseColor.primaryColor},
        darkPrimaryColor && {[ColorKey]: BaseColor.darkPrimaryColor},
        lightPrimaryColor && {[ColorKey]: BaseColor.lightPrimaryColor},
        accentColor && {[ColorKey]: BaseColor.accentColor},
        textSecondaryColor && {[ColorKey]: BaseColor.textSecondaryColor},
        lightGrayColor && {[ColorKey]: BaseColor.lightGrayColor},
        grayColor && {[ColorKey]: BaseColor.grayColor},
        darkGrayColor && {[ColorKey]: BaseColor.darkGrayColor},
        darkBlueColor && {[ColorKey]: BaseColor.darkBlueColor},
        dividerColor && {[ColorKey]: BaseColor.dividerColor},
        whiteColor && {[ColorKey]: BaseColor.whiteColor},
        fieldColor && {[ColorKey]: BaseColor.fieldColor},
        navyBlue && {[ColorKey]: BaseColor.navyBlue},
        lightPink && {[ColorKey]: BaseColor.lightPink},
        color && styles[`${ColorKey}${color}`],
        color && !styles[`${ColorKey}${color}`] && {[ColorKey]: color},
        remainingProps.disabled && {
          color: BaseColor.disabledColor || "#666666"
        },
        remainingProps.disabled && {
          backgroundColor: BaseColor.disabledBackgroundColor || "#cccccc"
        },
        style // rewrite predefined styles
      ];
      return createElement(Component, {
        style: blockStyles,
        ...remainingProps,
        ref: attachRef
      });
    }
  );
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withColors;
