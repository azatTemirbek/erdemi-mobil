import React, { useCallback } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { BaseColor } from "../../config";
import { Icon } from "../";
import PropTypes from "prop-types";
import styles from "./styles";

const CheckBox = ({ onChange, value, sm, md, lg, xl, style }) => {
  const onPress = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: value ? BaseColor.primaryColor : BaseColor.whiteColor
        },
        // StyleSheet.flatten({ padding: 5 }),
        sm && StyleSheet.flatten({ padding: 3 }),
        md && StyleSheet.flatten({ padding: 5 }),
        lg && StyleSheet.flatten({ padding: 7.5 }),
        xl && StyleSheet.flatten({ padding: 10 }),
        style && style
      ])}
      onPress={onPress}
    >
      {value ? (
        <Icon name="check" size={16} color={BaseColor.whiteColor} />
      ) : (
        <Icon
          name="square-full"
          type="font-awesome-5"
          size={16}
          color={BaseColor.primaryColor}
        />
      )}
    </TouchableOpacity>
  );
};

CheckBox.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool
};

CheckBox.defaultProps = {
  sm: false,
  md: true,
  lg: false,
  xl: false,
  value: true,
  onChange: () => {},
  style: {}
};

export default CheckBox;
