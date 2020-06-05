import React, {useCallback, forwardRef} from "react";
import hoistStatics from "hoist-non-react-statics";
import {curry, mergeAll} from "ramda";
import {Block, Icon, Text, TouchableOpacity} from "../components";
import {renderer} from "./utils/isClassComponent";

export const withErrorHandler = curry((Component) => {
  const displayName = `withErrorHandler(${
    Component.displayName || Component.name
  })`;
  const C = forwardRef((props, ref) => {
    let {error, dismissError} = props;
    !dismissError &&
      console.warn(
        "dismissError not povided plese reurn dismissError from outer component "
      );
    const dismiss = useCallback(() => {
      dismissError && dismissError();
    }, [dismissError]);
    return (
      <>
        {!!error && (
          <Block color="red" row space="between" p4>
            <Text color="white">{error}</Text>
            <TouchableOpacity onPress={dismiss}>
              <Icon name="close" size={14} color="white" />
            </TouchableOpacity>
          </Block>
        )}
        <Component {...mergeAll({ref}, props)} />
      </>
    );
  });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
});

export default withErrorHandler;
