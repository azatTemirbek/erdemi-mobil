import React from "react";
import hoistStatics from "hoist-non-react-statics";
import createElement from "../utils/createElement";
/**
 * @param {Object|Function} extraProps used to add extra props to compose
 */
export const withProps = (extraProps = {}) => Component => {
  const displayName = `withProps(${Component.displayName || Component.name})`;
  const C = remainingProps =>
    createElement(Component, {
      ...remainingProps,
      ...(typeof extraProps === "function"
        ? extraProps(remainingProps)
        : extraProps)
    });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
};

export default withProps;
