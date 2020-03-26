import React from "react";
import PropTypes from "prop-types";
import ZocialIcon from "react-native-vector-icons/Zocial";
import OcticonIcon from "react-native-vector-icons/Octicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FAIcon from "react-native-vector-icons/FontAwesome";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontistoIcon from "react-native-vector-icons/Fontisto";
const getIconType = type => {
  switch (type) {
    case "zocial":
      return ZocialIcon;
    case "octicon":
      return OcticonIcon;
    case "material":
      return MaterialIcon;
    case "material-community":
      return MaterialCommunityIcon;
    case "ionicon":
      return Ionicon;
    case "foundation":
      return FoundationIcon;
    case "evilicon":
      return EvilIcon;
    case "entypo":
      return EntypoIcon;
    case "font-awesome":
      return FAIcon;
    case "font-awesome-5":
      return FA5Icon;
    case "simple-line-icon":
      return SimpleLineIcon;
    case "feather":
      return FeatherIcon;
    case "antdesign":
      return AntIcon;
    case "fontisto":
      return FontistoIcon;

    default:
      return MaterialIcon;
  }
};
const Icon = ({ type = "font-awesome-5", ...rest }) => {
  const IconComponent = getIconType(type);
  return <IconComponent {...rest} />;
};

index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

index.defaultProps = {
  style: {}
};
export default Icon;