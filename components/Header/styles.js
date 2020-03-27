import { StyleSheet, Platform } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
  contain: {
    height: 45,
    flexDirection: "row",
    paddingBottom: Platform.OS === "android" ? 0 : 10
  },
  contentLeft: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    width: 60
  },
  contentCenter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  contentRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 20,
    height: "100%"
  },
  contentRightSecond: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%"
  },
  right: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  bgImage: {
    width: "100%",
    height: Utils.heightHeader()
  },
  logo: {
    height: Platform.OS === "android" ? "70%" : "90%",
    width: 72,
    marginBottom: -10
  },
  centered: {
    alignItems: "center",
    justifyContent: "center"
  }
});
