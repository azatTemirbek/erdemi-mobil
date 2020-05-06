import React, {useCallback} from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  Animated
} from "react-native";
import styles from "./styles";
import {Icon, Text} from "../";
import PropTypes from "prop-types";

export const Popup = ({
  onCloseModal,
  isVisible,
  titleTag,
  titleProps,
  title,
  top,
  topStyle,
  bottom,
  bottomStyle,
  iconProps,
  disableCloseBtn = false,
  closeIconProps = {},
  withScroll = true,
  containerStyle,
  contentStyle,
  children
}) => {
  const _closeAndGoBack = useCallback(() => {
    onCloseModal();
  }, [onCloseModal]);
  let Tag = titleTag;
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onBackdropPress={_closeAndGoBack}
      onRequestClose={_closeAndGoBack}
      propagateSwipe
      transparent>
      <SafeAreaView style={[styles.container, containerStyle]}>
        {top && (
          <TouchableOpacity
            onPress={_closeAndGoBack}
            style={[styles.backDrop, topStyle]}
          />
        )}
        <Animated.View
          style={[
            styles.content,
            contentStyle,
            !bottom && {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0
            },
            !top && {
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0
            }
          ]}>
          <View style={styles.header}>
            <Tag {...titleProps}>{title}</Tag>
            {!disableCloseBtn && (
              <TouchableOpacity onPress={_closeAndGoBack}>
                <Icon
                  type="antdesign"
                  name="close"
                  size={28}
                  {...closeIconProps}
                />
              </TouchableOpacity>
            )}
          </View>
          {iconProps && <Icon {...iconProps} />}
          {withScroll ? (
            <ScrollView style={{width: "100%"}}>{children}</ScrollView>
          ) : (
            children
          )}
        </Animated.View>
        {bottom && (
          <TouchableOpacity
            onPress={_closeAndGoBack}
            style={[styles.backDrop, bottomStyle]}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};
Popup.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isVisible: PropTypes.bool,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  titleTag: PropTypes.any,
  titleProps: PropTypes.object,
  onCloseModal: PropTypes.func,
  children: PropTypes.node.isRequired,
  bottom: PropTypes.bool,
  bottomStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  top: PropTypes.bool,
  topStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disableCloseBtn: PropTypes.bool,
  withScroll: PropTypes.bool,
  closeIconProps: PropTypes.object
};

Popup.defaultProps = {
  style: {},
  containerStyle: {},
  contentStyle: {},
  isVisible: true,
  iconProps: null,
  title: "",
  titleTag: Text,
  titleProps: {},
  onCloseModal: () => {},
  bottom: true,
  bottomStyle: {},
  top: true,
  topStyle: {},
  disableCloseBtn: false,
  withScroll: true,
  closeIconProps: {}
};

export default Popup;
