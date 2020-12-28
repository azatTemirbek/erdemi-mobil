import React, {Component, Children, cloneElement} from "react";
import PropTypes from "prop-types";
import {
  Text,
  Block,
  MapArray,
  ErrorLabel,
  Label,
  TouchableOpacity
} from "../../";
import styles from "./styles";
import {withHideFormElement, compose} from "../../../hocs";
/**
 * transform array with checked
 * @param {Object[]} options
 * @param {String} value
 */
const transForm = (options, value) =>
  options.map((item) => ({
    ...item,
    checked: item.value === value
  }));
/**
 * renders Icon checked or unchecked
 * @param {Object} param0
 */
export const Radio = ({checked}) => {
  if (!checked) {
    return <Block style={styles.unchecked} margin={[0, 5]} flex={false} />;
  }
  return (
    <Block style={styles.checked} margin={[0, 5]} flex={false}>
      <Block flex={false} style={styles.checkedContent} />
    </Block>
  );
};

class RadioGroupComp extends Component {
  _onSelect = (select) => {
    !select.inactive && this.props.onChange(select.value, select);
  };
  /** renders Content */
  renderContent = () => {
    const {options, value} = this.props;
    let {ItemsConatiner, ItemContainer} = this.props;
    return (
      <Block row wrap style={ItemsConatiner}>
        <MapArray array={transForm(options, value)}>
          {({key, object, ...rest}, index) => (
            <TouchableOpacity
              card
              flex={false}
              disabled={this.props.disabled || object.inactive}
              style={[
                styles.ItemContainer,
                !this.props.reverseLabel && {
                  justifyContent: "flex-start"
                },
                ItemContainer
              ]}
              key={object.value + key + index}
              onPress={() => this._onSelect(object)}>
              {this.props.reverseLabel && this.renderer(object, "renderItem")}
              {object.checked
                ? this.renderer(object, "checkedIcon")
                : this.renderer(object, "unCheckedIcon")}
              {!this.props.reverseLabel && this.renderer(object, "renderItem")}
            </TouchableOpacity>
          )}
        </MapArray>
      </Block>
    );
  };

  renderer = (object = {}, keyVal = "") => {
    let component = this.props[keyVal];
    let key = JSON.stringify(object);
    return typeof component === "function"
      ? component({key, ...object})
      : Children.map(component, (child) =>
          cloneElement(child, {key, ...object})
        );
  };

  render() {
    const {style, error, errorStyle, labelStyle, required, label} = this.props;
    return (
      <Block style={style}>
        <Label {...{labelStyle, required, label}} />
        {this.renderContent()}
        <ErrorLabel {...{errorStyle, error}} />
      </Block>
    );
  }
}
RadioGroupComp.propTypes = {
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
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      inactive: PropTypes.bool
    })
  ),
  reverseLabel: PropTypes.bool,
  translate: PropTypes.func
};
RadioGroupComp.defaultProps = {
  style: {},
  error: "",
  errorStyle: {},
  value: "isdemir1",
  label: "Label",
  labelStyle: {},
  options: [
    {
      value: "inactive",
      text: "inactive",
      inactive: false
    },
    {
      value: "active",
      text: "active",
      inactive: false
    }
  ],
  onChange: () => {},
  renderItem: ({text}) => (
    <Text body2 semibold>
      {text}
    </Text>
  ),
  checkedIcon: <Radio />,
  unCheckedIcon: <Radio />,
  reverseLabel: false,
  translate: (key) => key
};
export const RadioGroup = compose(withHideFormElement)(RadioGroupComp);
export default RadioGroup;
