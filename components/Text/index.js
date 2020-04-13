import {Text as Txt} from "react-native";
import PropTypes from "prop-types";
import {withFont, compose, withMarginPaddings, withColors} from "../../hocs";
import {BaseColor} from "../../config";
export const Text = compose(
  withFont(),
  withMarginPaddings,
  withColors("color", BaseColor.textPrimaryColor)
)(Txt);
export default Text;
// Define typechecking
Text.propTypes = {
  //define style
  header: PropTypes.bool,
  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  headline: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  callout: PropTypes.bool,
  subhead: PropTypes.bool,
  footnote: PropTypes.bool,
  caption1: PropTypes.bool,
  caption2: PropTypes.bool,
  overline: PropTypes.bool,
  //define font custom
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  black: PropTypes.bool,
  //custon for text color
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
  //numberOfLines
  numberOfLines: PropTypes.number,
  center: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  bgColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  //custom style
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node, // plain text,
  disabled: PropTypes.bool
};

Text.defaultProps = {
  //props for style
  header: false,
  title1: false,
  title2: false,
  title3: false,
  headline: false,
  body1: false,
  body2: false,
  callout: false,
  subhead: false,
  footnote: false,
  caption1: false,
  caption2: false,
  overline: false,
  //props for font
  thin: false,
  ultraLight: false,
  light: false,
  regular: false,
  medium: false,
  semibold: false,
  bold: false,
  heavy: false,
  black: false,
  //custon for text color
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
  //numberOfLines
  numberOfLines: 10,
  center: false,
  color: false,
  bgColor: false,
  //custom style
  style: {},
  children: "",
  disabled: false
};
