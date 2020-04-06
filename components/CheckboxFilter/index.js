import React, { Component } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor } from "../../config";
import { Header, Icon, Text, CheckBox } from "../";
import * as Utils from "../../utils";
import styles from "./styles";
import PropTypes from "prop-types";

export const Option = ({ value, label, onChange, translate }) => {
  return (
    <View style={styles.optionItem}>
      <Text body2>{translate(label)}</Text>
      <CheckBox
        onChange={val => {
          onChange(val);
        }}
        value={value}
      />
    </View>
  );
};
Option.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.any,
  onChange: PropTypes.func,
  translate: PropTypes.func
};
Option.defaultProps = {
  value: true,
  label: "label",
  onChange: val => {},
  translate: key => key
};

export class Question extends Component {
  /**
   * should return changed options
   */
  _onOptionChange = index => val => {
    let { options } = this.props;
    options[index].value = val;
    this.props.onChange(options);
  };

  render() {
    let { label, options, translate } = this.props;
    return (
      <View style={{ padding: 20 }}>
        <Text body1 primaryColor>
          {translate(label)}
        </Text>
        {(options || []).map(({ value, text }, index) => (
          <Option
            key={text + index}
            value={value}
            label={text}
            onChange={this._onOptionChange(index)}
            translate={translate}
          />
        ))}
      </View>
    );
  }
}
Question.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  translate: PropTypes.func
};
Question.defaultProps = {
  label: "",
  options: [],
  onChange: options => {},
  translate: key => key
};

export class CheckboxFilter extends Component {
  /** "[{"urunTipi":["yassi","uzun"]}]"  */
  static transform = filters =>
    filters
      .map(item => ({
        [item.title]: item.options
          .filter(op => op.value)
          .map(opt => opt.paramKey.toLowerCase())
      }))
      .filter(item => {
        // eslint-disable-next-line no-unused-vars
        let [key, val] = Object.entries(item)[0];
        return val.length;
      });

  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      questions: props.filters
    };
  }
  _onOptionChange = index => options => {
    let { questions } = this.state;
    questions[index].options = options;
    this.setState({ questions });
  };
  _onApply = () => {
    this.props.onFilterApply(this.state.questions);
    this.props.onClosePress();
  };
  render() {
    const { translate } = this.props;
    const { scrollEnabled } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          style={{ backgroundColor: "white" }}
          title={translate("filters")}
          renderLeft={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.primaryColor} />
            );
          }}
          renderRight={() => {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {translate("apply")}
              </Text>
            );
          }}
          onPressLeft={() => this.props.onClosePress()}
          onPressRight={this._onApply}
        />
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            this.setState({
              scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
            })
          }
        >
          {(this.state.questions || []).map(({ options, label }, index) => (
            <Question
              key={label + index}
              label={label}
              options={options}
              onChange={this._onOptionChange(index)}
              translate={this.props.translate}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

CheckboxFilter.propTypes = {
  filters: PropTypes.array.isRequired,
  onFilterApply: PropTypes.func,
  onClosePress: PropTypes.func,
  translate: PropTypes.func
};

CheckboxFilter.defaultProps = {
  filters: [
    {
      title: "urunTipi",
      label: "productType",
      options: [
        {
          paramKey: "yassi",
          value: false,
          text: "flat"
        },
        {
          paramKey: "uzun",
          value: false,
          text: "long"
        },
        {
          paramKey: "yanUrun",
          value: false,
          text: "spinOff"
        }
      ]
    },
    {
      title: "tasimaTipi",
      label: "transportType",
      options: [
        {
          paramKey: "Karayolu",
          value: false,
          text: "highway"
        },
        {
          paramKey: "Demiryolu",
          value: false,
          text: "railway"
        },
        {
          paramKey: "Denizyolu",
          value: false,
          text: "seaway"
        },
        {
          paramKey: "Havayolu",
          value: false,
          text: "airway"
        }
      ]
    },
    {
      title: "teslimYeri",
      label: "deliveryLocation",
      options: [
        {
          paramKey: "erdemir",
          value: false,
          text: "erdemir"
        },
        {
          paramKey: "isdemir",
          value: false,
          text: "isdemir"
        }
      ]
    },
    {
      title: "teslimSekli",
      label: "deliveryMethod",
      options: [
        {
          paramKey: "fob",
          value: false,
          text: "fob"
        },
        {
          paramKey: "FOT",
          value: false,
          text: "fot"
        },
        {
          paramKey: "cif",
          value: false,
          text: "cif"
        }
      ]
    }
  ],
  onFilterApply: filtered => {},
  onClosePress: filtered => {},
  translate: key => key
};

export default CheckboxFilter;
