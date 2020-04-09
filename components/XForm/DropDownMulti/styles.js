import {StyleSheet} from "react-native";
import {BaseColor} from "../../../config";

export default StyleSheet.create({
  pillContainer: {
    borderWidth: 1,
    borderColor: BaseColor.primaryColor,
    borderRadius: 30,
    padding: 10,
    margin: 2,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  mainContainer: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
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
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: "center"
  },
  lineSwipeDown: {
    width: 30,
    height: 0.5,
    backgroundColor: BaseColor.dividerColor
  },
  ModalContentAction: {
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1
  },
  renderPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "green",
    flex: 11
  },
  renderPillIconContainer: {
    marginHorizontal: 5,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  modalLabelStyle: {
    padding: 15
  },
  renderDropDownIcon: {
    padding: 3,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex: 1
  }
});
