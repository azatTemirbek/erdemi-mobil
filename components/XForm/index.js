import React, {Component} from "react";
import {BaseColor} from "../../config";
import {Icon, TouchableOpacity} from "../";
import PropTypes from "prop-types";
export class XForm extends Component {
  elements = [];
  triggers4ComboRemotes = {};
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
  _initTriggers = (childKey, parentKey, onParentChange) => {
    /** if the there is no anything - initiate*/
    if (!!this.triggers4ComboRemotes[parentKey]) {
      this.triggers4ComboRemotes[parentKey] = [{childKey, onParentChange}];
    } else if (
      /** if not contains in array - push */
      Array.isArray(this.triggers4ComboRemotes[parentKey]) &&
      this.triggers4ComboRemotes[parentKey].filter(
        (item) => item.childKey === childKey
      ).length === 0
    ) {
      this.triggers4ComboRemotes[parentKey].push({
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
  _onImageChange = this._onChangeText;
  /** used on selection change */
  _onComboChange = (inputName) => (value) => {
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
  _initRequiredAndTrackList = (key,required = false) => {
    if (!this.elements.some((el) => el.key === key)) {
      this.elements.push({
        key,
        required
      });
    }
  };
  /** core method */
  bindCore = (key, extra = {required: false}) => {
    this._initRequiredAndTrackList(key,extra.required);
    return {
      value: this.state.values[key],
      error: this.state.errors[key],
      label: this.props.translate(key),
      translate: this.props.translate,
      name: key,
      ...extra
    };
  };
  /** RadioGroup with normal keyboard */
  bindRadioGroup = (key, extra = {required: false}) => ({
    ...this.bindCore(key, extra),
    onChange: this._onComboChange(key)
  });
  /** binds the input to state */
  bindDropDown = (
    key,
    extra = {
      parentKey: null,
      onParentChange: null,
      required: false
    }
  ) => {
    if (extra.parentKey && extra.onParentChange) {
      this._initTriggers(key, extra.parentKey, extra.onParentChange);
    }
    return {
      ...this.bindCore(key, extra),
      options: this.state.options[key] || [], //will be empty or will get from state
      onChange: this._onComboChange(key)
    };
  };
  /** TextInput with normal keyboard */
  bindTextInput = (key, extra = {required: false}) => ({
    ...this.bindCore(key, extra),
    onChangeText: this._onChangeText(key)
  });
  /** TextInput with normal keyboard */
  bindTextArea = (key, extra = {required: false}) => ({
    ...this.bindTextInput(key, extra),
    multiline: true,
    numberOfLines: 3
  });
  /** binds textInput with state and number keypad*/
  bindTextInputNumber = (key, extra = {required: false}) => ({
    ...this.bindTextInput(key, extra),
    keyboardType: "number-pad"
    /** need to add number validators */
  });
  /** binds text input with QRCode reader and sets value to state */
  bindTextInputQR = (key, extra = {required: false}) => ({
    ...this.bindTextInputNumber(key, extra),
    renderRight: ({props}) => {
      /** this callback is invoked at qr screen */
      let callback = (e) => {
        if (!e) {
          return;
        }
        /** will change the state */
        this._onChangeText(props.name)(e.data);
      };
      return (
        <TouchableOpacity
          center
          middle
          onPress={() => this.props.navigation.navigate("QRCode", {callback})}>
          <Icon name="qrcode" size={22} color={BaseColor.accentColor} />
        </TouchableOpacity>
      );
    }
  });
  /** bindCalendarInput to XForm */
  bindCalendarInput = (key, extra = {required: false}) => ({
    ...this.bindCore(key, extra),
    onChangeText: this._onChangeText(key)
  });
  /** binds text input with Barcode reader and sets value to state */
  bindTextInputBarcode = (key, extra = {required: false}) => ({
    ...this.bindTextInput(key, extra),
    renderRight: ({props}) => {
      /** this callback is invoked at qr screen */
      let callback = (e) => {
        if (!e) {
          return;
        }
        /** will change the state */
        this._onChangeText(props.name)(e.data);
      };
      return (
        <TouchableOpacity
          center
          middle
          onPress={() => this.props.navigation.navigate("QRCode", {callback})}>
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
  bindImageInput = (key, extra = {required: false}) => ({
    ...this.bindCore(key, extra),
    onImageChange: this._onImageChange(key)
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
  /** default _handleSubmit version */
  _handleSubmit=()=>{
    console.warning("implement function _handleSubmit")
  }
  /** validates the form and trigers callback */
  _handleSubmitAndValidate=(key="_handleSubmit")=>(e)=>{
    let {values,errors} =this.state;
    // this.validate() && 
    this[key](e,values,errors);
  }
  /** bind button to submit */
  bindOnSubmitButton = (key="_handleSubmit")=>{
    return {
      disabled:!this.isValid(),
      onPress:this._handleSubmitAndValidate(key)
    }
  }
}

XForm.propTypes = {
  translate: PropTypes.func.isRequired
};

XForm.defaultProps = {
  translate: (key) => key
};

export default XForm;
