import React, {Component} from "react";
import {BaseColor, FontFamily} from "../../../config";
import PropTypes from "prop-types";
import {Text, Icon, TextInput, TouchableOpacity, Block, Popup} from "../../";
import {Calendar} from "react-native-calendars";
/** calendar theme */
const theme = {
  textSectionTitleColor: BaseColor.textPrimaryColor,
  selectedDayBackgroundColor: BaseColor.primaryColor,
  selectedDayTextColor: "#ffffff",
  todayTextColor: BaseColor.primaryColor,
  dayTextColor: BaseColor.textPrimaryColor,
  textDisabledColor: BaseColor.grayColor,
  dotColor: BaseColor.primaryColor,
  selectedDotColor: "#ffffff",
  arrowColor: BaseColor.primaryColor,
  monthTextColor: BaseColor.textPrimaryColor,
  textDayFontFamily: FontFamily.default,
  textMonthFontFamily: FontFamily.default,
  textDayHeaderFontFamily: FontFamily.default,
  textDayFontSize: 14,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 14
};
export class DatePickerInput extends Component {
  selected = "";
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }
  openModal = () => {
    this.old = this.props.value;
    this.setState({
      modalVisible: true
    });
  };
  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };
  _applyPress = () => {
    this.closeModal();
  };
  renderRight = ({props}) => {
    return (
      <TouchableOpacity center middle onPress={this.openModal}>
        <Icon name="calendar" size={22} color={BaseColor.accentColor} />
      </TouchableOpacity>
    );
  };
  onCancel = () => {
    this.selected = this.old;
    this.props.onChangeText(this.old);
    this.closeModal();
  };
  onDayPress = (day) => {
    this.selected = day.dateString;
    this.props.onChangeText(this.selected);
  };
  /** renders right side of the listItem */
  render() {
    const {...rest} = this.props;
    const {modalVisible} = this.state;
    this.selected =
      !rest.value || rest.value === this.selected ? this.selected : rest.value;
    return (
      <>
        <TextInput editable={false} {...rest} renderRight={this.renderRight} />
        <Popup
          isVisible={modalVisible}
          headerContainerStyle={{display: "none"}}
          onCloseModal={this.onCancel}
          {...this.props.modalProps}>
          <Block card flex={false}>
            <Calendar
              style={{borderRadius: 8}}
              monthFormat={"dd-MM-yyyy"}
              theme={theme}
              onDayPress={this.onDayPress}
              markedDates={{
                [this.selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange"
                }
              }}
              {...this.props.calendarProps}
            />
            <Block flex={false} row space="between" padding={15}>
              <TouchableOpacity flex={false} onPress={this.onCancel}>
                <Text body2>{this.props.translate(this.props.denyText)}</Text>
              </TouchableOpacity>
              <TouchableOpacity flex={false} onPress={this._applyPress}>
                <Text body2 primaryColor>
                  {this.props.translate(this.props.confirmText)}
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Popup>
      </>
    );
  }
}

DatePickerInput.propTypes = {
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
  calendarProps: PropTypes.object,
  modalProps: PropTypes.object
};

DatePickerInput.defaultProps = {
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
  calendarProps: {},
  modalProps: {},
  denyText: "vazgec",
  confirmText: "tamam",
  translate: (key) => key
};

export default DatePickerInput;
