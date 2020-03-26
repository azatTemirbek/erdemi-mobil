import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import { BaseColor } from "../../config";
/**
 * used to make [].map to generic component
 * @param {Object} props - react props
 */
const MapArray = ({ array = [], children, fallback, ...rest }) => {
  if (!array.length) {
    let propsCopy = { key: "index", object: array, children, ...rest };
    let index = 0;
    return typeof fallback === "function"
      ? fallback(propsCopy, index)
      : !Array.isArray(fallback)
      ? fallback
      : Children.map(fallback, child =>
          cloneElement(child, { ...propsCopy, index })
        );
  }
  return (
    <>
      {array.map((object = {}, index) =>
        typeof children === "function"
          ? children({ key: index, object: object, ...rest }, index)
          : Children.map(children, child =>
              cloneElement(child, {
                key: index,
                object: object,
                index,
                ...rest
              })
            )
      )}
    </>
  );
};

export default React.memo(MapArray);

MapArray.propTypes = {
  array: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  fallback: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

MapArray.defaultProps = {
  array: [],
  fallback: <ActivityIndicator size="small" color={BaseColor.accentColor} />
};