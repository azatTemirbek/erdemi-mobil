import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  renderRightStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: "10%"
  },
  renderLeftStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: "10%"
  },
  baseInput: {
    width: "100%",
    minHeight: 35
  },
  /** new css */
  ImageInputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 35
  },
  pillContainer: {
    margin: 2,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    minHeight: 35,
    minWidth: 60,
    padding: 0
  },
  styleContent: {
    position: "absolute",
    top: 0,
    right: 0
  },
  iconClose: {},
  renderPillIconContainer: {}
});
