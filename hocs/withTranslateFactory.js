import React from "react";
import hoistStatics from "hoist-non-react-statics";
/** used to add translate props with HOC */
export const withTranslateFactory = translate => Component => {
  const displayName = `withTranslate(${Component.displayName ||
    Component.name})`;
  const C = ({ wrappedComponentRef, ...remainingProps }) => (
    <Component
      translate={translate}
      {...remainingProps}
      ref={wrappedComponentRef}
    />
  );
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withTranslateFactory;
