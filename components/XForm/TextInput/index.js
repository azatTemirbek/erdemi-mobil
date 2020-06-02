import React, {Component, cloneElement, Children} from "react";
import {InteractionManager, TextInput as Input} from "react-native";
import PropTypes from "prop-types";
import {BaseColor} from "../../../config";
import {Icon, Block, TouchableOpacity, Label, ErrorLabel} from "../..";
import styles from "./styles";

export class TextInput extends Component {
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
      ? component({key, props})
      : Children.map(component, (child) => cloneElement(child, {key, props}));
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
      renderCenter,
      renderCenterStyle,
      error,
      errorStyle,
      required,
      shadow,
      ...rest
    } = this.props;
    return (
      <>
        <Label {...{labelStyle, label, required}} />
        <Block
          p1
          row
          flex={false}
          smallCard
          shadow={shadow}
          style={[styles.container, error && {borderColor: "red"}, style]}>
          {!!renderLeft && (
            <Block
              flex={150}
              center
              col
              style={[renderLeftStyle, {justifySelf: "flex-start"}]}>
              {this.renderer("renderLeft")}
            </Block>
          )}
          <Block flex={900} style={renderCenterStyle}>
            {renderCenter ? (
              this.renderer("renderCenter")
            ) : (
              <Input
                ref={(ref) => {
                  this.input = ref;
                }}
                {...rest}
                style={[
                  styles.baseInput,
                  // {backgroundColor:"green"},
                  inputStyle
                ]}
              />
            )}
          </Block>
          {!!renderRight && (
            <Block
              flex={150}
              style={[renderRightStyle, {justifySelf: "flex-end"}]}>
              {this.renderer("renderRight")}
            </Block>
          )}
        </Block>
        <ErrorLabel {...{errorStyle, error}} />
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
  ]),
  renderCenter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  renderCenterStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  translate: PropTypes.func,
  required: PropTypes.bool
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
  renderCenter: false,
  renderCenterStyle: {},
  renderRight: ({props}) => {
    return (
      <TouchableOpacity center middle onPress={() => props.focusInput()}>
        <Icon name="edit" size={22} color={BaseColor.accentColor} />
      </TouchableOpacity>
    );
  },
  translate: (key) => key,
  required: false
  // renderLeft: ({ props }) => {
  //   return (
  //     <TouchableOpacity onPress={() => props.focusInput()}>
  //       <Icon name="edit" size={22} color={BaseColor.navyBlue} />
  //     </TouchableOpacity>
  //   );
};

export default TextInput;
