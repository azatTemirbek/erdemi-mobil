export const withDateFormatFormElement = (props) => ({
  onChangeText: (date) => {
    props.onChangeText(props.moment(date, props.format).format(props.format));
  },
  value: !props.value
    ? ""
    : props.moment(props.value, props.format).format(props.format),
  displayValue: !props.value
    ? ""
    : props.moment(props.value, props.format).format(props.displayFormat)
});

export default withDateFormatFormElement;
