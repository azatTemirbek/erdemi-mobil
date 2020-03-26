import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image } from "../";
import { BaseColor } from "../../config";
import * as Utils from "../../utils";
const XCard = ({
  style,
  children,
  styleContent,
  image,
  onPress,
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
  touchable,
  color,
  margin,
  padding
}) => {
  let Tag = View;
  let params = {};
  /** will render touchable if params provided */
  if (touchable) {
    Tag = TouchableOpacity;
    params.onPress = onPress;
    // params.activeOpacity = onPress;
  }
  return (
    <Tag
      style={StyleSheet.flatten([
        // default color
        StyleSheet.flatten({
          backgroundColor: BaseColor.whiteColor
        }),
        //custom for color
        primaryColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.primaryColor }),
        darkPrimaryColor &&
          StyleSheet.flatten({
            backgroundColor: BaseColor.darkPrimaryColor
          }),
        lightPrimaryColor &&
          StyleSheet.flatten({
            backgroundColor: BaseColor.lightPrimaryColor
          }),
        accentColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.accentColor }),
        textSecondaryColor &&
          StyleSheet.flatten({
            backgroundColor: BaseColor.textSecondaryColor
          }),
        lightGrayColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.lightGrayColor }),
        grayColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.grayColor }),
        darkGrayColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.darkGrayColor }),
        darkBlueColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.darkBlueColor }),
        dividerColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.dividerColor }),
        whiteColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.whiteColor }),
        fieldColor &&
          StyleSheet.flatten({ backgroundColor: BaseColor.fieldColor }),
        navyBlue && StyleSheet.flatten({ backgroundColor: BaseColor.navyBlue }),
        lightPink &&
          StyleSheet.flatten({ backgroundColor: BaseColor.lightPink }),
        color && styles[color], // predefined styles colors for bg color
        color && !styles[color] && { backgroundColor: color }, // custom bg color
        margin && Utils.handleMargins(margin),
        padding && Utils.handlePaddings(padding),
        styles.container,
        style && style
      ])}
      {...params}
    >
      {!!image && <Image source={image} style={styles.imageBanner} />}
      <View style={[styles.styleContent, styleContent]}>{children}</View>
    </Tag>
  );
};

XCard.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContent: PropTypes.object,
  touchable: PropTypes.bool,
  onPress: PropTypes.func,
  //custom for text color
  primaryColor: PropTypes.bool,
  darkPrimaryColor: PropTypes.bool,
  lightPrimaryColor: PropTypes.bool,
  accentColor: PropTypes.bool,
  textSecondaryColor: PropTypes.bool,
  lightGrayColor: PropTypes.bool,
  grayColor: PropTypes.bool,
  darkGrayColor: PropTypes.bool,
  darkBlueColor: PropTypes.bool,
  dividerColor: PropTypes.bool,
  whiteColor: PropTypes.bool,
  fieldColor: PropTypes.bool,
  lightPink: PropTypes.bool
};

XCard.defaultProps = {
  image: "" || false,
  style: {},
  styleContent: {},
  touchable: false,
  onPress: () => {},
  //custom for text color
  primaryColor: false,
  darkPrimaryColor: false,
  lightPrimaryColor: false,
  accentColor: false,
  textSecondaryColor: false,
  grayColor: false,
  darkBlueColor: false,
  dividerColor: false,
  whiteColor: false,
  fieldColor: false,
  lightPink: false
};
