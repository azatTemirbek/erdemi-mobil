import React, {Component} from "react";
import {BaseColor, FontFamily} from "../../../config";
import PropTypes from "prop-types";
import {Text, Icon, TextInput, TouchableOpacity, Block} from "../../";
import Modal from "react-native-modal";
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
  textMonthFontWeight: "bold",
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
  onCancel = (day) => {
    this.selected = this.old;
    this.props.onChangeText(this.old);
    this.closeModal();
    // this.forceUpdate();
  };
  onDayPress = (day) => {
    this.selected = day.dateString;
    this.props.onChangeText(this.selected);
    // this.forceUpdate();
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
        <Modal
          isVisible={modalVisible}
          onRequestClose={this.onCancel}
          backdropColor="rgba(0, 0, 0, 0.5)"
          backdropOpacity={1}
          animationIn="fadeIn"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          {...this.props.modalProps}>
          <Block card center middle flex={false}>
            <Block whiteColor card flex={false} style={{width: "100%"}}>
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
                  <Text body1>{this.props.translate(this.props.denyText)}</Text>
                </TouchableOpacity>
                <TouchableOpacity flex={false} onPress={this._applyPress}>
                  <Text body1 primaryColor>
                    {this.props.translate(this.props.confirmText)}
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Modal>
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
  denyText: "Vazgeç",
  translate: (key) => key,
  confirmText: "Tamam"
};

export default DatePickerInput;
