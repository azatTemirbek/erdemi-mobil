import { handleMargins, handlePaddings } from "../utils";
import hoistStatics from "hoist-non-react-statics";
import { createElement } from "./";
/** generates margin and paddings */
export function withMarginPaddings(Component) {
  const displayName = `withMarginPaddings(${Component.displayName ||
    Component.name})`;
  const C = ({ padding, margin, style, sm, md, lg, xl, ...remainingProps }) => {
    const [c1, c2, c3, c4] = [3, 5, 7.5, 10];
    const blockStyle = [
      /***######## margins */
      margin && handleMargins(margin),
      m1 && handleMargins(c1),
      m2 && handleMargins(c2),
      m3 && handleMargins(c3),
      m4 && handleMargins(c4),
      /** mtopX */
      mt1 && handleMargins([c1, 0, 0, 0]),
      mt2 && handleMargins([c2, 0, 0, 0]),
      mt3 && handleMargins([c3, 0, 0, 0]),
      mt4 && handleMargins([c4, 0, 0, 0]),
      /** mbotomtX */
      mb1 && handleMargins([0, 0, c1, 0]),
      mb2 && handleMargins([0, 0, c2, 0]),
      mb3 && handleMargins([0, 0, c3, 0]),
      mb4 && handleMargins([0, 0, c4, 0]),
      /** mrightX */
      mr1 && handleMargins([0, c1, 0, 0]),
      mr2 && handleMargins([0, c2, 0, 0]),
      mr3 && handleMargins([0, c3, 0, 0]),
      mr4 && handleMargins([0, c4, 0, 0]),
      /** mleftX */
      ml1 && handleMargins([0, 0, 0, c1]),
      ml2 && handleMargins([0, 0, 0, c2]),
      ml3 && handleMargins([0, 0, 0, c3]),
      ml4 && handleMargins([0, 0, 0, c4]),
      /** mhorizontalX */
      mx1 && handleMargins([0, c1]),
      mx2 && handleMargins([0, c2]),
      mx3 && handleMargins([0, c3]),
      mx4 && handleMargins([0, c4]),
      /** mverticalX */
      my1 && handleMargins([c1, 0]),
      my2 && handleMargins([c2, 0]),
      my3 && handleMargins([c3, 0]),
      my4 && handleMargins([c4, 0]),

      /***######## paddings */
      padding && handlePaddings(padding),

      pm1 && handlePaddings(c1),
      pm2 && handlePaddings(c2),
      pm3 && handlePaddings(c3),
      pm4 && handlePaddings(c4),
      /** mtopX */
      pt1 && handlePaddings([c1, 0, 0, 0]),
      pt2 && handlePaddings([c2, 0, 0, 0]),
      pt3 && handlePaddings([c3, 0, 0, 0]),
      pt4 && handlePaddings([c4, 0, 0, 0]),
      /** mbotomtX */
      pb1 && handlePaddings([0, 0, c1, 0]),
      pb2 && handlePaddings([0, 0, c2, 0]),
      pb3 && handlePaddings([0, 0, c3, 0]),
      pb4 && handlePaddings([0, 0, c4, 0]),
      /** mrightX */
      pr1 && handlePaddings([0, c1, 0, 0]),
      pr2 && handlePaddings([0, c2, 0, 0]),
      pr3 && handlePaddings([0, c3, 0, 0]),
      pr4 && handlePaddings([0, c4, 0, 0]),
      /** mleftX */
      pl1 && handlePaddings([0, 0, 0, c1]),
      pl2 && handlePaddings([0, 0, 0, c2]),
      pl3 && handlePaddings([0, 0, 0, c3]),
      pl4 && handlePaddings([0, 0, 0, c4]),
      /** mhorizontalX */
      px1 && handlePaddings([0, c1]),
      px2 && handlePaddings([0, c2]),
      px3 && handlePaddings([0, c3]),
      px4 && handlePaddings([0, c4]),
      /** mverticalX */
      py1 && handlePaddings([c1, 0]),
      py2 && handlePaddings([c2, 0]),
      py3 && handlePaddings([c3, 0]),
      py4 && handlePaddings([c4, 0]),
      style
    ];
    return createElement(Component, {
      style: blockStyle,
      ...remainingProps
    });
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
}

export default withMarginPaddings;
