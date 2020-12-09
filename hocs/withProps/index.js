import hoistStatics from "hoist-non-react-statics";
import createElement from "../utils/createElement";
import {curry, merge} from "ramda";
import React from "react";
/**
 * @param {Object|Function} extraProps used to add extra props to compose
 */
// withProps:: Object -> Component -> Component
export const withProps = curry((extraProps, Component) => {
  extraProps = extraProps || {};
  const displayName = `withProps(${Component.displayName || Component.name})`;
  const C = React.forwardRef((remainingProps, ref) => {
    const innerRef = React.useRef(null);
    const attachRef = (el) => {
      innerRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else {
        ref = el;
      }
    };
    return React.createElement(
      Component,
      merge(
        {...remainingProps, ref: attachRef},
        typeof extraProps === "function"
          ? extraProps(remainingProps)
          : extraProps
      )
    );
  });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
});

export default withProps;
