import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "../";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

export const Selector = ({ onCloseModal, isVisible, title, list, translate }) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onCloseModal}
    style={[styles.container]}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    propagateSwipe
  >
    <View style={[styles.content]}>
      {!!title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      {list.map((item, index) => (
        <TouchableOpacity
          style={index === list.length - 1 ? styles.lastList : styles.list}
          key={JSON.stringify(item) + index}
          onPress={item.onPress}
        >
          <Text style={styles.btnText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <TouchableOpacity
      onPress={onCloseModal}
      activeOpacity={0.8}
      style={styles.cancelButton}
    >
      <Text style={styles.cancelText}>{translate("cancel")}</Text>
    </TouchableOpacity>
  </Modal>
);

Selector.propTypes = {
  isVisible: PropTypes.bool,
  list: PropTypes.array,
  title: PropTypes.string,
  onCloseModal: PropTypes.func,
  translate: PropTypes.func
};

Selector.defaultProps = {
  isVisible: true,
  list: [
    {
      title: "Take Photo",
      onPress: () => {}
    },
    {
      title: "Choose from Library",
      onPress: () => {}
    }
  ],
  title: "",
  onCloseModal: () => {},
  translate: key => key
};

export default Selector;
