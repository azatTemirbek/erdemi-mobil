import React from "react";
import {Text} from "../../index";
import PropTypes from "prop-types";

/** used inside form inputs */
export const Label = ({labelStyle, label, required}) =>
  label ? (
    <Text p2 style={labelStyle}>
      {label}
      {required && <Text primaryColor>*</Text>}
    </Text>
  ) : null;

Label.propTypes = {
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  required: PropTypes.bool
};

/** used inside form inputs to show error massage*/
export const ErrorLabel = ({errorStyle, error}) =>
  error ? (
    <Text p2 color="red" style={errorStyle}>
      {error}
    </Text>
  ) : null;

ErrorLabel.propTypes = {
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string
};
