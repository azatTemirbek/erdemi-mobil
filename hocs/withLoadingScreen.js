import * as React from "react";
import {View, ActivityIndicator} from "react-native";
import hoistStatics from "hoist-non-react-statics";
import {curry, merge} from "ramda";
const defaultProps = {
  size: "large",
  color: "red",
  backgroundColor: "#00000080",
  zIndex: 1000,
  loading: "loading"
};
// withLoadingScreen:: Object -> Component -> Component
export const withLoadingScreen = curry((extraProps, Component) => {
  const {size, color, backgroundColor, zIndex, loading} = merge(
    defaultProps,
    extraProps
  );
  const displayName = `withLoadingScreen(${
    Component.displayName || Component.name
  })`;
  const C = (props) => (
    <>
      {!!props[loading] && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor,
            zIndex
          }}>
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center"
            }}
            {...{size, color}}
          />
        </View>
      )}
      <Component {...props} />
    </>
  );
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
});

export default withLoadingScreen;
