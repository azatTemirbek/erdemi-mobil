import React, {Children, cloneElement, useState, useCallback} from "react";
import {ActivityIndicator, ScrollView, Dimensions} from "react-native";
import PropTypes from "prop-types";
import {
  Block,
  MapArray,
  Text,
  Icon,
  TextInput,
  TouchableOpacity,
  Popup
} from "../../";
import styles from "./styles";
import {BaseColor} from "../../../config";
import {take} from "ramda";

const {height} = Dimensions.get("screen");
/** used to serch inside array */
const setSort = (item, searchedText) =>
  item.text.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
const renderer = (object = {}, keyVal = "", props) => {
  let component = props[keyVal];
  let key = JSON.stringify(object);
  return typeof component === "function"
    ? component({key, object})
    : Children.map(component, (child) => cloneElement(child, {key, object}));
};
export const DropDown = ({
  onChange,
  options,
  onCancel,
  onTextChange,
  loading,
  renderRightTouch,
  value,
  search,
  modalStyle,
  modalContentContainerStyle,
  contentSwipeDownStyle,
  modalLabelStyle,
  scrollListStyle,
  modalContentActionStyle,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const onChangeText = useCallback((tx) => setSearchedText(tx), []);
  const _onSelect = useCallback(
    (select) => {
      setSearchedText("");
      setModalVisible(false);
      onChange(select.value, select);
    },
    [onChange]
  );
  const _onCancel = useCallback(() => {
    setSearchedText("");
    setModalVisible(false);
    onCancel();
  }, [onCancel]);
  const _openModal = useCallback(() => {
    !loading && setModalVisible(true);
  }, [loading]);
  const getFilteredOptions = useCallback(
    () =>
      take(
        20,
        searchedText !== ""
          ? options.filter((item) => setSort(item, searchedText))
          : []
      ),
    [options, searchedText]
  );

  const isSearchible = () => options.length > 50 || search;

  const filtered = options.filter((item) => item.value === value);
  let selected = (filtered.length && filtered[0].text) || "";

  return (
    <>
      <TextInput
        editable={false}
        {...props}
        renderRight={
          <TouchableOpacity
            p4
            flex={1}
            middle
            center
            onPress={_openModal}
            {...renderRightTouch}>
            {loading ? (
              <ActivityIndicator
                animating={loading}
                size="small"
                color={BaseColor.primaryColor}
              />
            ) : (
              renderer({}, "icon", props)
            )}
          </TouchableOpacity>
        }
        value={`${selected}`}
        onTextChange={() => {}}
      />
      <Popup
        isVisible={modalVisible}
        onCloseModal={_onCancel}
        bottom={false}
        disableCloseBtn={true}
        containerStyle={{paddingBottom: 0}}
        withScroll={false}
        contentStyle={{
          width: "100%",
          minHeight: height * 0.7,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15
        }}
        headerContainerStyle={{display: "none"}}
        style={[styles.Modal, modalStyle]}>
        <Block
          top
          left
          style={[styles.modalContentContainer, modalContentContainerStyle]}>
          <Block pt2 center flex={false} style={contentSwipeDownStyle}>
            {props.label && (
              <Text style={[styles.modalLabelStyle, modalLabelStyle]}>
                {props.label}
              </Text>
            )}
          </Block>
          <Block row flex={false}>
            <Block row pt4>
              <TextInput
                hidden={!isSearchible()}
                value={searchedText}
                autoFocus
                style={{height: 47}}
                onChangeText={onChangeText}
                label=""
              />
            </Block>
          </Block>
          <ScrollView
            style={scrollListStyle}
            horizontal={false}
            showsHorizontalScrollIndicator={true}>
            <MapArray
              array={isSearchible() ? getFilteredOptions() : options}
              fallback={() =>
                options.length === 0 && (
                  <Text center>{props.translate("empty")}</Text>
                )
              }>
              {({key, object, ...rest}, index) => (
                <TouchableOpacity
                  style={[styles.ModalContentAction, modalContentActionStyle]}
                  row
                  px4
                  mx4
                  pb2
                  space="between"
                  key={object.value + key + index}
                  onPress={() => _onSelect(object)}>
                  {renderer(object, "renderItem", props)}
                  {object.value === value &&
                    renderer(object, "checkedIcon", props)}
                </TouchableOpacity>
              )}
            </MapArray>
          </ScrollView>
        </Block>
      </Popup>
    </>
  );
};

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
  required: PropTypes.bool,
  translate: PropTypes.func,
  search: PropTypes.bool
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
  options: [],
  onCancel: () => {},
  onChange: () => {},
  loading: false,
  renderItem: ({object}) => (
    <Text headline semibold primaryColor={object.checked}>
      {object.text}
    </Text>
  ),
  checkedIcon: <Icon name="check" size={22} color={BaseColor.primaryColor} />,
  required: false,
  translate: (key) => key,
  renderRightTouch: {},
  search: false
};

export default DropDown;
