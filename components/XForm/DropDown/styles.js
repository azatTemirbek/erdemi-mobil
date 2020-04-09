import {StyleSheet} from "react-native";
import {BaseColor} from "../../../config";

export default StyleSheet.create({
  lineSwipeDown: {
    width: 30,
    height: 0.5,
    backgroundColor: BaseColor.dividerColor
  },
  modalLabelStyle: {
    padding: 15
  },
  Modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContentContainer: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor
  },
  ModalContentAction: {
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1
  }
});
