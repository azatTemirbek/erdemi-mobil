import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image } from "../";
import {
  withColors,
  compose,
  withStyles,
  withMarginPaddings
} from "../../hocs";
import withShadows from "../../hocs/withShadows";

export const XCard = compose(
  withColors(),
  withStyles,
  withShadows,
  withMarginPaddings
)(({ style, children, styleContent, image, onPress, touchable, ...rest }) => {
  let Tag = View;
  let params = {};
  if (touchable) {
    Tag = TouchableOpacity;
    params.onPress = onPress;
  }
  return (
    <Tag style={[styles.container, style]} {...params}>
      {!!image && <Image source={image} style={styles.imageBanner} />}
      <View style={[styles.styleContent, styleContent]}>{children}</View>
    </Tag>
  );
});

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
  lightPink: PropTypes.bool,
  shadows: PropTypes.bool
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
  lightPink: false,
  shadows: true
};

export default XCard;
