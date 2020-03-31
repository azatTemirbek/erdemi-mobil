import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Text } from "../";
import styles from "./styles";

export const Tag = ({
  style,
  styleText,
  icon,
  outline,
  small,
  tag,
  light,
  gray,
  rate,
  sale,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        styles.default,
        outline && styles.outline,
        small && styles.small,
        light && styles.light,
        gray && styles.gray,
        rate && styles.rate,
        sale && styles.sale,
        style
      ])}
      activeOpacity={0.9}
    >
      {icon ? icon : null}
      <View style={styles.viewText}>
        <Text
          style={StyleSheet.flatten([
            styles.textDefault,
            outline && styles.textOuline,
            small && styles.textSmall,
            light && styles.textLight,
            gray && styles.textGray,
            rate && styles.textRate,
            sale && styles.textSale,
            styleText
          ])}
          numberOfLines={1}
        >
          {children || "Tag"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Tag.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  light: PropTypes.bool,
  gray: PropTypes.bool,
  rate: PropTypes.bool,
  sale: PropTypes.bool
};

Tag.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  small: false,
  light: false,
  gray: false,
  rate: false,
  sale: false
};
export default Tag;
