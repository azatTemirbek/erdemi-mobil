import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ImageBackground
} from "react-native";
import { Text, Image, Icon, CompanyMenu } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor, Images, BaseStyle } from "@config";
import translate from "@lang";

export default class Header extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(this.props.barStyle, true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }
  renderLeft = type => {
    return type === 1 ? (
      <View style={styles.centered}>
        <Image
          source={Images.logoErdemir}
          style={styles.logo}
          resizeMode="contain"
        />
        <Icon
          color={BaseColor.primaryColor}
          name="caret-down"
          size={20}
          solid
        />
      </View>
    ) : (
      <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
    );
  };
  renderRight = type => {
    return type === 1 ? (
      <View style={{ alignItems: "center" }}>
        <Image
          source={Images.home}
          style={{ height: 20, width: 26 }}
          resizeMode="contain"
        />
        <Text whiteColor semiBold>
          {translate("home")}
        </Text>
      </View>
    ) : null;
  };

  render() {
    const {
      style,
      styleLeft,
      styleCenter,
      styleRight,
      type,
      title,
      titleStyle,
      subTitle,
      onPressLeft,
      onPressRight,
      white
    } = this.props;
    return (
      <ImageBackground
        source={white ? null : Images.background5}
        style={styles.bgImage}
      >
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: "always" }}
        >
          <View style={[styles.contain, style]}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.contentLeft, styleLeft]}
                onPress={onPressLeft}
              >
                {this.props.renderLeft
                  ? this.props.renderLeft()
                  : this.renderLeft(type)}
              </TouchableOpacity>
            </View>
            <View style={[styles.contentCenter, styleCenter]}>
              <Text
                whiteColor={!white}
                primaryColor={white}
                bold
                headline={title.length < 20}
                style={titleStyle}
              >
                {title}
              </Text>
              {subTitle != "" && (
                <Text caption2 light>
                  {subTitle}
                </Text>
              )}
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={[styles.contentRight, styleRight]}
                onPress={onPressRight}
              >
                {this.props.renderRight
                  ? this.props.renderRight()
                  : this.renderRight(type)}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderRight: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.number,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
  white: PropTypes.bool
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  renderLeft: false,
  renderRight: false,
  onPressLeft: () => {},
  onPressRight: () => {},
  title: "",
  titleStyle: {},
  type: 1,
  subTitle: "",
  barStyle: "dark-content",
  white: false
};
