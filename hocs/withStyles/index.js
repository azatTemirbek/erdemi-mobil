import React from "react";
import styles from "./styles";
import * as Utils from "../../utils";
// import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

export function withStyles(Component) {
  const displayName = `withStyles(${Component.displayName || Component.name})`;
  const C = ({
    wrappedComponentRef,
    flex,
    row,
    column,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    smallCard,
    card,
    bigCard,
    shadow,
    color,
    space,
    padding,
    margin,
    wrap,
    style,
    ...remainingProps
  }) => {
    const blockStyles = [
      styles.block,
      flex && { flex },
      flex === false && { flex: 0 }, // reset / disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      margin && Utils.handleMargins(margin),
      padding && Utils.handlePaddings(padding),
      smallCard && styles.smallCard,
      card && styles.card,
      bigCard && styles.bigCard,
      shadow && styles.shadow,
      space && { justifyContent: `space-${space}` },
      wrap && { flexWrap: "wrap" },
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style // rewrite predefined styles
    ];
    return (
      <Component
        style={blockStyles}
        {...remainingProps}
        ref={wrappedComponentRef}
      />
    );
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to set ref type not mandatory */
//   C.propTypes = {
//     wrappedComponentRef: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.func,
//       PropTypes.object
//     ])
//   };
  /** used to copy static methods */
  return hoistStatics(C, Component);
}

export default withStyles;
