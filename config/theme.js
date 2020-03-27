import { StyleSheet } from "react-native";

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
  safeAreaView: {
    flex: 1
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
