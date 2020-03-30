import React from "react";
import { View, Animated } from "react-native";
import withStyles from "../../hocs";
import PropTypes from "prop-types";

export const Block = withStyles(({ animated, style, ...props }) =>
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
