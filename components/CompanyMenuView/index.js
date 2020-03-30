import React from "react";
import { TouchableOpacity, Image, ImageBackground, View } from "react-native";
import Modal from "react-native-modal";
import { Text } from "../";
import styles from "./styles";
import PropTypes from "prop-types";
/**
 * @param {Object} props
 */
export const CompanyMenuView = ({
  open,
  selectedName,
  Visible,
  close,
  closeAndSelect,
  companyList,
  logoBg,
  companyMenuBg,
  translate
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        onPress={open}
      >
        <Image source={logoBg} style={styles.image} resizeMode="contain" />
        <Text bold caption2 style={styles.text}>
          {selectedName}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={Visible}
        onSwipeComplete={close}
        swipeDirection={["down"]}
        style={styles.modal}
        animationIn="slideInUp"
      >
        <ImageBackground source={companyMenuBg} style={styles.companyMenuBg}>
          <View style={styles.modalContent}>
            <Text bold title1 style={styles.heading}>
              {translate("chooseCompany")}
            </Text>
            <View style={styles.menu}>
              {companyList.map((item, index) => (
                <TouchableOpacity
                  key={JSON.stringify(item)}
                  style={styles.menuItem}
                  activeOpacity={0.9}
                  onPress={closeAndSelect(index)}
                >
                  <Image
                    source={logoBg}
                    style={styles.menuImage}
                    resizeMode="contain"
                  />
                  <Text bold caption1 style={styles.text}>
                    {item && item.sirketKisaAdi}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </>
  );
};
export default CompanyMenuView;

CompanyMenuView.defaultProps = {
  open: false,
  selectedName: "",
  Visible: false,
  close: () => {},
  closeAndSelect: () => {},
  companyList: [],
  logoBg: null,
  companyMenuBg: null,
  translate: () => {}
};

CompanyMenuView.propTypes = {
  open: PropTypes.bool,
  selectedName: PropTypes.string,
  Visible: PropTypes.bool,
  close: PropTypes.func,
  closeAndSelect: PropTypes.func,
  companyList: PropTypes.array,
  logoBg: PropTypes.any,
  companyMenuBg: PropTypes.any,
  translate: PropTypes.func
};
