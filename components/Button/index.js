import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { BaseColor } from "../../config";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "../";
import styles from "./styles";

export const Button = ({
  style,
  styleText,
  icon,
  outline,
  full,
  round,
  loading,
  opacity,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      smallCard={!round}
      bigCard={round}
      row
      middle
      center
      padding={[0, 20]}
      {...rest}
      style={StyleSheet.flatten([
        styles.default,
        full && styles.full,
        outline && styles.outline,
        style
      ])}
      activeOpacity={opacity}
    >
      {icon ? icon : null}
      <Text
        headline
        color={outline ? "primaryColor" : "whiteColor"}
        bold
        style={styleText}
        numberOfLines={1}
      >
        {children || "Button"}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? BaseColor.primaryColor : BaseColor.whiteColor}
          style={{ paddingLeft: 5 }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleText: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
  shadow: PropTypes.bool,
  opacity: PropTypes.any,
  color: PropTypes.string
};

Button.defaultProps = {
  style: {},
  styleText: {},
  icon: null,
  outline: false,
  full: false,
  round: false,
  loading: false,
  shadow: false,
  opacity: 0.8,
  color: BaseColor.primaryColor
};
export default Button;
