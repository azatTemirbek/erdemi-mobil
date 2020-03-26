import React, { Component } from "react";
import { View, Animated } from "react-native";
import styles from "./styles";
import * as Utils from "../../utils";

const Block = ({
  flex,
  row,
  column,
  center,
  middle,
  left,
  right,
  top,
  bottom,
  smallCard,
  card,
  bigCard,
  shadow,
  color,
  space,
  padding,
  margin,
  animated,
  wrap,
  style,
  children,
  ...props
}) => {
  const blockStyles = [
    styles.block,
    flex && { flex },
    flex === false && { flex: 0 }, // reset / disable flex
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    margin && Utils.handleMargins(margin),
    padding && Utils.handlePaddings(padding),
    smallCard && styles.smallCard,
    card && styles.card,
    bigCard && styles.bigCard,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: "wrap" },
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style // rewrite predefined styles
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...props}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export default Block;
