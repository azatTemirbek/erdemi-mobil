import hoistStatics from "hoist-non-react-statics";
import createElement from "./utils/createElement";
import {elevationShadowStyle} from "../utils";
import {StyleSheet} from "react-native";
/** mostly used to make shadows css both for ios and android */
export function withShadows(Component) {
  const displayName = `withShadows(${Component.displayName || Component.name})`;
  const C = ({shadow, style, ...remainingProps}) =>
    createElement(Component, {
      style: StyleSheet.flatten([
        shadow && elevationShadowStyle(shadow === true ? undefined : shadow),
        style
      ]),
      ...remainingProps
    });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
}

export default withShadows;
