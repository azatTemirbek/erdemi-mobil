import React from "react";
import { View, Animated } from "react-native";
import { withStyles, compose, withColors, withShadows, withMarginPaddings } from "../../hocs";
import PropTypes from "prop-types";
/**
 * used to easy css
 */
export const Block = compose(
  withColors(),
  withStyles,
  withShadows,
  withMarginPaddings
)(({ animated, style, ...props }) =>
  animated ? (
    <Animated.View style={style} {...props} />
  ) : (
    <View style={style} {...props} />
  )
);

export default Block;
Block.propTypes = {
  animated: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Block.defaultProps = {
  animated: false,
  style: {}
};
