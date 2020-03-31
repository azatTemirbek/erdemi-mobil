import React from "react";
import hoistStatics from "hoist-non-react-statics";
import createElement from "./utils/createElement";
/** used to add translate props with HOC */
export const withTranslateFactory = translate => Component => {
  const displayName = `withTranslate(${Component.displayName ||
    Component.name})`;
  const C = remainingProps =>
    createElement(Component, {
      translate,
      ...remainingProps
    });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withTranslateFactory;
