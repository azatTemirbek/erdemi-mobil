import hoistStatics from "hoist-non-react-statics";
import createElement from "./utils/createElement";
class WithHooksError extends Error {
  constructor(key, msg = "") {
    super(`Error is inside withHooks! Control the Hooks.${key} exists! ${msg}`);
  }
}
/** used to add translate props with HOC */
export const withHooksFactory = (Hooks) => (key, args = {}) => (Component) => {
  const displayName = `withHooks(${Component.displayName || Component.name})`;
  const C = ({error, dismissError, ...componentProps} = {}) => {
    if (!Hooks[key]) {
      throw new WithHooksError(key, "");
    }
    const fromHook = Hooks[key]({
      ...componentProps,
      ...args
    });
    if (Array.isArray(fromHook)) {
      throw new WithHooksError(
        key,
        "And Hooks Must returm Object not an Array"
      );
    }
    return createElement(Component, {...componentProps, ...args, ...fromHook});
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHooksFactory;
