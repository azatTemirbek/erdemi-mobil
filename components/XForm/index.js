import React, {Component} from "react";
import {BaseColor} from "../../config";
import {Icon, TouchableOpacity} from "../";
import PropTypes from "prop-types";
import ValidatorJS from "./Validators/Validator";
import ValidatorAdapter from "./Validators/ValidatorAdapter";
const initalState = {values: {}, options: {}, errors: {}, isVisible: false};
export class XForm extends Component {
  elements = {};
  defaultValues = {};
  triggers4ComboRemotes = {};
  constructor(props) {
    super(props);
    this.state = {...initalState};
    this.validator = new ValidatorAdapter(
      this,
      props.validator,
      props.translate
    );
  }
  /**will add onParentChange hook and will trigger the function when _onSelectCore is activated */
  _initTriggers = (childKey, parentKey, onParentChange) => {
    if (Array.isArray(parentKey)) {
      parentKey.map((pKey, index) => {
        this._initTriggers(
          childKey,
          pKey,
          Array.isArray(onParentChange) ? onParentChange[index] : onParentChange
        );
      });
    } else {
      /** if the there is no anything - initiate*/
      if (!this.triggers4ComboRemotes[parentKey]) {
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
    }
  };
  /** used to run triggers */
  _runTriggers = (inputName, value) => {
    let triggers = this.triggers4ComboRemotes;
    let {values, options} = this.state;
    /** used for relation stuff */
    if (triggers[inputName]) {
      triggers[inputName].map((trigger) => {
        /** if provided value is an array set the array */
        if (Array.isArray(trigger.onParentChange)) {
          options[trigger.childKey] = trigger.onParentChange;
          /** if provided value is a function execute the function */
        } else if (typeof trigger.onParentChange === "function") {
          let result = trigger.onParentChange(value, trigger.childKey, values);
          /** if executed is a promise then give callback*/
          if (result && result.then && typeof result.then === "function") {
            result.then((data) => {
              /** if callback result is array set the data */
              options[trigger.childKey] = Array.isArray(data) ? data : [];
              this.setState({options});
              return data;
            });
          } else if (result && Array.isArray(result)) {
            /** if executed is array than set the options */
            options[trigger.childKey] = result;
          } else {
            console.warn("onParentChange result is", result);
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
  };
  /**
   * mostly used with parentKey: "parentKey", onParentChange: this.resetMe
   * will reset curretn field if parent changes
   * optimized with if statement
   */
  _resetMe = (value, childKey, values) => {
    if (values[childKey] !== undefined) {
      values[childKey] = undefined;
      this.setState({
        values
      });
    }
  };
  /** used set default values */
  _setDefaultValues = (defaultValues = this.defaultValues) => {
    let {values} = this.state;
    values = {...values, ...defaultValues};
    this.setState({values});
  };
  /** used on selection change */
  _onChangeCore = (inputName) => (value) => {
    let {values, errors} = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName]; //cleaup if edited
    this._runTriggers(inputName, value);
    this.setState({values, errors});
  };
  /** used on selection change */
  _onSelectCore = (inputName) => (value) => {
    let {values, errors} = this.state;
    values[inputName] = value;
    errors[inputName] = value ? undefined : errors[inputName];
    this._runTriggers(inputName, value);
    this.setState({values, errors});
  };
  /** adds item to track list and sets default values of the component */
  _initTrackingListAndDefaultValues = (key, extra, defaultValue) => {
    if (!Object.keys(this.elements).some((objkey) => objkey === key)) {
      /** runs only once and only at start */
      this.elements[`${key}`] = extra;
      this.defaultValues = {...this.defaultValues, [key]: defaultValue};
    }
  };
  /** core method */
  bindCoreDefaults = {
    required: false,
    parentKey: undefined,
    onParentChange: undefined,
    defaultValue: ""
  };
  bindCore = (key, extra = {}) => {
    const {defaultValue, parentKey, onParentChange, ...rest} = {
      ...this.bindCoreDefaults,
      ...extra
    };
    if (parentKey && onParentChange) {
      this._initTriggers(key, parentKey, onParentChange);
    }
    /** will work only once  */
    this._initTrackingListAndDefaultValues(key, rest, defaultValue);
    return {
      value: this.state.values[key] || defaultValue || "",
      error: this.state.errors[key],
      label: this.props.translate(key),
      translate: this.props.translate,
      name: key,
      // onChangeText: this._onChangeCore(key),
      ...extra
    };
  };
  /** ####################################################################################  */
  /** ################################### RADIOGROUP INPUT ###################################  */
  /** used to dropDown change */
  _onRadioGroupChange = this._onSelectCore;
  /** RadioGroup with normal keyboard */
  bindRadioGroupDefaults = {required: false};
  bindRadioGroup = (key, {options, ...extra} = {}) => ({
    ...this.bindCore(key, {...this.bindRadioGroupDefaults, ...extra}),
    options: this.state.options[key] || options || [],
    onChange: this._onRadioGroupChange(key)
  });
  /** ####################################################################################  */
  /** ################################### DROPDOWN INPUT ###################################  */
  /** used to dropDown change */
  _onDropDownChange = this._onSelectCore;
  /** binds the input to state */
  bindDropDownDefaults = {
    required: false
  };
  bindDropDown = (key, {options, ...extra} = {}) => ({
    ...this.bindCore(key, {...this.bindDropDownDefaults, ...extra}),
    options: this.state.options[key] || options || [], //will be empty or will get from state
    onChange: this._onDropDownChange(key)
  });

  /** ####################################################################################  */
  /** ################################### TEXT INPUT ###################################  */
  /** on text change */
  _onTextChange = this._onChangeCore;
  /** TextInput with normal keyboard */
  bindTextInputDefaults = {required: false};
  bindTextInput = (key, extra) => ({
    ...this.bindCore(key, {...this.bindTextInputDefaults, ...extra}),
    onChangeText: this._onTextChange(key)
  });
  /** ####################################################################################  */
  /** ################################### TEXT AREA INPUT ###################################  */
  /** on text change */
  _onTextAreaChange = this._onChangeCore;
  /** TextInput with normal keyboard */
  bindTextAreaDefaults = {required: false};
  bindTextArea = (key, extra = {}) => ({
    ...this.bindCore(key, {...this.bindTextAreaDefaults, ...extra}),
    onChangeText: this._onTextAreaChange(key),
    multiline: true,
    numberOfLines: 3
  });
  /** ####################################################################################  */
  /** ################################### NUMBER INPUT ###################################  */
  /** used on selection change */
  _onNumberChange = this._onChangeCore;
  /** binds textInput with state and number keypad*/
  bindTextInputNumberDefaults = {required: false, type: "number"};
  bindTextInputNumber = (key, extra) => ({
    ...this.bindCore(key, {
      ...this.bindTextInputNumberDefaults,
      ...extra
    }),
    onChangeText: this._onNumberChange(key),
    keyboardType: "number-pad",
    maxLength: 10
  });
  /** ####################################################################################  */
  /** ################################### Calendar INPUT ###################################  */
  _onChangeCalendarInput = this._onChangeCore;
  /** bindCalendarInput to XForm */
  bindCalendarInputDefaults = {required: false};
  bindCalendarInput = (key, extra = {}) => ({
    ...this.bindCore(key, {...this.bindCalendarInputDefaults, ...extra}),
    onChangeText: this._onChangeCalendarInput(key)
  });
  /** ####################################################################################  */
  /** ################################### QR/BARCODE INPUT ###################################  */
  /** binds text input with QRCode reader and sets value to state */
  bindTextInputQRDefaults = {required: true};
  bindTextInputQR = (key, extra = {}) => ({
    ...this.bindTextInput(key, {
      ...this.bindTextInputQRDefaults,
      ...extra
    }),
    renderRight: ({props}) => {
      /** this callback is invoked at qr screen */
      let callback = (e) => {
        if (!e) {
          return;
        }
        /** will change the state */
        this._onTextChange(props.name)(e.data);
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
  /** binds text input with Barcode reader and sets value to state */
  bindTextInputBarcodeDefaults = {required: false};
  bindTextInputBarcode = (key, extra = {}) => ({
    ...this.bindTextInput(key, {
      ...this.bindTextInputBarcodeDefaults,
      ...extra
    }),
    renderRight: ({props}) => {
      /** this callback is invoked at qr screen */
      let callback = (e) => {
        if (!e) {
          return;
        }
        /** will change the state */
        this._onTextChange(props.name)(e.data);
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
  /** ####################################################################################  */
  /** ################################### IMAGE INPUT ###################################  */
  /** on image change */
  _onImageChange = this._onChangeCore;
  /** image props handler */
  bindImageInputDefaults = {required: false};
  bindImageInput = (key, extra = {}) => ({
    ...this.bindCore(key, {...this.bindImageInputDefaults, ...extra}),
    onImageChange: this._onImageChange(key)
  });
  /** ####################################################################################  */
  /** ################################### SUBMIT BUTTON ###################################  */
  /** default _handleSubmit version */
  _handleSubmit = () => {
    console.warning("implement function _handleSubmit on your Form component");
  };
  /** validates the form and trigers callback */
  _handleSubmitAndValidate = (key = "_handleSubmit") => (e) => {
    let {values, errors} = this.state;
    let valid = this.validator.validate();
    if (!valid) {
      /** this means no error at all */
      this.setState({errors: {}});
      this[key](e, values, errors);
    } else {
      errors = {...errors, ...valid};
      this.setState({errors});
    }
  };
  /** bind button to submit */
  bindOnSubmitButton = (key = "_handleSubmit") => {
    return {
      onPress: this._handleSubmitAndValidate(key)
    };
  };
  /** ####################################################################################  */
  /** ################################### RESET BUTTON ###################################  */
  /** will reset the form to be able to add new values */
  reset = (key = "_handleReset") =>
    this.setState({...initalState}, () => {
      this[key]();
    });
  /** default _handleSubmit version */
  _handleReset = () => {
    console.warning("implement function _handleReset on your Form component");
  };
  /** bind button to submit */
  bindOnResetButton = (key = "_handleReset") => {
    return {
      onPress: this.reset(key)
    };
  };
  /** ####################################################################################  */
  /** ################################### HELPERS ###################################  */
  /** used to log */
  log = (a) => {
    console.log("PropsLogger", a);
    return a;
  };
  /** is Form valid if there is no error and no empty required fields */
  isValid = () => console.warn("this.isValid is depricated");
  /** will return true if touched */
  isTouched = (key) => this.state.values.hasOwnProperty(key);
  render() {
    console.error("implement render method for dynamic imput generator");
    return null;
  }
  componentDidMount() {
    //TODO: need to be a custom hook(lifecycle)
    this._setDefaultValues();
  }
}

XForm.propTypes = {
  translate: PropTypes.func.isRequired
};

XForm.defaultProps = {
  translate: (key) => key,
  validator: ValidatorJS
};

export default XForm;
