import { StyleSheet } from "react-native";
import { BaseColor } from "../../config";

export default StyleSheet.create({
  policyTextContainer: {
    flexDirection: "row"
  },
  pdf: {
    flex: 1,
    marginTop: 10
  },
  policyText: {
    margin: 10,
    flex: 1
  },
  checkbox: {
    margin: 12,
    height: 30,
    marginLeft: 0,
    marginRight: 0
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
