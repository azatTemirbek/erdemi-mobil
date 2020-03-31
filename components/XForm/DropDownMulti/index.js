import React, { Component, Children, cloneElement } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon, MapArray } from "../../";
import styles from "./styles";
import Modal from "react-native-modal";
import { BaseColor } from "../../../config";
const { height } = Dimensions.get("screen");

export class DropDownMulti extends Component {
  /** add selected to the ordered list */
  orderedList = [];
  oldOrderedList = [];

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      items: this._getSelected(props.items, props.selectedItems),
      selectedItems: props.selectedItems
    };
    props.selectedItems.map(this._setOrderedList);
  }
  /** returns items with checked field  */
  _getSelected = (items, selectedItems) => {
    return items.map(item => {
      return {
        ...item,
        checked: !!selectedItems.filter(element => item.value === element.value)
          .length
      };
    });
  };
  /** a function manages order of the selection */
  _setOrderedList = selectedItem => {
    /** not in the list */
    if (this.orderedList.find(it => it.value === selectedItem.value)) {
      /** remove and get new array */
      this.orderedList = this.orderedList.filter(item => {
        return item.value !== selectedItem.value;
      });
    } else {
      /** add item to list */
      this.orderedList.push(selectedItem);
    }
  };
  /**
   * a function used to select the item and toggle
   * @param {Array} items state of selection
   * @param {Object} selectedItem object to be toggled
   */
  _toggleSelected = (items, selectedItem) => {
    this._setOrderedList(selectedItem);
    return items.map(item => {
      return {
        ...item,
        checked:
          item.value === selectedItem.value ? !item.checked : item.checked
      };
    });
  };
  /** remove the pill while modal closed */
  _onPillRemove = selectedItem => () => {
    let { items } = this.state;
    let { onRemoveItem, onSelectionsChange } = this.props;
    let it = this._toggleSelected(items, selectedItem);
    this.setState({ items: it });
    /** get checked and flag removed */
    onSelectionsChange(
      this._getChecked(it).map(this._removeCheckedFlag),
      this.orderedList
    );
    onRemoveItem(selectedItem);
  };
  /** a function used to ope the modal */
  _openModal = () => {
    const { items } = this.state;
    this.items = items;
    this.oldOrderedList = [...this.orderedList];
    this.setState({ modalVisible: true });
  };
  /** checks weather item is checked returns boolean */
  _isItemChecked = (items = [], selectedItem = {}) =>
    !!items
      .map(item => ({ ...item }))
      .filter(obj => obj.checked && obj.value === selectedItem.value).length;
  /**
   * a function to select
   * @param {Array} selectedItems array of selected objects
   */
  _onSelect = selectedItem => () => {
    const { items } = this.state;
    const { maxSelectionCount, onSelectionItemChange } = this.props;
    if (
      this._getSelectedCount(items) >= maxSelectionCount &&
      !this._isItemChecked(items, selectedItem)
    ) {
      return;
    }
    let it = this._toggleSelected(items, selectedItem);
    this.setState({ items: it });
    onSelectionItemChange(
      this._removeCheckedFlag({ ...selectedItem }),
      this.orderedList.map(this._removeCheckedFlag)
    );
  };
  /** return selected count */
  _getSelectedCount = (items = this.state.items) =>
    items.map(a => ({ ...a })).filter(a => a.checked).length;
  /**
   * a function filters arrays checked chick is added at the beginning of the component
   * @param {Object} element iteration element
   * @param {Number} index index inside array
   * @param {Array} readOnlyArray original Array read Only
   */
  _removeCheckedFlag = element => {
    let obj = { ...element };
    delete obj.checked;
    return obj;
  };
  /** will return only checked items */
  _getChecked = (items = this.state.items) => {
    return items.map(object => ({ ...object })).filter(item => item.checked);
  };
  /** a function to trigger the selection onSelectionsChange */
  _onApply = () => {
    const { onSelectionsChange } = this.props;
    let selectedAndTransformed = this._getChecked(this.state.items).map(
      this._removeCheckedFlag
    );
    this.setState(
      {
        modalVisible: false,
        selectedItems: selectedAndTransformed
      },
      () => {
        onSelectionsChange(selectedAndTransformed, this.orderedList);
      }
    );
  };
  /** a function used to preserve changes if cancelled */
  _onCancel = () => {
    this.setState({
      modalVisible: false,
      items: this.items
    });
    this.orderedList = [...this.oldOrderedList];
    this.props.onSelectionsChange(
      this.items,
      this.oldOrderedList.map(this._removeCheckedFlag)
    );
  };
  /** renders Modal */
  renderModal = () => {
    const { modalVisible, items } = this.state;
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
            <MapArray array={items}>
              {({ key, object, ...rest }, index) => (
                <TouchableOpacity
                  style={[
                    styles.ModalContentAction,
                    this.props.modalContentActionStyle
                  ]}
                  key={object.value + key + index}
                  onPress={this._onSelect(object)}
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
            {this.props.translate("apply")}
          </Button>
        </View>
      </Modal>
    );
  };
  /** renders right side of the listItem */
  renderer = (object = {}, keyVal = "") => {
    let component = this.props[keyVal];
    let key = JSON.stringify(object);
    return typeof component === "function"
      ? component({ key, object })
      : Children.map(component, child => cloneElement(child, { key, object }));
  };
  /** renders label at the top */
  renderLabel = (...inlineStyles) => {
    const { label } = this.props;
    if (!label) {
      return null;
    }
    return <Text style={inlineStyles}>{label}</Text>;
  };
  /** renders error label at the bottom */
  renderError = (...inlineStyles) => {
    const { error } = this.props;
    if (!error) {
      return null;
    }
    return <Text style={inlineStyles}>{error}</Text>;
  };
  /** render dropdown icon and handle opening modal */
  renderDropDownIcon = () => {
    return (
      <TouchableOpacity
        style={[styles.renderDropDownIcon, this.props.renderDropDownIconStyle]}
        onPress={this._openModal}
      >
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
    );
  };
  /** renders list of checked pills */
  renderPills = () => {
    let { items } = this.state;
    const filtered = this.state.modalVisible
      ? this.oldOrderedList || []
      : this.orderedList.length
      ? this.orderedList
      : items;
    return (
      <>
        <MapArray array={filtered}>
          {({ key, object, ...rest }, index) => {
            return (
              <View
                style={[styles.pillContainer, this.props.pillContainerStyle]}
                key={object.value + key + index}
              >
                {this.renderer(object, "renderPill")}
                <TouchableOpacity
                  style={[
                    styles.renderPillIconContainer,
                    this.props.renderPillIconStyle
                  ]}
                  onPress={this._onPillRemove(object)}
                >
                  {this.renderer(object, "renderPillIcon")}
                </TouchableOpacity>
              </View>
            );
          }}
        </MapArray>
      </>
    );
  };
  render() {
    const { style, labelStyle, placeholder, error, errorStyle } = this.props;
    const { items } = this.state;
    const filtered = items.filter(item => item.checked);
    let selected = filtered.length && filtered[0].label;
    const Tag = !selected ? Text : View;
    return (
      <>
        {this.renderLabel(styles.labelStyle, labelStyle)}
        {this.renderModal()}
        <View
          style={[styles.mainContainer, error && { borderColor: "red" }, style]}
        >
          <Tag
            style={[
              styles.renderPills,
              !selected
                ? { color: BaseColor.grayColor, padding: 10, margin: 4 }
                : {},
              this.props.renderPillsStyle
            ]}
          >
            {!selected ? placeholder : this.renderPills()}
          </Tag>
          {this.renderDropDownIcon()}
        </View>
        {this.renderError(styles.errorStyle, errorStyle)}
      </>
    );
  }
}

DropDownMulti.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderPillIconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalContentContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  contentSwipeDownStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  lineSwipeDownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  scrollListStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalContentActionStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  renderDropDownIconStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  pillContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderPillsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  icon: PropTypes.node,
  placeholder: PropTypes.string,

  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  onSelectionsChange: PropTypes.func,
  onRemoveItem: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  renderPill: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  renderPillIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  checkedIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  maxSelectionCount: PropTypes.number,
  onSelectionItemChange: PropTypes.func,
  translate: PropTypes.func
};

DropDownMulti.defaultProps = {
  style: {},
  renderPillIconStyle: {},
  modalStyle: {},
  modalContentContainerStyle: {},
  contentSwipeDownStyle: {},
  lineSwipeDownStyle: {},
  modalLabelStyle: {},
  scrollListStyle: {},
  modalContentActionStyle: {},
  renderDropDownIconStyle: {},
  pillContainerStyle: {},
  renderPillsStyle: {},
  loading: false,
  icon: (
    <Icon name="chevron-down" size={12} color={BaseColor.textPrimaryColor} />
  ),
  renderItem: ({ object }) => (
    <Text body2 semibold primaryColor={object.checked}>
      {object.label}
    </Text>
  ),
  renderPill: ({ object }) => (
    <Text body2 semibold primaryColor>
      {object.label}
    </Text>
  ),
  renderPillIcon: (
    <Icon
      name="ios-close-circle-outline"
      type="ionicon"
      size={20}
      color={BaseColor.primaryColor}
    />
  ),
  checkedIcon: <Icon name="check" size={14} color={BaseColor.primaryColor} />,
  placeholder: "placeholder",
  label: "Label",
  labelStyle: {},
  items: [],
  selectedItems: [],
  maxSelectionCount: Infinity,
  onSelectionsChange: (selectedItems, orderedItems) =>
    console.warn("onSelectionsChange"),
  onRemoveItem: (item, items) => console.warn("onRemoveItem"),
  onSelectionItemChange: (selectedItem, orderedItems) =>
    console.warn("onSelectionItemChange"),
  translate: key => key
};
export default DropDownMulti;
