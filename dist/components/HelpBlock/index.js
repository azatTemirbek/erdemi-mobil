import React from "react";
import {View, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {BaseColor} from "../../config";
import {Text, Icon} from "../";
import styles from "./styles";

const HelpBlock = ({style, title, description, onPress, phone, email}) => {
  return (
    <View style={style}>
      <Text headline semibold>
        {title}
      </Text>
      <Text body2 grayColor>
        {description}
      </Text>
      <TouchableOpacity
        style={styles.contentBlockCall}
        onPress={onPress}
        activeOpacity={0.9}>
        <Icon name="phone" size={18} color={BaseColor.primaryColor} />
        <View
          style={{
            marginLeft: 8
          }}>
          <Text title3 accentColor>
            {phone}
          </Text>
          <Text caption1 grayColor>
            {email}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

HelpBlock.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
};

HelpBlock.defaultProps = {
  style: {},
  onPress: () => {},
  title: "",
  description: "",
  phone: "",
  email: ""
};

export default HelpBlock;
