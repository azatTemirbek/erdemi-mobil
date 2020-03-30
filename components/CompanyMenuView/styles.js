import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 49,
    width: 72
  },
  text: {
    position: "absolute",
    width: 72,
    textAlign: "center"
  },
  heading: {
    padding: 20,
    textAlign: "center",
    color: "white"
  },
  modal: {
    margin: 0
  },
  companyMenuBg: {
    height: height,
    width: width
  },
  modalContent: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    paddingTop: 40
  },
  menu: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: 100
  },
  menuItem: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  menuToucheItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  menuImage: {
    width: 130,
    height: 68
  }
});
