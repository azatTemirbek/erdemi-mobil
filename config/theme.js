import { StyleSheet } from "react-native";
import { BaseColor } from "./color";

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20
  },
  bodyMarginDefault: {
    marginHorizontal: 20
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    color: "#333333",
    padding: 10,
    width: "100%",
    justifyContent: "center"
  },
  safeAreaView: {
    flex: 1
  },
  shadow: {
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 * 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 4
  },
  keyboardAvoidingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  View: {
    flex: 1
  }
});
