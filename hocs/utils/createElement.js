import React from "react";
/**
 * used to merge the dom view
 * @param {Symbol} Component
 */
export const createElement = (Component, { wrappedComponentRef, ...props }) => {
  props.ref = wrappedComponentRef ? wrappedComponentRef : props.ref;
  return typeof Component === "function"
    ? Component(props)
    : React.createElement(Component, props);
};

export default createElement;
