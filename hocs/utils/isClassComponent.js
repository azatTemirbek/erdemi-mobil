import React, {isValidElement} from "react";
import createElement from "./createElement";
export const isClassComponent = (Component) =>
  Boolean(
    Component &&
      Component.prototype &&
      typeof Component.prototype.render === "function" &&
      !!Component.prototype.isReactComponent
  );

export const isFunctionComponent = (component) =>
  typeof component === "function" &&
  String(component).includes("return React.createElement");

export const isReactComponent = (component) =>
  isClassComponent(component) || isFunctionComponent(component);

export const isElement = React.isValidElement;

export const isDOMTypeElement = (element) =>
  isElement(element) && typeof element.type === "string";

export const isCompositeTypeElement = (element) =>
  isValidElement(element) && typeof element.type === "function";

export const renderer = (comp = null, props = {}) =>
  !!comp && (isCompositeTypeElement(comp) ? comp : createElement(comp, props));
