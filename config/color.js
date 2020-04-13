export const OrangeColor = {
  primaryColor: "#FF3160",
  darkPrimaryColor: "#C31C0D",
  lightPrimaryColor: "#FF8A65",
  accentColor: "#4A90A4"
};

export const BlueColor = {
  primaryColor: "#5DADE2",
  darkPrimaryColor: "#1281ac",
  lightPrimaryColor: "#68c9ef",
  accentColor: "#FF8A65"
};

export const PinkColor = {
  primaryColor: "#A569BD",
  darkPrimaryColor: "#C2185B",
  lightPrimaryColor: "#F8BBD0",
  accentColor: "#8BC34A"
};

export const GreenColor = {
  primaryColor: "#58D68D",
  darkPrimaryColor: "#388E3C",
  lightPrimaryColor: "#C8E6C9",
  accentColor: "#607D8B"
};

export const YellowColor = {
  primaryColor: "#FDC60A",
  darkPrimaryColor: "#FFA000",
  lightPrimaryColor: "#FFECB3",
  accentColor: "#795548"
};

export const ExtraColors = {
  cream: "#FFE9EE",
  lightGrayColor: "#F9F9F9",
  darkGrayColor: "#4C4C4C",
  lightPink: "#ff3160",
  alfaGrey: "#242424",
  blackColor: "#000",
  girisHeader: "#242424",
  kashmir: "#5D6D7E",
  amour: "#FFE9EE"
};

export const RedColor = {
  primaryColor: "#FF3360",
  darkPrimaryColor: "#C31C0D",
  lightPrimaryColor: "#FF8A65",
  accentColor: "#4A90A4"
};

export const BaseColor = {
  textPrimaryColor: "#212121",
  textSecondaryColor: "#E0E0E1",
  grayColor: "#9B9B9B",
  darkBlueColor: "#24253D",
  dividerColor: "#BDBDBD",
  whiteColor: "#FFFFFF",
  fieldColor: "#F5F5F5",
  yellowColor: "#FDC60A",
  navyBlue: "#3C5A99"
};

export const DisabledColor = {
  disabledColor: "#666666",
  disabledBackgroundColor: "#cccccc"
};

export const generateColors = (
  baseColor = {...BaseColor, ...ExtraColors, ...RedColor},
  cssProperty = "backgroundColor",
  prefix = ""
) =>
  Object.entries(baseColor).reduce((acc, [key, value], index, array) => {
    acc[`${prefix}${key}`] = {[cssProperty]: value};
    return acc;
  }, {});
