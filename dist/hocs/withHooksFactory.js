import hoistStatics from "hoist-non-react-statics";
import createElement from "./utils/createElement";
class WithHooksError extends Error {
  constructor(key) {
    super(`Error is inside withHooks! Control the Hooks.${key} exists!`);
  }
}
/** used to add translate props with HOC */
export const withHooksFactory = (Hooks) => (key, args = {}) => (Component) => {
  const displayName = `withHooks(${Component.displayName || Component.name})`;
  const C = (remainingProps) => {
    let rest = {};
    try {
      if (!Hooks[key]) {
        throw new WithHooksError(key);
      }
      rest = Hooks[key](args);
    } catch (error) {
      if (error instanceof WithHooksError) {
        console.error(error);
      }
      rest = {};
    } finally {
      return createElement(Component, {
        ...remainingProps,
        ...rest
      });
    }
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHooksFactory;
