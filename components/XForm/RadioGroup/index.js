import React, { Component, Children, cloneElement } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text, Block, MapArray, ErrorLabel, Label } from "../../";
import styles from "./styles";
/**
 * transform array with checked
 * @param {Object[]} options
 * @param {String} value
 */
const transForm = (options, value) =>
  options.map(item => ({
    ...item,
    checked: item.value === value
  }));
/**
 * renders Icon checked or unchecked
 * @param {Object} param0
 */
export const Radio = ({ checked }) => {
  if (!checked) {
    return <Block style={styles.unchecked} margin={[0, 5]} flex={false} />;
  }
  return (
    <Block style={styles.checked} margin={[0, 5]} flex={false}>
      <View style={styles.checkedContent} />
    </Block>
  );
};

export class RadioGroup extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      (props.value !== "" && state.value !== props.value) ||
      JSON.stringify(
        state.options.map(item => {
          let i = { ...item };
          delete i.checked;
          return i;
        })
      ) !== JSON.stringify(props.options.map(i => ({ ...i })))
    ) {
      return {
        options: props.options.map(item => ({
          ...item,
          checked: item.value === state.value
        })),
        value: props.value
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      options: transForm(props.options, props.value),
      value: props.value
    };
  }

  _onSelect = select => {
    this.props.onChange(select.value, select);
    this.setState({
      value: select.value,
      options: transForm(this.state.options, select.value)
    });
  };

  /** renders Content */
  renderContent = () => {
    const { options } = this.state;
    let { ItemsConatiner, ItemContainer } = this.props;
    return (
      <View style={[styles.ItemsConatiner, ItemsConatiner]}>
        <MapArray array={options}>
          {({ key, object, ...rest }, index) => (
            <TouchableOpacity
              style={[
                styles.ItemContainer,
                !this.props.reverseLabel && {
                  justifyContent: "flex-start"
                },
                ItemContainer
              ]}
              key={object.value + key + index}
              onPress={() => this._onSelect(object)}
            >
              {this.props.reverseLabel && this.renderer(object, "renderItem")}
              {object.checked
                ? this.renderer(object, "checkedIcon")
                : this.renderer(object, "unCheckedIcon")}
              {!this.props.reverseLabel && this.renderer(object, "renderItem")}
            </TouchableOpacity>
          )}
        </MapArray>
      </View>
    );
  };

  renderer = (object = {}, keyVal = "") => {
    let component = this.props[keyVal];
    let key = JSON.stringify(object);
    return typeof component === "function"
      ? component({ key, ...object })
      : Children.map(component, child =>
          cloneElement(child, { key, ...object })
        );
  };

  render() {
    const {
      style,
      error,
      errorStyle,
      labelStyle,
      required,
      label
    } = this.props;

    return (
      <View style={style}>
        <Label {...{ labelStyle, required, label }} />
        {this.renderContent()}
        <ErrorLabel {...{ errorStyle, error }} />
      </View>
    );
  }
}
RadioGroup.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ItemsConatiner: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ItemContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  checkedIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  unCheckedIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  reverseLabel: PropTypes.bool,
  translate: PropTypes.func
};
RadioGroup.defaultProps = {
  style: {},
  error: "",
  errorStyle: {},
  value: "isdemir1",
  label: "Label",
  labelStyle: {},
  options: [
    {
      value: "value",
      text: "text"
    }
  ],
  onChange: () => {},
  renderItem: ({ text }) => (
    <Text body2 semibold>
      {text}
    </Text>
  ),
  checkedIcon: <Radio />,
  unCheckedIcon: <Radio />,
  reverseLabel: false,
  translate: key => key
};
export default RadioGroup;
