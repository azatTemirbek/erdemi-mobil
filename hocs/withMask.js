import hoistStatics from "hoist-non-react-statics";
import {useCombinedRefs} from "../hooks";
import React, {useCallback} from "react";
import PropTypes from "prop-types";
/**
 * used to mask the value
 * @param {string} value value of the component
 * @param {String} mask maskpattern
 * @param {Onject} translation used to program the patttern
 */
const toPattern = (value, mask, translation) => {
  let result = "";
  let maskCharIndex = 0;
  let valueCharIndex = 0;
  while (true) {
    // if mask is ended, break.
    if (maskCharIndex === mask.length) {
      break;
    }
    // if value is ended, break.
    if (valueCharIndex === value.length) {
      break;
    }
    let maskChar = mask[maskCharIndex];
    let valueChar = value[valueCharIndex];
    // value equals mask, just set
    if (maskChar === valueChar) {
      result += maskChar;
      valueCharIndex += 1;
      maskCharIndex += 1;
      continue;
    }
    // apply translator if match
    const translationHandler = translation[maskChar];
    if (translationHandler) {
      const resolverValue = translationHandler(valueChar || "");
      if (resolverValue === "") {
        //valueChar replaced so don't add it to result, keep the mask at the same point and continue to next value char
        valueCharIndex += 1;
        continue;
      } else if (resolverValue !== null) {
        result += resolverValue;
        valueCharIndex += 1;
      } else {
        result += maskChar;
      }
      maskCharIndex += 1;
      continue;
    }
    // not masked value, fixed char on mask
    result += maskChar;
    maskCharIndex += 1;
    continue;
  }
  return result;
};
/**
 * used to unmaks the value
 * @param {string} value value of the component
 * @param {String} mask maskpattern
 * @param {Onject} translation used to program the patttern
 */
const unMask = (value, mask, translation) => {
  let result = "";
  let valueCharIndex = 0;
  while (true) {
    // if no mask, break.
    if (mask.length === 0) {
      break;
    }
    // if value is ended, break.
    if (valueCharIndex === value.length) {
      break;
    }
    let maskChar = mask[valueCharIndex]; //get mask char
    let valueChar = value[valueCharIndex]; //get val char
    // apply translator if match
    const translationHandler = translation[maskChar];
    if (translationHandler) {
      let tempValueChar = valueChar;
      let tempMaskChar = maskChar;
      const resolverValueM = translationHandler(tempMaskChar || "");
      const resolverValue = translationHandler(tempValueChar || "");
      if (resolverValueM && resolverValue) {
        // ikiside ayni tipte
        result += valueChar;
        valueCharIndex += 1;
        continue;
      }
    }
    // value equals mask, just set
    if (maskChar === valueChar) {
      //result += maskChar; dont add keep going
      valueCharIndex += 1;
      continue;
    }
    // not masked value, fixed char on mask
    result += valueChar;
    valueCharIndex += 1;
    continue;
  }
  return result;
};
const DEFAULT_PHONE_INTERNATIONAL = "+99 999 999 99 99";
const DEFAULT_TRANSLATION = {
  "9": function (val) {
    return val.replace(/[^0-9]+/g, "");
  },
  A: function (val) {
    return val.replace(/[^a-zA-Z]+/g, "");
  },
  S: function (val) {
    return val.replace(/[^a-zA-Z0-9]+/g, "");
  },
  "*": function (val) {
    return val;
  }
};
/**
 * used to enhance TextInput with making ability
 * @param {Input} Component
 */
export const withMask = (Component) => {
  const displayName = `withMask(${Component.displayName || Component.name})`;
  const C = React.forwardRef(
    (
      {
        onChangeText,
        mask,
        getFormattedValue,
        value,
        customTranslation,
        ...props
      },
      ref
    ) => {
      const innerRef = React.useRef(null);
      const combinedRef = useCombinedRefs(ref, innerRef);
      const msk = mask || DEFAULT_PHONE_INTERNATIONAL;
      const trns = {...DEFAULT_TRANSLATION, customTranslation};
      /** send clean value */
      const innerOnChangeText = useCallback(
        (val) => onChangeText(getFormattedValue ? val : unMask(val, msk, trns)),
        [getFormattedValue, msk, onChangeText, trns]
      );
      /** recalculates applyse musk */
      const innerValue = toPattern(value, msk, trns);
      return (
        <Component
          ref={combinedRef}
          {...props}
          value={innerValue}
          onChangeText={innerOnChangeText}
        />
      );
    }
  );
  C.displayName = displayName;
  C.WrappedComponent = Component;
  C.propTypes = {
    mask: PropTypes.string,
    customTranslation: PropTypes.object,
    getFormattedValue: PropTypes.bool
  };
  C.defaultProps = {
    mask: undefined,
    customTranslation: {},
    getFormattedValue: false
  };
  return hoistStatics(C, Component);
};

export default withMask;
