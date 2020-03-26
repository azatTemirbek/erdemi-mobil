import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  content: {
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#F9F9F9"
  },
  header: {
    paddingVertical: 12,
    width: "100%",
    borderBottomColor: "#E2E2E5",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    paddingVertical: 15,
    width: "100%",
    borderBottomColor: "#E2E2E5",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  lastList: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  cancelButton: {
    width: "90%",
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  title: {
    fontSize: 14,
    color: "#939393"
  },
  btnText: {
    fontSize: 20,
    color: "#5492E9"
  },
  cancelText: {
    fontSize: 20,
    color: "#5492E9",
    fontWeight: "500"
  }
});
