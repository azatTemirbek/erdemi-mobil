import hoistStatics from "hoist-non-react-statics";
import {useCombinedRefs} from "../hooks";
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
  const C = React.forwardRef(({hidden = false, ...props}, ref) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    return (
      <Block
        style={{
          display: hidden ? "none" : "flex"
        }}>
        <Component
          ref={combinedRef}
          {...props}
          required={hidden ? false : props.required}
        />
      </Block>
    );
  });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withHideFormElement;
