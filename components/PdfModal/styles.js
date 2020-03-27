import { StyleSheet, Dimensions } from "react-native";
import { BaseColor } from "@config";
export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingTop: (Dimensions.get('window').height / 100) * 20
  },
  content: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: BaseColor.whiteColor,
    alignItems: "center",
    justifyContent: "center"
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  footer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: Dimensions.get('window').width,
    paddingBottom: 30,
    backgroundColor: BaseColor.whiteColor,
    flexDirection: "row",
    marginHorizontal: 10
  }
});
