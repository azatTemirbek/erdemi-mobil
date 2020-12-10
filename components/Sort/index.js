import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import {Icon, Text, Button} from "../../components";
import {BaseColor} from "../../config";
import {compose, withProps} from "../../hocs";
import {useSelection} from "../../hooks";
import {last, is} from "ramda";
import styles from "./styles";

export const Sort = compose(
  withProps(({options}) => {
    const result = useSelection(options, ["value"]);
    return result;
  })
)(
  ({
    selectedlist,
    isAllSelected,
    toggleAllSelection,
    toggleSelection,
    isSelected,
    setSelected,
    getCompare,
    CompareKeys,
    options,
    value,
    translate,
    onChange,
    uygulaTxt
  }) => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      setSelected([is(Object, value) ? value : {value}]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (
      <>
        <Modal
          isVisible={modalVisible}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={["down"]}
          style={styles.bottomModal}>
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            {options.map((item, index) => (
              <TouchableOpacity
                style={styles.contentActionModalBottom}
                key={item.value}
                onPress={() => {
                  setSelected([item]);
                }}>
                <Text body2 semibold primaryColor={isSelected(item)}>
                  <Icon
                    name={item.icon}
                    size={16}
                    color={BaseColor.grayColor}
                    solid
                    style={{marginRight: 5}}
                  />
                  {" " + translate(item.text)}
                </Text>
                {isSelected(item) && (
                  <Icon name="check" size={14} color={BaseColor.primaryColor} />
                )}
              </TouchableOpacity>
            ))}
            <Button
              full
              style={{
                marginTop: 10,
                marginBottom: 20
              }}
              onPress={() => {
                onChange(getCompare(last(selectedlist)));
                setModalVisible(false);
              }}>
              {translate(uygulaTxt)}
            </Button>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={() => setModalVisible(true)}>
          <Text headline primaryColor style={{marginLeft: 5}}>
            Sort
          </Text>
        </TouchableOpacity>
      </>
    );
  }
);

Sort.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  transalate: PropTypes.func,
  uygulaTxt: PropTypes.string
};

Sort.defaultProps = {
  style: {},
  options: [
    {
      value: "newDatesFirst",
      icon: "sort-amount-down",
      text: "Önce yeni ilanlar"
    },
    {
      value: "newDatesLast",
      icon: "sort-amount-up",
      text: "Önce eski ilanlar"
    },
    {
      value: "kmLessFirst",
      icon: "sort-amount-down",
      text: "Önce Km`si düşük"
    },
    {
      value: "kmLessLast",
      icon: "sort-amount-up",
      text: "Önce Km`si yüksek)"
    },
    {
      value: "priceLowFirst",
      icon: "sort-amount-down",
      text: "Önce fiyatı düşük"
    },
    {
      value: "priceLowLast",
      icon: "sort-amount-up",
      text: "Önce fiyatı yüksek"
    },
    {
      value: "oldModelFirst",
      icon: "sort-amount-down",
      text: "Önce Model yılı düşük"
    },
    {
      value: "oldModelLast",
      icon: "sort-amount-up",
      text: "Önce Model yılı yüksek"
    }
  ],
  value: "oldModelLast",
  onChange: () => {},
  translate: (key) => key,
  uygulaTxt: "uygula"
};

export default Sort;
