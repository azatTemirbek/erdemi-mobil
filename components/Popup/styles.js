import {StyleSheet} from "react-native";
import {BaseColor} from "../../config";
export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  content: {
    width: "92%",
    padding: 10,
    borderRadius: 15,
    backgroundColor: BaseColor.whiteColor,
    alignItems: "center",
    justifyContent: "center"
  },
  backDrop: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
