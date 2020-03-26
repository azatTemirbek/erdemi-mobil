import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { BaseColor } from "../../config";
import PropTypes from "prop-types";
import { Text } from "../";
import styles from "./styles";
import * as Utils from "../../utils";

export default class Button extends Component {
  render() {
    const {
      style,
      styleText,
      icon,
      outline,
      full,
      round,
      loading,
      margin,
      padding,
      opacity,
      color,
      shadow,
      children,
      ...rest
    } = this.props;
    return (
      <TouchableOpacity
        {...rest}
        style={StyleSheet.flatten([
          styles.default,
          full && styles.full,
          round && styles.round,
          !!shadow &&
            Utils.elevationShadowStyle(shadow === true ? undefined : shadow),
          color && styles[color], // predefined styles colors for backgroundColor
          color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
          outline && styles.outline,
          margin && Utils.handleMargins(margin),
          padding && Utils.handlePaddings(padding),
          style
        ])}
        activeOpacity={opacity}
      >
        {icon ? icon : null}
        <Text
          style={StyleSheet.flatten([
            styles.textDefault,
            outline && styles.textOuline,
            styleText
          ])}
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
  }
}

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
