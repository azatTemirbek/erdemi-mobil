import React from "react";
import { TouchableOpacity as TouchableOpacityQ } from "react-native";
import {
  withStyles,
  withColors,
  withShadows,
  compose,
  withMarginPaddings
} from "../../hocs";

export const TouchableOpacity = compose(
  withColors(),
  withStyles,
  withShadows,
  withMarginPaddings
)(props => <TouchableOpacityQ {...props} />);

export default TouchableOpacity;
