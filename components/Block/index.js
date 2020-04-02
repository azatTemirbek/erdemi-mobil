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
)(({ animated, ...props }) =>
  animated ? (
    <Animated.View {...props} />
  ) : (
    <View {...props} />
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
