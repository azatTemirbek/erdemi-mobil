import React from "react";
/**
 * used to merge the dom view
 * @param {Symbol} Component
 */
export const createElement = (Component, props) => {
  props.ref = props.wrappedComponentRef ? props.wrappedComponentRef : props.ref;
  delete props.wrappedComponentRef;
  return typeof Component === "function"
    ? Component(props)
    : React.createElement(Component, props);
};

export default createElement;
