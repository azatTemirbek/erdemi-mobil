import hoistStatics from "hoist-non-react-statics";
import createElement from "./utils/createElement";
import React from "react";
import {Text} from "../components/Text";
/** experimental need to be testaed and so on */
export const withSkeletone = (SceletonCompoent = () => <Text>Loadng</Text>) => (
  Component
) => {
  const displayName = `withSkeletone(${
    Component.displayName || Component.name
  })`;
  const C = (remainingProps) =>
    remainingProps.loading
      ? createElement(SceletonCompoent, {})
      : createElement(Component, remainingProps);
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withSkeletone;
