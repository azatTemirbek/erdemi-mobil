import React, {useState} from "react";
import {TouchableOpacity, Icon, TextInput, Popup} from "../../index";
import {BaseColor} from "../../../config";
import MonthPicker from "react-native-month-picker";
import moment from "moment";
import PropTypes from "prop-types";

export const MonthPickerInput = (
  {onChangeText, format, displayFormat, MonthPickerProps = {}, ...rest},
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
  const onMonthChange = (date) => {
    onChangeText(rest.moment(date));
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
        <MonthPicker
          localeLanguage={rest.getCurrentLocale() || "tr"}
          selectedDate={rest.moment(rest.value, format)}
          onMonthChange={onMonthChange}
          maxDate={rest.moment("2060", "YYYY")}
          nextIcon={
            <Icon name="caret-right" size={15} color={BaseColor.primaryColor} />
          }
          prevIcon={
            <Icon name="caret-left" size={15} color={BaseColor.primaryColor} />
          }
          selectedBackgroundColor={BaseColor.primaryColor}
          currentMonthTextStyle={{color: BaseColor.primaryColor}}
          {...MonthPickerProps}
        />
      </Popup>
    </>
  );
};

MonthPickerInput.propTypes = {
  calendarProps: PropTypes.object,
  moment: PropTypes.any.isRequired,
  format: PropTypes.string.isRequired,
  displayformat: PropTypes.string.isRequired,
  displayValue: PropTypes.string
};
MonthPickerInput.defaultProps = {
  calendarProps: {},
  moment: moment,
  format: "YYYY-MM-DD",
  displayformat: "YYYY-MM-DD",
  displayValue: ""
};
export default MonthPickerInput;
