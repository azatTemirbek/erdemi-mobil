import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Icon, Text, Button } from "@components";
import PropTypes from "prop-types";
import { BaseColor } from "@config";
import Modal from "react-native-modal";
import translate from "@lang";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: props.filterOption,
      filterSelected: props.filterSelected,
      modalVisible: false
    };
  }

  componentDidMount() {
    const { filterOption, filterSelected } = this.state;
    this.setState({
      filterOption: filterOption.map(item => {
        return {
          ...item,
          checked: item.value === filterSelected.value
        };
      })
    });
  }

  onSelectFilter(selected) {
    const { filterOption } = this.state;
    this.setState({
      filterOption: filterOption.map(item => {
        return {
          ...item,
          checked: item.value === selected.value
        };
      })
    });
  }

  onOpenFilter() {
    const { filterOption, filterSelected } = this.state;
    this.setState({
      modalVisible: true,
      filterOption: filterOption.map(item => {
        return {
          ...item,
          checked: item.value === filterSelected.value
        };
      })
    });
  }

  onApply() {
    const { filterOption } = this.state;
    const { onChangeFilter } = this.props;
    const filtered = filterOption.filter(item => item.checked);
    if (filtered.length > 0) {
      this.setState({
        filterSelected: filtered[0],
        modalVisible: false
      });
      onChangeFilter(filtered[0]);
    }
  }

  render() {
    const { style } = this.props;
    const { filterOption, modalVisible } = this.state;
    return (
      <View style={[styles.contain, style]}>
        <Modal
          isVisible={modalVisible}
          onSwipeComplete={() => {
            this.setState({
              modalVisible: false,
              filterOption: this.props.filterOption
            });
          }}
          swipeDirection={["down"]}
          style={styles.bottomModal}
        >
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            {filterOption.map((item, index) => (
              <TouchableOpacity
                style={styles.contentActionModalBottom}
                key={item.value}
                onPress={() => this.onSelectFilter(item)}
              >
                <Text body2 semibold primaryColor={item.checked}>
                  {item.text}
                </Text>
                {item.checked && (
                  <Icon name="check" size={14} color={BaseColor.primaryColor} />
                )}
              </TouchableOpacity>
            ))}
            <Button
              full
              style={{ marginTop: 10, marginBottom: 20 }}
              onPress={() => this.onApply()}
            >
              {translate("apply")}
            </Button>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.onOpenFilter()}
          style={styles.contentFilter}
        >
          <Icon name="filter" size={16} color={BaseColor.primaryColor} solid />
          <Text headline primaryColor style={{ marginLeft: 5 }}>
            {translate("filter")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Filter.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  filterOption: PropTypes.array,
  filterSelected: PropTypes.object,
  modeView: PropTypes.string,
  labelCustom: PropTypes.string,
  onChangeFilter: PropTypes.func,
  onChangeView: PropTypes.func
};

Filter.defaultProps = {
  style: {},
  filterOption: [
    {
      value: "low_price",
      icon: "sort-amount-up",
      text: "Lowest Price"
    },
    {
      value: "hight_price",
      icon: "sort-amount-down",
      text: "Hightest Price"
    },
    {
      value: "high_rate",
      icon: "sort-amount-up",
      text: "Hightest Rating"
    },
    {
      value: "popular",
      icon: "sort-amount-down",
      text: "Popularity"
    }
  ],
  filterSelected: {
    value: "high_rate",
    icon: "sort-amount-up",
    text: "Hightest Rating"
  },
  modeView: "",
  labelCustom: "",
  onChangeFilter: () => {},
  onChangeView: () => {}
};
