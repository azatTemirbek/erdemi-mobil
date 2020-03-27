import React, { useState, useCallback } from "react";
import { TouchableOpacity, Image, ImageBackground, View } from "react-native";
import Modal from "react-native-modal";
import { Images } from "@config";
import { Text } from "@components";
import styles from "./styles";
import { Hooks } from "@duck";
import translate from "@lang";

const CompanyMenu = () => {
  const [Visible, setVisible] = useState(false);
  const { selectedName, onSelect, companyList } = Hooks.useCompanyListRedux();
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const closeAndSelect = useCallback(
    index => () => {
      setVisible(false);
      onSelect(index);
    },
    [onSelect]
  );
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        onPress={open}
      >
        <Image
          source={Images.logoBg}
          style={styles.image}
          resizeMode="contain"
        />
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
        <ImageBackground
          source={Images.companyMenuBg}
          style={styles.companyMenuBg}
        >
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
                    source={Images.logoBg}
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
export default CompanyMenu;
