import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { BaseColor } from "../../config";
import { Icon } from "../";
import PropTypes from "prop-types";

export class XForm extends Component {
  constructor(props) {
    super(props);
    this.state = { values: {}, options: {}, errors: {}, isVisible: false };
    this.triggers4ComboRemotes = {};
  }
  /** used to log */
  log = a => {
    console.log("PropsLogger", a);
    return a;
  };
  /**will add onParentChange hook and will trigger the function when _onComboChange is activated */
  _initTriggers = (childKey, parentKey, onParentChange, ctx) => {
    /** if the there is no anything - initiate*/
    if (ctx.triggers4ComboRemotes[parentKey] === undefined) {
      ctx.triggers4ComboRemotes[parentKey] = [{ childKey, onParentChange }];
    } else if (
      /** if not contains in array - push */
      Array.isArray(ctx.triggers4ComboRemotes[parentKey]) &&
      ctx.triggers4ComboRemotes[parentKey].filter(
        item => item.childKey === childKey
      ).length === 0
    ) {
      ctx.triggers4ComboRemotes[parentKey].push({
        childKey,
        onParentChange
      });
    }
    /** else case is useless since we will not do anything */
  };
  /** used on selection change */
  _onChangeText = inputName => value => {
    let { values, errors } = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    this.setState({ values, errors });
  };
  /** on image change */
  _onImageChange = inputName => value => {
    let { values, errors } = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    this.setState({ values, errors });
  };
  /** used on selection change */
  _onComboChange = inputName => (value, selected) => {
    let { values, options, errors } = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    let triggers = this.triggers4ComboRemotes;
    /** used for relation stuff */
    if (triggers[inputName]) {
      triggers[inputName].map(trigger => {
        /** if array set the array */
        if (Array.isArray(trigger.onParentChange)) {
          options[trigger.childKey] = trigger.onParentChange;
          /** if function execute the function */
        } else if (typeof trigger.onParentChange === "function") {
          let result = trigger.onParentChange(value, trigger.childKey, values);
          /** if executed is a promise then give callback*/
          if (result.then && typeof result.then === "function") {
            result.then(data => {
              /** if callback result is array set the data */
              options[trigger.childKey] = Array.isArray(data) ? data : [];
              this.setState({ options });
              return data;
            });
          } else if (Array.isArray(result)) {
            /** if executed is array than set the options */
            options[trigger.childKey] = result;
          } else {
            console.error("onParentChange result is", result);
          }
        } else {
          console.error(
            "onParentChange is not valid type",
            trigger.onParentChange
          );
        }
        this.setState({ options });
      });
    }
    this.setState({ values, errors });
  };
  /** core method */
  bindCore = (key, ctx = this) => ({
    value: ctx.state.values[key],
    error: ctx.state.errors[key],
    label: ctx.props.translate(key),
    translate: ctx.props.translate,
    name: key
  });
  /** RadioGroup with normal keyboard */
  bindRadioGroup = (key, ctx = this) => ({
    ...ctx.bindCore(key),
    onChange: ctx._onComboChange(key)
  });
  /** binds the input to state */
  bindDropDown = (key, parentKey = null, onParentChange = null, ctx = this) => {
    if (parentKey && onParentChange) {
      ctx._initTriggers(key, parentKey, onParentChange, ctx);
    }
    return {
      ...ctx.bindCore(key),
      options: ctx.state.options[key] || [], //will be empty or will get from state
      onChange: ctx._onComboChange(key)
    };
  };
  /** TextInput with normal keyboard */
  bindTextInput = (key, ctx = this) => ({
    ...ctx.bindCore(key),
    onChangeText: ctx._onChangeText(key)
  });
  /** TextInput with normal keyboard */
  bindTextArea = (key, ctx = this) => ({
    ...ctx.bindTextInput(key),
    multiline: true,
    numberOfLines: 3
  });
  /** binds textInput with state and number keypad*/
  bindTextInputNumber = (key, ctx = this) => ({
    ...ctx.bindTextInput(key),
    keyboardType: "number-pad"
    /** need to add number validators */
  });
  /** binds text input with QRCode reader and sets value to state */
  bindTextInputQR = (key, ctx = this) => ({
    ...ctx.bindTextInputNumber(key),
    renderRight: ({ props }) => {
      /** this callback is invoked at qr screen */
      let callback = e => {
        if (!e) {
          return;
        }
        /** will change the state */
        ctx._onChangeText(props.name)(e.data);
      };
      return (
        <TouchableOpacity
          onPress={() => ctx.props.navigation.navigate("QRCode", { callback })}
        >
          <Icon name="qrcode" size={22} color={BaseColor.accentColor} />
        </TouchableOpacity>
      );
    }
  });
  /** bindCalendarInput to XForm */
  bindCalendarInput = (key, ctx = this) => ({
    ...ctx.bindCore(key),
    onChangeText: ctx._onChangeText(key)
  });
  /** binds text input with Barcode reader and sets value to state */
  bindTextInputBarcode = (key, ctx = this) => ({
    ...ctx.bindTextInput(key),
    renderRight: ({ props }) => {
      /** this callback is invoked at qr screen */
      let callback = e => {
        if (!e) {
          return;
        }
        /** will change the state */
        ctx._onChangeText(props.name)(e.data);
      };
      return (
        <TouchableOpacity
          onPress={() => ctx.props.navigation.navigate("QRCode", { callback })}
        >
          <Icon
            name="barcode-scan"
            type="material-community"
            size={22}
            color={BaseColor.accentColor}
          />
        </TouchableOpacity>
      );
    }
  });
  /** image props handler */
  bindImageInput = (key, ctx = this) => ({
    ...ctx.bindCore(key),
    onImageChange: ctx._onImageChange(key)
  });

  /** is Form valid */
  isValid = () => {
    let { errors } = this.state;
    let result = true;
    Object.entries(errors).map(([key, val]) => {
      if (!!key && !!val) {
        result = false;
      }
    });
    return result;
  };
  /** will return true if touched */
  isTouched = key => {
    return this.state.values.hasOwnProperty(key);
  };

  render() {
    console.error("implement render method for dynamic imput generator");
    return null;
  }
}

XForm.propTypes = {
  translate: PropTypes.func
};

XForm.defaultProps = {
  translate: key => key
};

export default XForm;
