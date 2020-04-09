import {StyleSheet} from "react-native";
import {BaseColor} from "../../config";

export default StyleSheet.create({
  pdf: {
    flex: 1,
    marginTop: 10
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    marginTop: 80
  },
  contentModalBottom: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor
  },
  contentTitle: {
    paddingTop: 15,
    alignItems: "center"
  }
});
