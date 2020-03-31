import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from "react-native";
import { Text, Image, Icon } from "../";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "../../config";
import { heightHeader } from "../../utils";

export class Header extends Component {
  renderLeft = type => {
    return type === 1 ? (
      <View style={styles.centered}>
        <Image
          source={this.props.companyLogo}
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
      <Icon name="angle-left" type="fontisto" size={22} color={this.props.type===3 ?BaseColor.primaryColor: BaseColor.whiteColor} />
    );
  };
  renderRight = type => {
    return type === 1 ? (
      <View style={{ alignItems: "center" }}>
        <Icon
          type="entypo"
          name="home"
          size={30}
          color={BaseColor.whiteColor}
        />
        <Text whiteColor semiBold>
          {this.props.translate("home")}
        </Text>
      </View>
    ) : null;
  };

  render() {
    const {
      style,
      styleLeft,
      titleContainerStyle,
      styleRight,
      type,
      title,
      titleStyle,
      onPressLeft,
      onPressRight
    } = this.props;
    return (
      <ImageBackground
        source={type === 3 ? null : require("./bgImage.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <SafeAreaView
          forceInset={{ top: "always" }}
        >
          <View style={[styles.container, style, {height:type===1?heightHeader():45}]}>
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
            <View style={[styles.contentCenter, titleContainerStyle]}>
              <Text
                whiteColor={type !== 3}
                primaryColor={type === 3}
                bold
                headline={title.length < 20}
                style={titleStyle}
              >
                {title}
              </Text>
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
  titleContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderRight: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.any,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.number, //1 Dashboard screen header, 2 with back icon(default), 3 white header
  white: PropTypes.bool,
  translate: PropTypes.func,
  companyLogo: PropTypes.any
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  titleContainerStyle: {},
  styleRight: {},
  renderLeft: false,
  renderRight: false,
  onPressLeft: () => {},
  onPressRight: () => {},
  title: "",
  titleStyle: {},
  type: 2,
  translate: key => key,
  companyLogo: null
};

export default Header;
