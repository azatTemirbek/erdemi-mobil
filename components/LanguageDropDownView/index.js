import React from "react";
import {Icon, DropDown, Text} from "../";
import {BaseColor} from "../../config";
import PropTypes from "prop-types";

export const LanguageDropDownView = ({
  language,
  languageList,
  languageListShortened,
  changeLanguage,
  translate
}) => {
  // let language = "1";
  // let languageListShortened = [
  //   { text: "EN", value: "1" },
  //   { text: "TR", value: "2" }
  // ];
  let selected = languageListShortened.filter(
    (item) => language === item.value
  )[0];
  const pad0 = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0
  };
  const mar0 = {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0
  };
  return (
    <DropDown
      value={language}
      btnLabel={translate("apply")}
      options={languageListShortened}
      onChange={changeLanguage}
      renderCenterStyle={{flex: 0, ...mar0, ...pad0}}
      renderCenter={() => null}
      renderRightStyle={{backgroundColor: "transparent", ...mar0, ...pad0}}
      renderRightTouch={{color: "transparent", style: {...mar0, ...pad0}}}
      style={{
        borderRadius: 8,
        borderWidth: 2,
        borderColor: BaseColor.whiteColor,
        height: 26,
        width: 50,
        flex: 0,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        ...mar0,
        ...pad0
      }}
      renderLeftStyle={{backgroundColor: "transparent", ...mar0, ...pad0}}
      renderLeft={
        <Text
          center
          middle
          bgColor="transparent"
          color="white"
          margin={0}
          padding={0}>
          {selected.text}
        </Text>
      }
      icon={<Icon name="chevron-down" size={12} color="white" />}
      label=""
      error=""
    />
  );
};

LanguageDropDownView.propTypes = {
  language: PropTypes.string,
  languageList: PropTypes.array,
  changeLanguage: PropTypes.func
};
export default LanguageDropDownView;
