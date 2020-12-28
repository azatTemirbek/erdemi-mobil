import React, {cloneElement, Children} from "react";
import {InteractionManager, TextInput as Input} from "react-native";
import PropTypes from "prop-types";
import {BaseColor} from "../../../config";
import {Icon, Block, TouchableOpacity, Label, ErrorLabel} from "../..";
import styles from "./styles";
import {withHideFormElement, compose} from "../../../hocs";
const TextInputComp = React.forwardRef((props, ref) => {
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
  } = props;
  const innerRef = React.useRef(null);
  const attachRef = (el) => {
    innerRef.current = el;
    if (typeof ref === "function") {
      ref(el);
    } else {
      ref = el;
    }
  };
  const _focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      innerRef.current.focus();
    });
  };
  const defaultProps = {
    focusInput: _focusInputWithKeyboard,
    parentRef: innerRef,
    name: props.name,
    disabled: rest.disabled
  };
  const renderer = (keyVal = "", rProps = defaultProps) => {
    let component = props[keyVal];
    let key = component.toString();
    return typeof component === "function"
      ? component({key, props: rProps})
      : Children.map(component, (child) =>
          cloneElement(child, {key, props: rProps})
        );
  };

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
            {renderer("renderLeft", defaultProps)}
          </Block>
        )}
        <Block flex={900} style={renderCenterStyle}>
          {renderCenter ? (
            renderer("renderCenter", defaultProps)
          ) : (
            <Input
              ref={attachRef}
              {...rest}
              editable={rest.disabled ? false : rest.editable}
              style={[
                styles.baseInput,
                inputStyle,
                rest.disabled && styles.disabledInput
              ]}
            />
          )}
        </Block>
        {!!renderRight && (
          <Block
            flex={150}
            style={[
              renderRightStyle,
              {justifySelf: "flex-end"},
              rest.disabled && styles.disabledInput
            ]}>
            {renderer("renderRight", defaultProps)}
          </Block>
        )}
      </Block>
      <ErrorLabel {...{errorStyle, error}} />
    </>
  );
});
export const TextInput = compose(withHideFormElement)(TextInputComp);

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
      <TouchableOpacity
        center
        disabled={props.disabled}
        middle
        onPress={() => props.focusInput()}>
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
