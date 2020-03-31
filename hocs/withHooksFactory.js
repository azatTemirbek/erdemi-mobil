import React from "react";
import hoistStatics from "hoist-non-react-statics";
import createElement from "./utils/createElement";
/** used to add translate props with HOC */
export const withHooksFactory = Hooks => (key, args = {}) => Component => {
  const displayName = `withHooks(${Component.displayName || Component.name})`;
  const C = remainingProps => {
    let useTemp = () => {
      console.error(`withHooks at ${displayName}`);
      return {};
    };
    if (Hooks[key]) {
      useTemp = Hooks[key];
    }
    const { ...rest } = useTemp(args);
    return createElement(Component, {
      ...remainingProps,
      ...rest
    });
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHooksFactory;
