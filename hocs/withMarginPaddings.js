import { handleMargins, handlePaddings } from "../utils";
import hoistStatics from "hoist-non-react-statics";
import { createElement } from "./";
/** generates margin and paddings */
export function withMarginPaddings(Component) {
  const displayName = `withMarginPaddings(${Component.displayName ||
    Component.name})`;
  const C = ({ padding, margin, style, ...remainingProps }) =>
    createElement(Component, {
      style: [
        margin && handleMargins(margin),
        padding && handlePaddings(padding),
        style
      ],
      ...remainingProps
    });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
}

export default withMarginPaddings;
