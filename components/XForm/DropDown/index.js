import React, { Component, Children, cloneElement } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { Block, MapArray, Text, Button, Icon, TextInput, TouchableOpacity } from "../../";
import styles from "./styles";
import Modal from "react-native-modal";
import { BaseColor } from "../../../config";
const { height } = Dimensions.get("screen");

const transForm = (options, value) =>
  options.map(item => ({
    ...item,
    checked: item.value === value
  }));

export class DropDown extends Component {
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
    const { modalContentActionStyle, translate, btnLabel } = this.props;
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
          <Block
            pt4
            center
            flex={false}
            style={this.props.contentSwipeDownStyle}
          >
            <View
              style={[styles.lineSwipeDown, this.props.lineSwipeDownStyle]}
            />
            {this.renderLabel(
              styles.modalLabelStyle,
              this.props.modalLabelStyle
            )}
          </Block>
          <ScrollView
            style={[{ height: height * 0.6 }, this.props.scrollListStyle]}
            showsHorizontalScrollIndicator={false}
          >
            <MapArray
              array={options}
              fallback={({ object }) => {
                return object.length === 0 ? (
                  <Text center>{translate("empty")}</Text>
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
                  style={[styles.ModalContentAction, modalContentActionStyle]}
                  row
                  px4
                  mb2
                  pb2
                  space="between"
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
            {translate(btnLabel)}
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
      onChange,
      onTextChange,
      loading,
      icon,
      renderRightTouch,
      ...rest
    } = this.props;
    // delete rest.value;
    const { options, value } = this.state;
    const filtered = options.filter(item => item.value === value);
    let selected = filtered.length && filtered[0].text+"";
    return (
      <>
        <TextInput
          editable={false}
          {...rest}
          renderRight={
            <TouchableOpacity
              p4
              flex={1}
              middle
              center
              onPress={() => this._openModal()}
              {...renderRightTouch}
            >
              {loading ? (
                <ActivityIndicator
                  animating={loading}
                  size="small"
                  color={BaseColor.primaryColor}
                />
              ) : (
                this.renderer({}, "icon")
              )}
            </TouchableOpacity>
          }
          value={selected}
          onTextChange={() => {}}
        />
        {this.renderModal()}
      </>
    );
  }
}

DropDown.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  icon: PropTypes.node,
  placeholder: PropTypes.string,

  error: PropTypes.string,
  errorStyle: PropTypes.object,

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
  labelStyle: {},
  renderLeftStyle: {},
  inputStyle: {},
  renderRightStyle: {},
  error: "",
  errorStyle: {},
  label: "Label",
  renderLeft: false,
  renderCenter: false,
  renderCenterStyle: {},
  icon: <Icon name="chevron-down" size={22} color={BaseColor.accentColor} />,
  value: "",
  btnLabel: "Uygula",
  options: [],

  onCancel: () => {},
  onChange: () => {},
  loading: false,
  renderItem: ({ object }) => (
    <Text headline semibold primaryColor={object.checked}>
      {object.text}
    </Text>
  ),
  checkedIcon: <Icon name="check" size={22} color={BaseColor.primaryColor} />,
  required: false,
  translate: key => key,
  renderRightTouch: {}
};

export default DropDown;
