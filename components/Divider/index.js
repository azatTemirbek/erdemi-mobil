import React from "react";
import {BaseColor} from "../../config";
import PropTypes from "prop-types";
import {Block} from "../";
import styles from "./styles";

export const Divider = ({
  color = BaseColor.dividerColor,
  style,
  children,
  rightStyle,
  leftStyle,
  ...props
}) => {
  return (
    <Block margin={[15, 0]} center flex={false} row {...props}>
      <Block
        center
        margin={[0, 10, 0, 0]}
        color={color}
        style={[styles.divider, style, leftStyle]}
      />
      {children}
      <Block
        center
        margin={[0, 0, 0, 10]}
        color={color}
        style={[styles.divider, style, rightStyle]}
      />
    </Block>
  );
};

Divider.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Divider.defaultProps = {
  style: {}
};

export default Divider;
