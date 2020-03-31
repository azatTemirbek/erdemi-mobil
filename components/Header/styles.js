import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: Platform.OS === "android" ? 0 : 10,
    height: 45,
    paddingHorizontal: 20,
  },
  contentLeft: {
    flex: 1,
    justifyContent: "center",
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
    height: "100%"
  },
  right: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  bgImage: {
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
