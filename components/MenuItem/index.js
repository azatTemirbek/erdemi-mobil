import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import {BaseColor} from "../../config";
import {Text, Icon} from "../";
import styles from "./styles";

export const MenuItem = ({navigate}) => ({item, index}) => (
  <TouchableOpacity style={styles.item} onPress={() => navigate(item.screen)}>
    <View style={{flexDirection: "row"}}>
      <Icon
        name={item.icon}
        color={BaseColor.primaryColor}
        size={18}
        solid
        style={{marginRight: 10}}
        {...item.icon}
      />
      <Text body1>{item.title}</Text>
    </View>
    <Icon name="angle-right" size={18} color={BaseColor.primaryColor} />
  </TouchableOpacity>
);

MenuItem.propTypes = {
  navigation: PropTypes.object
};

MenuItem.defaultProps = {
  navigation: {}
};

export default MenuItem;
