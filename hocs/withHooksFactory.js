import React from "react";
import translate from "./index";
import hoistStatics from "hoist-non-react-statics";
/** used to add translate props with HOC */
export const withHooksFactory = Hooks => (key, args = {}) => Component => {
  const displayName = `withHooks(${Component.displayName || Component.name})`;
  const C = ({ wrappedComponentRef, ...remainingProps }) => {
    let func = () => {
      console.error(`withHooks at ${displayName}`);
      return {};
    };
    if (Hooks[key]) {
      func = Hooks[key];
    }
    const { ...rest } = func(args);
    return (
      <Component
        translate={translate}
        {...remainingProps}
        {...rest}
        ref={wrappedComponentRef}
      />
    );
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHooksFactory;
