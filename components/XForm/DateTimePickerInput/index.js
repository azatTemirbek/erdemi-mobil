import React, {Component} from "react";
import {BaseColor} from "../../../config";
import PropTypes from "prop-types";
import {Icon, TextInput, TouchableOpacity} from "../../";
import DatePicker from "react-native-datepicker";

export class DateTimePickerInput extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  selected = "";
  renderRight = ({props}) => {
    return (
      <TouchableOpacity center middle onPress={this.openDatePicker}>
        <Icon name="calendar" size={22} color={BaseColor.accentColor} />
      </TouchableOpacity>
    );
  };
  openDatePicker = () => {
    this.myRef.current.onPressDate();
  };
  // closeDatePicker = () => {
  //   this.myRef.current.onPressCancel();
  // };
  onDateChange = (date) => {
    this.selected = date;
    this.props.onChangeText(this.selected);
  };
  /** renders right side of the listItem */
  render() {
    const {...rest} = this.props;
    this.selected =
      !rest.value || rest.value === this.selected ? this.selected : rest.value;
    return (
      <>
        <TextInput editable={false} {...rest} renderRight={this.renderRight} />
        <DatePicker
          style={{display: "none"}}
          ref={this.myRef}
          date={this.selected}
          mode={rest.mode || "date"}
          placeholder="placeholder"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2036-06-01"
          confirmBtnText={this.props.translate(this.props.confirmText)}
          cancelBtnText={this.props.translate(this.props.denyText)}
          onDateChange={this.onDateChange}
          {...this.props.DateTimePickerInputProps}
        />
      </>
    );
  }
}

DateTimePickerInput.propTypes = {
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
  DateTimePickerInputProps: PropTypes.object
};

DateTimePickerInput.defaultProps = {
  style: {},
  labelStyle: {},
  renderLeftStyle: {},
  inputStyle: {},
  renderRightStyle: {},
  error: "",
  errorStyle: {},
  label: "Label",
  renderLeft: false,
  renderRight: false,
  DateTimePickerInputProps: {},
  denyText: "vazgec",
  confirmText: "tamam",
  translate: (key) => key
};

export default DateTimePickerInput;
