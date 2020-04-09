import React, {useCallback, memo} from "react";
import {BaseColor} from "../../config";
import {Icon, TouchableOpacity} from "../";
import PropTypes from "prop-types";
import styles from "./styles";
/** Check box optimized */
export const CheckBox = memo(({onChange, value, style, size, ...rest}) => {
  const onPress = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);
  return (
    <TouchableOpacity
      flex={false}
      center
      middle
      p2
      shadow={5}
      {...rest}
      style={[
        styles.container,
        value && {backgroundColor: BaseColor.primaryColor},
        size && {height: size, maxHeight: size, maxWidth: size, width: size},
        style && style
      ]}
      onPress={onPress}>
      {value ? (
        <Icon
          name="check"
          size={Math.floor(size * 0.6)}
          color={BaseColor.whiteColor}
        />
      ) : (
        <Icon
          name="square-full"
          type="font-awesome-5"
          size={Math.floor(size * 0.6)}
          color={BaseColor.primaryColor}
        />
      )}
    </TouchableOpacity>
  );
});

CheckBox.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  m2: PropTypes.bool,
  size: PropTypes.number
};

CheckBox.defaultProps = {
  m2: true,
  value: true,
  onChange: () => {},
  style: {},
  size: 30
};

export default CheckBox;
