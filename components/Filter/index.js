import React, {Component} from "react";
import {View, TouchableOpacity} from "react-native";
import styles from "./styles";
import {Icon, Text, Button} from "../";
import PropTypes from "prop-types";
import {BaseColor} from "../../config";
import Modal from "react-native-modal";

const transForm = (options, value) =>
  options.map((item) => ({
    ...item,
    checked: item.value === value
  }));
export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: transForm(props.filterOption, props.filterSelected),
      // filterOption:  props.filterOption,
      filterSelected: props.filterSelected,
      modalVisible: false
    };
  }

  // componentDidMount() {
  //   const {filterOption, filterSelected} = this.state;
  //   this.setState({
  //     filterOption: filterOption.map((item) => {
  //       return {
  //         ...item,
  //         checked: item.value === filterSelected.value
  //       };
  //     })
  //   });
  // }

  static getDerivedStateFromProps(props, state) {
    if (
      (props.filterSelected !== "" &&
        state.filterSelected !== props.filterSelected) ||
      JSON.stringify(
        state.filterOption.map((item) => {
          let i = {...item};
          delete i.checked;
          return i;
        })
      ) !== JSON.stringify(props.filterOption.map((i) => ({...i})))
    ) {
      return {
        filterOption: props.filterOption.map((item) => ({
          ...item,
          checked: item.value === state.filterSelected.value
        })),
        filterSelected: props.filterSelected
      };
    }
    return null;
  }

  onSelectFilter(selected) {
    const {filterOption} = this.state;
    this.setState({
      filterOption: filterOption.map((item) => {
        return {
          ...item,
          checked: item.value === selected.value
        };
      })
    });
  }

  onOpenFilter() {
    const {filterOption, filterSelected} = this.state;
    this.setState({
      modalVisible: true,
      filterOption: filterOption.map((item) => {
        return {
          ...item,
          checked: item.value === filterSelected.value
        };
      })
    });
  }

  onApply() {
    const {filterOption} = this.state;
    const {onChangeFilter} = this.props;
    const filtered = filterOption.filter((item) => item.checked);
    if (filtered.length > 0) {
      this.setState({
        filterSelected: filtered[0],
        modalVisible: false
      });
      onChangeFilter(filtered[0]);
    }
  }

  render() {
    const {style} = this.props;
    const {filterOption, modalVisible} = this.state;
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
          onBackdropPress={() => {
            this.setState({
              modalVisible: false,
              filterOption: this.props.filterOption
            });
          }}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
              filterOption: this.props.filterOption
            });
          }}
          swipeDirection={["down"]}
          style={styles.bottomModal}>
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            {filterOption.map((item, index) => (
              <TouchableOpacity
                style={styles.contentActionModalBottom}
                key={item.value}
                onPress={() => this.onSelectFilter(item)}>
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
              style={{marginTop: 10, marginBottom: 20}}
              onPress={() => this.onApply()}>
              {this.props.translate("apply")}
            </Button>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.onOpenFilter()}
          style={styles.contentFilter}>
          <Icon name="filter" size={16} color={BaseColor.primaryColor} solid />
          <Text headline primaryColor style={{marginLeft: 5}}>
            {this.props.translate("filter")}
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
  onChangeView: PropTypes.func,
  translate: PropTypes.func
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
  onChangeView: () => {},
  translate: (key) => key
};

export default Filter;
