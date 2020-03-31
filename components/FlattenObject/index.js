import React from "react";
import PropTypes from "prop-types";
/**
 * used to flatten object and provide data to child
 * @param {Object} props - react Props
 */
export const FlattenObject = React.memo(({ object = {}, children, ...rest }) => (
  <>
    {Object.entries(object).map(([key, value], k, array) =>
      typeof children === "function"
        ? children({
            key: key + k,
            keyVal: key,
            value: value,
            noBorder: array.length === k + 1,
            ...rest
          })
        : React.Children.map(children, child =>
            React.cloneElement(child, {
              key: key + k,
              keyVal: key,
              value: value,
              noBorder: array.length === k + 1,
              ...rest
            })
          )
    )}
  </>
));

export default FlattenObject;

FlattenObject.propTypes = {
  object: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

FlattenObject.defaultProps = {
  object: {}
};
