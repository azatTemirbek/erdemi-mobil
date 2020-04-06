import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Icon, Text, Button, Popup, CheckboxFilter } from "../";
import PropTypes from "prop-types";
import { BaseColor } from "../../config";
import Modal from "react-native-modal";

export class FilterSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: props.sortOption,
      sortSelected: props.sortSelected,
      modalVisible: false,
      isVisible: false
    };
  }

  componentDidMount() {
    const { sortOption, sortSelected } = this.state;
    this.setState({
      sortOption: sortOption.map(item => {
        return {
          ...item,
          checked: item.value === sortSelected.value
        };
      })
    });
  }

  onSelectFilter(selected) {
    const { sortOption } = this.state;
    this.setState({
      sortOption: sortOption.map(item => {
        return {
          ...item,
          checked: item.value === selected.value
        };
      })
    });
  }

  onOpenSort() {
    const { sortOption, sortSelected } = this.state;
    this.setState({
      modalVisible: true,
      sortOption: sortOption.map(item => {
        return {
          ...item,
          checked: item.value === sortSelected.value
        };
      })
    });
  }

  onApply() {
    const { sortOption } = this.state;
    const { onChangeSort } = this.props;
    const sorted = sortOption.filter(item => item.checked);
    if (sorted.length > 0) {
      this.setState({
        sortSelected: sorted[0],
        modalVisible: false
      });
      onChangeSort(sorted[0]);
    }
  }

  render() {
    const { style, onFilter, filters } = this.props;
    const { sortOption, modalVisible, sortSelected } = this.state;
    return (
      <View style={[styles.contain, style]}>
        <Modal
          isVisible={modalVisible}
          onSwipeComplete={() => {
            this.setState({
              modalVisible: false,
              sortOption: this.props.sortOption
            });
          }}
          swipeDirection={["down"]}
          style={styles.bottomModal}
        >
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            {sortOption.map((item, index) => (
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
              {this.props.translate("apply")}
            </Button>
          </View>
        </Modal>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => this.onOpenSort()}
        >
          <Icon
            name={sortSelected.icon}
            size={16}
            color={BaseColor.primaryColor}
            solid
          />
          <Text headline primaryColor style={{ marginLeft: 5 }}>
            {this.props.translate("sort")}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => this.setState({ isVisible: true })} style={styles.contentFilter}>
            <Icon
              name="filter"
              size={16}
              color={BaseColor.primaryColor}
              solid
            />
            <Text headline primaryColor style={{ marginLeft: 5 }}>
              {this.props.translate("filter")}
            </Text>
          </TouchableOpacity>
        </View>
        {/* render the popup */}
        <Popup
          isVisible={this.state.isVisible}
          containerStyle={styles.containerStyle}
          contentStyle={styles.contentStyle}
          bottom={false}
          disableCloseBtn={true}
        >
          <CheckboxFilter
            onClosePress={() => this.setState({ isVisible: false })}
            translate={translate}
            filters={filters}
            onFilterApply={(questions)=>{ onFilter(questions) }}
          />
        </Popup>
      </View>
    );
  }
}

FilterSort.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  sortOption: PropTypes.array,
  sortSelected: PropTypes.object,
  modeView: PropTypes.string,
  labelCustom: PropTypes.string,
  onChangeSort: PropTypes.func,
  onChangeView: PropTypes.func,
  onFilter: PropTypes.func,
  translate: PropTypes.func
};

FilterSort.defaultProps = {
  style: {},
  sortOption: [
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
  sortSelected: {
    value: "high_rate",
    icon: "sort-amount-up",
    text: "Hightest Rating"
  },
  modeView: "",
  labelCustom: "",
  onChangeSort: () => {},
  onChangeView: () => {},
  onFilter: () => {},
  translate: key => key
};

export default FilterSort;
