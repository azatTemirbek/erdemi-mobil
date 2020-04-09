import React from "react";
import {View} from "react-native";
import styles from "./styles";
import {Text} from "../";

export const Item = ({
  style = {},
  rightProps = {},
  leftProps = {},
  keyVal = "",
  value = "",
  index = 0,
  translate = (key) => key,
  Tag = Text,
  noBorder
}) => {
  return (
    <View
      style={[styles.itemContainer, style, noBorder && {borderBottomWidth: 0}]}
      key={keyVal + value + index}>
      <Tag bold {...leftProps} style={[styles.title, leftProps.style || {}]}>
        {translate(keyVal)}
      </Tag>
      <Tag {...rightProps} style={[styles.title, rightProps.style || {}]}>
        {value}
      </Tag>
    </View>
  );
};

export default Item;
