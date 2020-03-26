/* eslint-disable no-unused-vars */
/**
 * Color Palette 4Alabs (any sector oriented)
 * @author: Mehmet FASIL
 */

let redColor = {
  primaryColor: "#FF3360",
  darkPrimaryColor: "#C31C0D",
  lightPrimaryColor: "#FF8A65",
  accentColor: "#4A90A4",
  girisHeader: "#242424"
};

let orangeColor = {
  primaryColor: "#E5634D",
  darkPrimaryColor: "#C31C0D",
  lightPrimaryColor: "#FF8A65",
  accentColor: "#4A90A4"
};

let blueColor = {
  primaryColor: "#23b0e8",
  darkPrimaryColor: "#1281ac",
  lightPrimaryColor: "#68c9ef",
  accentColor: "#FF8A65"
};

let pinkColor = {
  primaryColor: "#E91E63",
  darkPrimaryColor: "#C2185B",
  lightPrimaryColor: "#F8BBD0",
  accentColor: "#8BC34A"
};

let greenColor = {
  primaryColor: "#4CAF50",
  darkPrimaryColor: "#388E3C",
  lightPrimaryColor: "#C8E6C9",
  accentColor: "#607D8B"
};

let yellowColor = {
  primaryColor: "#FFC107",
  darkPrimaryColor: "#FFA000",
  lightPrimaryColor: "#FFECB3",
  accentColor: "#795548"
};

export const BaseColor = {
  ...redColor,
  ...{
    lightPink: "#ff3160",
    cream: "#FFE9EE",
    textPrimaryColor: "#212121",
    textSecondaryColor: "#E0E0E1",
    lightGrayColor: "#F9F9F9",
    grayColor: "#9B9B9B",
    darkGrayColor: "#4C4C4C",
    darkBlueColor: "#24253D",
    dividerColor: "#BDBDBD",
    whiteColor: "#FFFFFF",
    fieldColor: "#F5F5F5",
    yellowColor: "#FDC60A",
    navyBlue: "#3C5A99",
    alfaGrey: "#242424",
    blackColor: "#000"
  }
};

export const generateColors = (
  baseColor = BaseColor,
  cssProperty = "backgroundColor",
  prefix = ""
) =>
  Object.entries(baseColor).reduce((acc, [key, value], index, array) => {
    acc[`${prefix}${key}`] = { [cssProperty]: value };
    return acc;
  }, {});
