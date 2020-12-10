import {StyleSheet} from "react-native";
import {BaseColor} from "../../config";

const DEF_CELL_WIDTH = 200;
const DEF_CELL_HEIGHT = 50;
const DEF_BORDER_WIDTH = 0.5;

const generateStyles = (
  CELL_WIDTH = DEF_CELL_WIDTH,
  CELL_HEIGHT = DEF_CELL_HEIGHT,
  BORDER_WIDTH = DEF_BORDER_WIDTH
) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BaseColor.whiteColor,
      borderTopWidth: BORDER_WIDTH,
      borderLeftWidth: BORDER_WIDTH,
      borderColor: BaseColor.blackColor,
      flexGrow: 0
    },
    body: {marginLeft: CELL_WIDTH},
    column: {flexDirection: "column"},
    FixedRowHeaderStyle: {
      flexDirection: "row"
    },
    FixedColumnHeaderStyle: {
      position: "absolute",
      width: CELL_WIDTH
    },
    cellStyle: {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      borderRightWidth: BORDER_WIDTH,
      borderBottomWidth: BORDER_WIDTH,
      borderColor: BaseColor.blackColor,
      alignItems: "center",
      justifyContent: "center"
    },
    headerCellStyle: {},
    columnCellStyle: {}
  });
};

const styles = generateStyles();
export {styles, generateStyles};
