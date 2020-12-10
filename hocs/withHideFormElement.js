import hoistStatics from "hoist-non-react-statics";
import React from "react";
import {Block} from "../components";
/**
 * zorunlu ve hidden olunca zorunlu olmasi kaldirir
 * @param {FormElement} Component uı tarafını halleden hoc
 */
export const withHideFormElement = (Component) => {
  const displayName = `withHideFormElement(${
    Component.displayName || Component.name
  })`;
  const C = React.forwardRef(
    ({hidden = false, disableHidden = false, ...props}, ref) => {
      const innerRef = React.useRef(null);
      const attachRef = (el) => {
        innerRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else {
          ref = el;
        }
      };
      return disableHidden ? (
        <Component ref={attachRef} {...props} />
      ) : (
        <Block
          style={{
            display: hidden ? "none" : "flex"
          }}>
          <Component
            ref={attachRef}
            {...props}
            required={hidden ? false : props.required}
          />
        </Block>
      );
    }
  );
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHideFormElement;
