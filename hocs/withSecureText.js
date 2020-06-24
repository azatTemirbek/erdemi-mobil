import hoistStatics from "hoist-non-react-statics";
import {BaseColor} from "../config";
import {useCombinedRefs} from "../hooks";
import React, {useState} from "react";
import {TouchableOpacity, Icon} from "../components";

export const withSecureText = (Component) => {
  const displayName = `withSecureText(${
    Component.displayName || Component.name
  })`;
  const C = React.forwardRef((props, ref) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const [secure, setSecure] = useState(true);
    return (
      <Component
        renderRight={(_) => {
          return (
            <TouchableOpacity
              center
              middle
              onPress={() => setSecure((bool) => !bool)}>
              <Icon
                name={secure ? "eye" : "eye-slash"}
                size={22}
                color={secure ? "#E5E5E5" : BaseColor.accentColor}
              />
            </TouchableOpacity>
          );
        }}
        secureTextEntry={secure}
        ref={combinedRef}
        {...props}
      />
    );
  });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
};

export default withSecureText;
