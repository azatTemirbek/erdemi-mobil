import React, { useCallback, memo } from "react";
import { TouchableOpacity } from "react-native";
import { BaseColor } from "../../config";
import { Icon } from "../";
import PropTypes from "prop-types";
import styles from "./styles";
import { withMarginPaddings, compose } from "erdemir-mobil/hocs";
/** Check box optimized */
export const CheckBox = memo(compose(withMarginPaddings)(({ onChange, value, style }) => {
  const onPress = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        value && { backgroundColor:  BaseColor.primaryColor },
        style && style
      ]}
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
}));

CheckBox.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  sm: PropTypes.bool,
  m2: PropTypes.bool,
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
