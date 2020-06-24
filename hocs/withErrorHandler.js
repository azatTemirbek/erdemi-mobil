import React, {useCallback, useEffect} from "react";
import hoistStatics from "hoist-non-react-statics";
import {curry} from "ramda";
import {Block, Icon, Text, TouchableOpacity} from "../components";
import PropTypes from "prop-types";

export const withErrorHandler = curry((Component) => {
  const displayName = `withErrorHandler(${
    Component.displayName || Component.name
  })`;
  const C = ({error, dismissError, ...props}) => {
    !dismissError &&
      console.warn(
        "dismissError not povided plese reurn dismissError from outer component "
      );
    const dismiss = useCallback(() => {
      dismissError && dismissError();
    }, [dismissError]);
    /** will remove the error when navigated to another component */
    useEffect(() => {
      return () => {
        dismiss();
      };
    }, [dismiss]);
    return (
      <>
        {!!error && (
          <Block flex={false} color="red" row p3>
            <Block flex={5} color="transparent">
              <Text color="white">{error}</Text>
            </Block>
            <TouchableOpacity
              flex={1}
              center
              middle
              color="transparent"
              onPress={dismiss}>
              <Icon name="close" color="white" type="font-awesome" size={20} />
            </TouchableOpacity>
          </Block>
        )}
        <Component {...props} />
      </>
    );
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  C.propTypes = {
    error: PropTypes.string,
    dismissError: PropTypes.func
  };
  C.defaultProps = {error: null, dismissError: null};
  return hoistStatics(C, Component);
});
withErrorHandler.removeErrorFromProps = removeErrorFromProps;
export const removeErrorFromProps = ({error, dismissError, ...props}) => props;
export default withErrorHandler;
