import React, {useState} from "react";
import {TouchableOpacity, Icon, TextInput, Popup, Text} from "../../index";
import {BaseColor, FontFamily} from "../../../config";
import {Calendar} from "react-native-calendars";
import moment from "moment";
import PropTypes from "prop-types";

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
export const DatePickerInput = (
  {onChangeText, format, displayFormat, calendarProps = {}, ...rest},
  ref
) => {
  const innerRef = React.useRef(null);
  const attachRef = (el) => {
    innerRef.current = el;
    if (typeof ref === "function") {
      ref(el);
    } else {
      ref = el;
    }
  };
  const [isOpen, toggleOpen] = useState(false);
  const onDayPress = (date) => {
    onChangeText(rest.moment(date.dateString, "YYYY-MM-DD").format(format));
    toggleOpen(false);
  };
  return (
    <>
      <TextInput
        editable={false}
        {...rest}
        value={rest.displayValue}
        ref={attachRef}
        renderRight={({props}) => {
          return (
            <TouchableOpacity center middle onPress={() => toggleOpen(true)}>
              <Icon name="calendar" size={22} color={BaseColor.accentColor} />
            </TouchableOpacity>
          );
        }}
      />
      <Popup
        isVisible={isOpen}
        onCloseModal={() => toggleOpen(false)}
        titleProps={{center: true, middle: true}}>
        <Calendar
          style={{borderRadius: 8}}
          monthFormat={"MMMM YYYY"}
          renderHeader={(date) => (
            <Text>
              {rest
                .moment((date.getMonth()+1)+"-"+date.getFullYear(), "MM-YYYY")
                .format("MMMM YYYY")}
              {/* {rest.value} */}
            </Text>
          )}
          theme={theme}
          onDayPress={onDayPress}
          markedDates={{
            [rest.moment(rest.value, format).format("YYYY-MM-DD")]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange"
            }
          }}
          {...calendarProps}
        />
      </Popup>
    </>
  );
};

// DatePickerInput.propTypes = {
//   calendarProps: PropTypes.object,
//   moment: PropTypes.any.isRequired,
//   format: PropTypes.string.isRequired,
//   displayformat: PropTypes.string.isRequired,
//   displayValue: PropTypes.string
// };
// DatePickerInput.defaultProps = {
//   calendarProps: {},
//   moment: moment,
//   format: "YYYY-MM-DD",
//   displayformat: "YYYY-MM-DD",
//   displayValue: ""
// };
export default DatePickerInput;
