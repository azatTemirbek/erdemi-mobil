import React, {Component} from "react";
import {BaseColor} from "../../config";
import {Icon, TouchableOpacity} from "../";
import PropTypes from "prop-types";

export class XForm extends Component {
  elements = [];
  triggers4ComboRemotes= {};
  constructor(props) {
    super(props);
    this.state = {values: {}, options: {}, errors: {}, isVisible: false};
  }
  /** used to log */
  log = (a) => {
    console.log("PropsLogger", a);
    return a;
  };
  /**will add onParentChange hook and will trigger the function when _onComboChange is activated */
  _initTriggers = (childKey, parentKey, onParentChange, ctx) => {
    /** if the there is no anything - initiate*/
    if (ctx.triggers4ComboRemotes[parentKey] === undefined) {
      ctx.triggers4ComboRemotes[parentKey] = [{childKey, onParentChange}];
    } else if (
      /** if not contains in array - push */
      Array.isArray(ctx.triggers4ComboRemotes[parentKey]) &&
      ctx.triggers4ComboRemotes[parentKey].filter(
        (item) => item.childKey === childKey
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
  _onChangeText = (inputName) => (value) => {
    let {values, errors} = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    this.setState({values, errors});
  };
  /** on image change */
  _onImageChange = (inputName) => (value) => {
    let {values, errors} = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    this.setState({values, errors});
  };
  /** used on selection change */
  _onComboChange = (inputName) => (value, selected) => {
    let {values, options, errors} = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    let triggers = this.triggers4ComboRemotes;
    /** used for relation stuff */
    if (triggers[inputName]) {
      triggers[inputName].map((trigger) => {
        /** if array set the array */
        if (Array.isArray(trigger.onParentChange)) {
          options[trigger.childKey] = trigger.onParentChange;
          /** if function execute the function */
        } else if (typeof trigger.onParentChange === "function") {
          let result = trigger.onParentChange(value, trigger.childKey, values);
          /** if executed is a promise then give callback*/
          if (result.then && typeof result.then === "function") {
            result.then((data) => {
              /** if callback result is array set the data */
              options[trigger.childKey] = Array.isArray(data) ? data : [];
              this.setState({options});
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
        this.setState({options});
      });
    }
    this.setState({values, errors});
  };
  /** adds item to track list */
  _initRequiredAndTrackList = (ctx = this, required = false) => {
    if (!ctx.elements.some((el) => el.key === key)) {
      ctx.elements.push({
        key,
        required
      });
    }
  };
  /** core method */
  bindCore = (key, ctx = this, extra = {required: false}) => {
    this._initRequiredAndTrackList(ctx, extra.required);
    return {
      value: ctx.state.values[key],
      error: ctx.state.errors[key],
      label: ctx.props.translate(key),
      translate: ctx.props.translate,
      name: key,
      ...extra
    };
  };
  /** RadioGroup with normal keyboard */
  bindRadioGroup = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindCore(key, undefined, extra),
    onChange: ctx._onComboChange(key)
  });
  /** binds the input to state */
  bindDropDown = (key, ctx = this, extra={
    parentKey = null,
    onParentChange = null,
    required = false
  }) => {
    if (parentKey && onParentChange) {
      ctx._initTriggers(key, parentKey, onParentChange, ctx);
    }
    return {
      ...ctx.bindCore(key, undefined, extra),
      options: ctx.state.options[key] || [], //will be empty or will get from state
      onChange: ctx._onComboChange(key)
    };
  };
  /** TextInput with normal keyboard */
  bindTextInput = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindCore(key, undefined, extra),
    onChangeText: ctx._onChangeText(key)
  });
  /** TextInput with normal keyboard */
  bindTextArea = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindTextInput(key,undefined,extra),
    multiline: true,
    numberOfLines: 3
  });
  /** binds textInput with state and number keypad*/
  bindTextInputNumber = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindTextInput(key,undefined,extra),
    keyboardType: "number-pad"
    /** need to add number validators */
  });
  /** binds text input with QRCode reader and sets value to state */
  bindTextInputQR = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindTextInputNumber(key, undefined,extra),
    renderRight: ({props}) => {
      /** this callback is invoked at qr screen */
      let callback = (e) => {
        if (!e) {
          return;
        }
        /** will change the state */
        ctx._onChangeText(props.name)(e.data);
      };
      return (
        <TouchableOpacity
          center
          middle
          onPress={() => ctx.props.navigation.navigate("QRCode", {callback})}>
          <Icon name="qrcode" size={22} color={BaseColor.accentColor} />
        </TouchableOpacity>
      );
    }
  });
  /** bindCalendarInput to XForm */
  bindCalendarInput = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindCore(key, undefined, extra),
    onChangeText: ctx._onChangeText(key)
  });
  /** binds text input with Barcode reader and sets value to state */
  bindTextInputBarcode = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindTextInput(key,undefined,extra),
    renderRight: ({props}) => {
      /** this callback is invoked at qr screen */
      let callback = (e) => {
        if (!e) {
          return;
        }
        /** will change the state */
        ctx._onChangeText(props.name)(e.data);
      };
      return (
        <TouchableOpacity
          center
          middle
          onPress={() => ctx.props.navigation.navigate("QRCode", {callback})}>
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
  bindImageInput = (key, ctx = this, extra={required=false}) => ({
    ...ctx.bindCore(key, undefined, extra),
    onImageChange: ctx._onImageChange(key)
  });
  _hasError = (errors = this.state.errors) =>
    Object.entries(errors).some(([key, val]) => !!key && !!val);
  /** check weather all required fields have value inside state */
  _allRequiredFieldsHasValue = (
    values = this.state.values,
    elements = this.elements
  ) =>
    elements
      .filter(({required}) => required)
      .some(({key, required}) => required && !!values[key]);
  /** is Form valid if there is no error and no empty required fields */
  isValid = () => !this._hasError() && this._allRequiredFieldsHasValue();
  /** will return true if touched */
  isTouched = (key) => this.state.values.hasOwnProperty(key);

  render() {
    console.error("implement render method for dynamic imput generator");
    return null;
  }
}

XForm.propTypes = {
  translate: PropTypes.func.isRequired
};

XForm.defaultProps = {
  translate: (key) => key
};

export default XForm;
