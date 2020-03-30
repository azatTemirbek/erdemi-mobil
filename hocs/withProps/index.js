import React from "react";
import hoistStatics from "hoist-non-react-statics";
/**
 * @param {Object|Function} extraProps used to add extra props to compose
 */
export const withProps = (extraProps = {}) => Component => {
  const displayName = `withProps(${Component.displayName || Component.name})`;
  const C = ({
    wrappedComponentRef,
    ...remainingProps
  }) => {
          /** merge props */
          const props = {
            ...remainingProps,
            ...(typeof extraProps === "function"
              ? extraProps(props)
              : extraProps)
          };
          return <Component {...props} ref={wrappedComponentRef} />;
        };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
};

export default withProps;
