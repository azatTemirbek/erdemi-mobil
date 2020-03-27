import React, { Component, Children, cloneElement } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { Block, MapArray, Text, Button, Icon } from "../../";
import styles from "./styles";
import Modal from "react-native-modal";
import { BaseColor } from "../../../config";
const { height } = Dimensions.get("screen");

const transForm = (options, value) =>
  options.map(item => ({
    ...item,
    checked: item.value === value
  }));

export default class DropDown extends Component {
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
      modalVisible: false,
      options: transForm(props.options, props.value),
      value: props.value
    };
  }

  // componentDidMount() {
  //   const { options, value } = this.state;
  //   this.setState({
  //     options: options.map(item => {
  //       return {
  //         ...item,
  //         checked: item.value === value
  //       };
  //     })
  //   });
  // }
  /** old version is under comment */
  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (
  //     JSON.stringify(this.props.options) !== JSON.stringify(prevProps.options)
  //   ) {
  //     const { value } = this.state;
  //     this.setState({
  //       options: this.props.options.map(item => {
  //         return {
  //           ...item,
  //           checked: item.value === value
  //         };
  //       })
  //     });
  //   }
  // }

  _openModal() {
    const { options, value } = this.state;
    this.setState({
      modalVisible: true,
      options: transForm(this.state.options, value)
    });
  }

  _onSelect = select => {
    this.setState({
      options: transForm(this.state.options, select.value)
    });
  };

  _onApply = () => {
    const { options } = this.state;
    const { onChange } = this.props;
    const selected = options.filter(item => item.checked);
    if (selected.length > 0) {
      onChange(selected[0].value, selected[0]);
      this.setState({
        value: selected[0].value,
        modalVisible: false
      });
    }
  };

  _onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      modalVisible: false
      // options: this.props.options
    });
    onCancel();
  };
  /** renders label at the top */
  renderLabel = (...inlineStyles) => {
    const { label } = this.props;
    if (!label) {
      return null;
    }
    return <Text style={inlineStyles}>{label}</Text>;
  };
  /** renders Modal */
  renderModal = () => {
    const { modalVisible, options } = this.state;
    return (
      <Modal
        isVisible={modalVisible}
        onBackdropPress={this._onCancel}
        onSwipeComplete={this._onCancel}
        swipeDirection={["down"]}
        style={[styles.Modal, this.props.modalStyle]}
        propagateSwipe
      >
        <View
          style={[
            styles.modalContentContainer,
            this.props.modalContentContainerStyle
          ]}
        >
          <View
            style={[styles.contentSwipeDown, this.props.contentSwipeDownStyle]}
          >
            <View
              style={[styles.lineSwipeDown, this.props.lineSwipeDownStyle]}
            />
            {this.renderLabel(
              styles.modalLabelStyle,
              this.props.modalLabelStyle
            )}
          </View>
          <ScrollView
            style={[{ height: height * 0.6 }, this.props.scrollListStyle]}
            showsHorizontalScrollIndicator={false}
          >
            <MapArray
              array={options}
              fallback={({ object }) => {
                return object.length === 0 ? (
                  <Text>Empty</Text>
                ) : (
                  <ActivityIndicator
                    size="small"
                    color={BaseColor.accentColor}
                  />
                );
              }}
            >
              {({ key, object, ...rest }, index) => (
                <TouchableOpacity
                  style={[
                    styles.ModalContentAction,
                    this.props.modalContentActionStyle
                  ]}
                  key={object.value + key + index}
                  onPress={() => this._onSelect(object)}
                >
                  {this.renderer(object, "renderItem")}
                  {object.checked && this.renderer(object, "checkedIcon")}
                </TouchableOpacity>
              )}
            </MapArray>
          </ScrollView>
          <Button
            full
            style={{ marginTop: 10, marginBottom: 20 }}
            onPress={this._onApply}
          >
            {this.props.translate(this.props.btnLabel)}
          </Button>
        </View>
      </Modal>
    );
  };

  renderer = (object = {}, keyVal = "") => {
    let component = this.props[keyVal];
    let key = JSON.stringify(object);
    return typeof component === "function"
      ? component({ key, object })
      : Children.map(component, child => cloneElement(child, { key, object }));
  };

  render() {
    const {
      style,
      label,
      placeholder,
      error,
      contentStyle,
      errorStyle,
      required
    } = this.props;
    const { options, value } = this.state;
    const filtered = options.filter(item => item.value === value);
    let selected = filtered.length && filtered[0].text;
    return (
      <View style={style}>
        <Block flex={false} row>
          {!!label && (
            <Text style={[styles.labelStyle, this.props.labelStyle]}>
              {label}
              {required && <Text primaryColor>*</Text>}
            </Text>
          )}
        </Block>
        {this.renderModal()}
        <TouchableOpacity
          style={[
            styles.contentForm,
            error && { borderColor: "red" },
            contentStyle
          ]}
          onPress={() => this._openModal()}
        >
          <Text
            style={[
              styles.textDefault,
              this.props.valueStyle,
              !selected ? { color: BaseColor.grayColor } : {}
            ]}
            {...this.props.valueProps}
          >
            {!selected ? placeholder : selected}
          </Text>
          {this.props.loading ? (
            <ActivityIndicator
              animating={this.props.loading}
              size="small"
              color={BaseColor.primaryColor}
            />
          ) : (
            this.props.icon
          )}
        </TouchableOpacity>
        {!!error && (
          <Text
            style={[
              styles.errorStyle,
              errorStyle,
              { color: "red", padding: 5 }
            ]}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
}

DropDown.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  icon: PropTypes.node,
  placeholder: PropTypes.string,

  error: PropTypes.string,
  contentStyle: PropTypes.object,
  errorStyle: PropTypes.object,

  valueStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProps: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,

  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
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
  btnLabel: PropTypes.string,
  required: PropTypes.bool,
  translate: PropTypes.func
};

DropDown.defaultProps = {
  style: {},
  icon: (
    <Icon name="chevron-down" size={12} color={BaseColor.textPrimaryColor} />
  ),
  placeholder: "",
  valueStyle: {},
  error: "",
  contentStyle: {},
  errorStyle: {},
  valueProps: {},
  value: "",
  label: "Label",
  btnLabel: "Uygula",
  labelStyle: {},
  options: [],
  onCancel: () => {},
  onChange: () => {},
  loading: false,
  renderItem: ({ object }) => (
    <Text body2 semibold primaryColor={object.checked}>
      {object.text}
    </Text>
  ),
  checkedIcon: <Icon name="check" size={14} color={BaseColor.primaryColor} />,
  required: false,
  translate: key => key
};
