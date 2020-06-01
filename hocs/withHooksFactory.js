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
  const C = (componentProps = {}) => {
    let mergedProps = {...componentProps};
    try {
      if (!Hooks[key]) {
        throw new WithHooksError(key, "");
      }
      let fromHook = Hooks[key]({
        ...Object.freeze({...componentProps}),
        ...args
      });
      if (Array.isArray(fromHook)) {
        throw new WithHooksError(
          key,
          "And Hooks Must returm Object not an Array"
        );
      }
      mergedProps = {...mergedProps, ...fromHook};
    } catch (error) {
      if (error instanceof WithHooksError) {
        console.error(error);
      }
      // eslint-disable-next-line no-alert
      alert(error);
      mergedProps = {...componentProps};
    } finally {
      return createElement(Component, {...mergedProps});
    }
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHooksFactory;
