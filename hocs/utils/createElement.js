import React, {createElement as CE} from "react";
import {isClassComponent} from "./isClassComponent";
/**
 * used to merge the dom view
 * @param {Symbol} Component
 */
export const createElement = (Component, {wrappedComponentRef, ...props}) => {
  props.ref = wrappedComponentRef ? wrappedComponentRef : props.ref;
  try {
    return !isClassComponent(Component) && typeof Component === "function"
      ? Component(props)
      : React.createElement(Component, props);
  } catch (error) {
    console.log(createElement, error);
    return CE(Component, props);
  }
  // finally {
  //   return CE(Component, props);
  // }
};

export default createElement;
