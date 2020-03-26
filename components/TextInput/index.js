import React, { Component, cloneElement, Children } from "react";
import {
  TouchableOpacity,
  View,
  InteractionManager,
  TextInput as Input
} from "react-native";
import PropTypes from "prop-types";
import { BaseColor, BaseStyle } from "../../config";
import { Text, Icon } from "../";
import styles from "./styles";

export default class TextInput extends Component {
  /** renders right side of the listItem */
  renderer = (
    keyVal = "",
    props = {
      focusInput: this._focusInputWithKeyboard.bind(this),
      parentRef: this._getRef.bind(this),
      name: this.props.name
    }
  ) => {
    let component = this.props[keyVal];
    let key = JSON.stringify(props);
    return typeof component === "function"
      ? component({ key, props })
      : Children.map(component, child => cloneElement(child, { key, props }));
  };
  /**  used to get input ref */
  _getRef = (name = "input") => this[name];
  _focusInputWithKeyboard() {
    InteractionManager.runAfterInteractions(() => {
      this._getRef().focus();
    });
  }
  render() {
    const {
      style,
      inputStyle,
      label,
      labelStyle,
      renderRightStyle,
      renderLeftStyle,
      renderLeft,
      renderRight,
      error,
      errorStyle,
      ...rest
    } = this.props;

    return (
      <>
        {!!label && (
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        )}
        <View
          style={[styles.container, error && { borderColor: "red" }, style]}
        >
          {!!renderLeft && (
            <View style={[styles.renderLeftStyle, renderLeftStyle]}>
              {this.renderer("renderLeft")}
            </View>
          )}
          <Input
            ref={ref => {
              this.input = ref;
            }}
            {...rest}
            style={[
              BaseStyle.TextInput,
              styles.baseInput,
              renderRight && { width: "90%" },
              renderLeft && { width: "90%" },
              renderLeft && renderRight && { width: "80%" },
              inputStyle
            ]}
          />
          {!!renderRight && (
            <View style={[styles.renderRightStyle, renderRightStyle]}>
              {this.renderer("renderRight")}
            </View>
          )}
        </View>
        {!!error && (
          <Text style={[styles.errorStyle, errorStyle]}>{error}</Text>
        )}
      </>
    );
  }
}

TextInput.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderRightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  renderLeft: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  renderRight: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ])
};

TextInput.defaultProps = {
  style: {},
  labelStyle: {},
  renderLeftStyle: {},
  inputStyle: {},
  renderRightStyle: {},
  error: "",
  errorStyle: {},
  label: "Label",
  renderLeft: false,
  renderRight: ({ props }) => {
    return (
      <TouchableOpacity onPress={() => props.focusInput()}>
        <Icon name="edit" size={22} color={BaseColor.accentColor} />
      </TouchableOpacity>
    );
  }
  // renderLeft: ({ props }) => {
  //   return (
  //     <TouchableOpacity onPress={() => props.focusInput()}>
  //       <Icon name="edit" size={22} color={BaseColor.navyBlue} />
  //     </TouchableOpacity>
  //   );
  // }
};
