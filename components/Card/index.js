import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image } from "../";

export const Card = ({ style, children, styleContent, image, onPress }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.9}>
      {!!image && <Image source={image} style={styles.imageBanner} />}
      <View style={styleContent}>{children}</View>
    </TouchableOpacity>
  );
};

Card.propTypes = {
  image: PropTypes.any,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContent: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  onPress: PropTypes.func
};

Card.defaultProps = {
  image: null,
  style: {},
  styleContent: {
    position: "absolute",
    bottom: 0,
    padding: 10
  },
  onPress: () => {}
};

export default Card;
