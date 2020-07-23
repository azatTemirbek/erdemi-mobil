import React from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
import {BaseColor} from "../../config";
import PropTypes from "prop-types";
import {Text, TouchableOpacity} from "../";
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
  onPress,
  ...rest
}) => {
  let btnStyle = [styles.default];
  !rest.disabled && full && btnStyle.push(styles.full);
  !rest.disabled && outline && btnStyle.push(styles.outline);
  rest.disabled && btnStyle.push(style.disabledTouch);
  btnStyle.push(style);
  return (
    <TouchableOpacity
      smallCard={!round}
      bigCard={round}
      row
      middle
      center
      padding={[0, 20]}
      onPress={rest.disabled ? () => {} : onPress}
      {...rest}
      style={btnStyle}
      activeOpacity={opacity}>
      {icon ? icon : null}
      <Text
        headline
        ml2
        color={!outline ? "whiteColor" : "primaryColor"}
        bold
        disabled={rest.disabled}
        style={styleText}
        numberOfLines={1}>
        {children || "Button"}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? BaseColor.primaryColor : BaseColor.whiteColor}
          style={{paddingLeft: 5}}
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
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
  shadow: PropTypes.bool,
  opacity: PropTypes.any,
  color: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  style: {},
  styleText: {},
  icon: null,
  outline: false,
  flex: false,
  full: false,
  round: false,
  loading: false,
  shadow: false,
  opacity: 0.8,
  color: BaseColor.primaryColor,
  disabled: false
};
export default Button;
