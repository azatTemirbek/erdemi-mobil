import styles from "./styles";
import hoistStatics from "hoist-non-react-statics";
import createElement from "../utils/createElement";
/** mostly used to simple css */
export function withStyles(Component) {
  const displayName = `withStyles(${Component.displayName || Component.name})`;
  const C = ({
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
    space,
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
      space && { justifyContent: `space-${space}` },
      wrap && { flexWrap: "wrap" },
      /** borderRadius */
      smallCard && styles.smallCard,
      card && styles.card,
      bigCard && styles.bigCard,
      style // rewrite predefined styles
    ];
    return createElement(Component, {
      style: blockStyles,
      ...remainingProps
    });
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
}

export default withStyles;
