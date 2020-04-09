import {handleMargins, handlePaddings} from "../utils";
import hoistStatics from "hoist-non-react-statics";
import {createElement} from "./";
/** generates margin and paddings */
export function withMarginPaddings(Component) {
  const displayName = `withMarginPaddings(${
    Component.displayName || Component.name
  })`;
  const C = ({padding, margin, style, ...rest}) => {
    const $spacer = 10;
    const [c0, c1, c2, c3, c4] = [
      $spacer * 0,
      $spacer * 0.25,
      $spacer * 0.5,
      $spacer * 0.75,
      $spacer * 1
    ];
    const blockStyle = [
      /***######## margins */
      rest.m0 && handleMargins(c0),
      rest.m1 && handleMargins(c1),
      rest.m2 && handleMargins(c2),
      rest.m3 && handleMargins(c3),
      rest.m4 && handleMargins(c4),
      /** mtopX */
      rest.mt0 && handleMargins([c0, 0, 0, 0]),
      rest.mt1 && handleMargins([c1, 0, 0, 0]),
      rest.mt2 && handleMargins([c2, 0, 0, 0]),
      rest.mt3 && handleMargins([c3, 0, 0, 0]),
      rest.mt4 && handleMargins([c4, 0, 0, 0]),
      /** mbotomtX */
      rest.mb0 && handleMargins([0, 0, c0, 0]),
      rest.mb1 && handleMargins([0, 0, c1, 0]),
      rest.mb2 && handleMargins([0, 0, c2, 0]),
      rest.mb3 && handleMargins([0, 0, c3, 0]),
      rest.mb4 && handleMargins([0, 0, c4, 0]),
      /** mrightX */
      rest.mr0 && handleMargins([0, c0, 0, 0]),
      rest.mr1 && handleMargins([0, c1, 0, 0]),
      rest.mr2 && handleMargins([0, c2, 0, 0]),
      rest.mr3 && handleMargins([0, c3, 0, 0]),
      rest.mr4 && handleMargins([0, c4, 0, 0]),
      /** mleftX */
      rest.ml0 && handleMargins([0, 0, 0, c0]),
      rest.ml1 && handleMargins([0, 0, 0, c1]),
      rest.ml2 && handleMargins([0, 0, 0, c2]),
      rest.ml3 && handleMargins([0, 0, 0, c3]),
      rest.ml4 && handleMargins([0, 0, 0, c4]),
      /** mhorizontalX */
      rest.mx0 && handleMargins([0, c0]),
      rest.mx1 && handleMargins([0, c1]),
      rest.mx2 && handleMargins([0, c2]),
      rest.mx3 && handleMargins([0, c3]),
      rest.mx4 && handleMargins([0, c4]),
      /** mverticalX */
      rest.my0 && handleMargins([c0, 0]),
      rest.my1 && handleMargins([c1, 0]),
      rest.my2 && handleMargins([c2, 0]),
      rest.my3 && handleMargins([c3, 0]),
      rest.my4 && handleMargins([c4, 0]),

      /***######## paddings */
      rest.p0 && handlePaddings(c0),
      rest.p1 && handlePaddings(c1),
      rest.p2 && handlePaddings(c2),
      rest.p3 && handlePaddings(c3),
      rest.p4 && handlePaddings(c4),
      /** mtopX */
      rest.pt0 && handlePaddings([c0, 0, 0, 0]),
      rest.pt1 && handlePaddings([c1, 0, 0, 0]),
      rest.pt2 && handlePaddings([c2, 0, 0, 0]),
      rest.pt3 && handlePaddings([c3, 0, 0, 0]),
      rest.pt4 && handlePaddings([c4, 0, 0, 0]),
      /** mbotomtX */
      rest.pb0 && handlePaddings([0, 0, c0, 0]),
      rest.pb1 && handlePaddings([0, 0, c1, 0]),
      rest.pb2 && handlePaddings([0, 0, c2, 0]),
      rest.pb3 && handlePaddings([0, 0, c3, 0]),
      rest.pb4 && handlePaddings([0, 0, c4, 0]),
      /** mrightX */
      rest.pr0 && handlePaddings([0, c0, 0, 0]),
      rest.pr1 && handlePaddings([0, c1, 0, 0]),
      rest.pr2 && handlePaddings([0, c2, 0, 0]),
      rest.pr3 && handlePaddings([0, c3, 0, 0]),
      rest.pr4 && handlePaddings([0, c4, 0, 0]),
      /** mleftX */
      rest.pl0 && handlePaddings([0, 0, 0, c0]),
      rest.pl1 && handlePaddings([0, 0, 0, c1]),
      rest.pl2 && handlePaddings([0, 0, 0, c2]),
      rest.pl3 && handlePaddings([0, 0, 0, c3]),
      rest.pl4 && handlePaddings([0, 0, 0, c4]),
      /** mhorizontalX */
      rest.px0 && handlePaddings([0, c0]),
      rest.px1 && handlePaddings([0, c1]),
      rest.px2 && handlePaddings([0, c2]),
      rest.px3 && handlePaddings([0, c3]),
      rest.px4 && handlePaddings([0, c4]),
      /** mverticalX */
      rest.py0 && handlePaddings([c0, 0]),
      rest.py1 && handlePaddings([c1, 0]),
      rest.py2 && handlePaddings([c2, 0]),
      rest.py3 && handlePaddings([c3, 0]),
      rest.py4 && handlePaddings([c4, 0]),
      margin && handleMargins(margin),
      padding && handlePaddings(padding),
      style
    ];
    return createElement(Component, {
      style: blockStyle,
      ...rest
    });
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
}

export default withMarginPaddings;
