import hoistStatics from "hoist-non-react-statics";
import createElement from "../utils/createElement";
import {curry, merge} from "ramda";
/**
 * @param {Object|Function} extraProps used to add extra props to compose
 */
// withProps:: Object -> Component -> Component
export const withProps = curry((extraProps, Component) => {
  extraProps = extraProps || {};
  const displayName = `withProps(${Component.displayName || Component.name})`;
  const C = (remainingProps) =>
    createElement(
      Component,
      merge(
        remainingProps,
        typeof extraProps === "function"
          ? extraProps(remainingProps)
          : extraProps
      )
    );
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
});

export default withProps;
