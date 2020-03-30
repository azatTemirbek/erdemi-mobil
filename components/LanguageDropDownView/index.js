import React from "react";
import { Icon, DropDown } from "../";
import styles from "./styles";
import { BaseColor, FontWeight } from "../../config";
import PropTypes from "prop-types";
const LanguageDropDownView = ({
  language,
  languageList,
  languageListShortened,
  changeLanguage,
  translate
}) => {
  return (
    <DropDown
      value={language}
      btnLabel={translate("apply")}
      options={languageListShortened}
      label=""
      icon={<Icon name="chevron-down" size={12} color={BaseColor.whiteColor} />}
      valueStyle={{
        color: BaseColor.whiteColor,
        fontWeight: FontWeight.bold,
        fontSize: 12,
        marginRight: 5
      }}
      contentStyle={styles.contentStyle}
      style={styles.changeLang}
      onChange={changeLanguage}
    />
  );
};

LanguageDropDownView.propTypes = {
  language: PropTypes.string,
  languageList: PropTypes.array,
  changeLanguage: PropTypes.func
};
export default LanguageDropDownView;
