import isClassComponent from "./isClassComponent";
/**
 * used to merge the dom view
 * @param {Symbol} Component
 */
export const createElement = (Component, props) => {
  props.ref = props.wrappedComponentRef ? props.wrappedComponentRef : props.ref;
  return isClassComponent(Component) ? (
    <Component {...props} />
  ) : (
    Component(props)
  );
};

export default createElement;
