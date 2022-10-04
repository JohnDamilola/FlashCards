"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _common = require("./common");

var _useId = _interopRequireDefault(require("./hooks/useId"));

var _excluded = ["id", "prefixCls", "strokeWidth", "trailWidth", "gapDegree", "gapPosition", "trailColor", "strokeLinecap", "style", "className", "strokeColor", "percent"];

function stripPercentToNumber(percent) {
  return +percent.replace('%', '');
}

function toArray(value) {
  var mergedValue = value !== null && value !== void 0 ? value : [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}

var VIEW_BOX_SIZE = 100;

var getCircleStyle = function getCircleStyle(radius, offset, percent, strokeColor) {
  var gapDegree = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var gapPosition = arguments.length > 5 ? arguments[5] : undefined;
  var strokeLinecap = arguments.length > 6 ? arguments[6] : undefined;
  var strokeWidth = arguments.length > 7 ? arguments[7] : undefined;
  var rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
  var perimeter = Math.PI * 2 * radius;
  var perimeterWithoutGap = perimeter * ((360 - gapDegree) / 360);
  var offsetDeg = offset / 100 * 360 * ((360 - gapDegree) / 360);
  var positionDeg = gapDegree === 0 ? 0 : {
    bottom: 0,
    top: 180,
    left: 90,
    right: -90
  }[gapPosition];
  var strokeDashoffset = (100 - percent) / 100 * perimeterWithoutGap; // Fix percent accuracy when strokeLinecap is round
  // https://github.com/ant-design/ant-design/issues/35009

  if (strokeLinecap === 'round' && percent !== 100) {
    strokeDashoffset += strokeWidth / 2; // when percent is small enough (<= 1%), keep smallest value to avoid it's disapperance

    if (strokeDashoffset >= perimeterWithoutGap) {
      strokeDashoffset = perimeterWithoutGap - 0.01;
    }
  }

  return {
    stroke: typeof strokeColor === 'string' ? strokeColor : undefined,
    strokeDasharray: "".concat(perimeterWithoutGap, "px ").concat(perimeter),
    strokeDashoffset: strokeDashoffset,
    transform: "rotate(".concat(rotateDeg + offsetDeg + positionDeg, "deg)"),
    transformOrigin: '50% 50%',
    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
    fillOpacity: 0
  };
};

var Circle = function Circle(_ref) {
  var id = _ref.id,
      prefixCls = _ref.prefixCls,
      strokeWidth = _ref.strokeWidth,
      trailWidth = _ref.trailWidth,
      gapDegree = _ref.gapDegree,
      gapPosition = _ref.gapPosition,
      trailColor = _ref.trailColor,
      strokeLinecap = _ref.strokeLinecap,
      style = _ref.style,
      className = _ref.className,
      strokeColor = _ref.strokeColor,
      percent = _ref.percent,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var mergedId = (0, _useId.default)(id);
  var gradientId = "".concat(mergedId, "-gradient");
  var radius = VIEW_BOX_SIZE / 2 - strokeWidth / 2;
  var circleStyle = getCircleStyle(radius, 0, 100, trailColor, gapDegree, gapPosition, strokeLinecap, strokeWidth);
  var percentList = toArray(percent);
  var strokeColorList = toArray(strokeColor);
  var gradient = strokeColorList.find(function (color) {
    return color && (0, _typeof2.default)(color) === 'object';
  });
  var paths = (0, _common.useTransitionDuration)();

  var getStokeList = function getStokeList() {
    var stackPtg = 0;
    return percentList.map(function (ptg, index) {
      var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      var stroke = color && (0, _typeof2.default)(color) === 'object' ? "url(#".concat(gradientId, ")") : undefined;
      var circleStyleForStack = getCircleStyle(radius, stackPtg, ptg, color, gapDegree, gapPosition, strokeLinecap, strokeWidth);
      stackPtg += ptg;
      return /*#__PURE__*/React.createElement("circle", {
        key: index,
        className: "".concat(prefixCls, "-circle-path"),
        r: radius,
        cx: VIEW_BOX_SIZE / 2,
        cy: VIEW_BOX_SIZE / 2,
        stroke: stroke,
        strokeLinecap: strokeLinecap,
        strokeWidth: strokeWidth,
        opacity: ptg === 0 ? 0 : 1,
        style: circleStyleForStack,
        ref: function ref(elem) {
          // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
          // React will call the ref callback with the DOM element when the component mounts,
          // and call it with `null` when it unmounts.
          // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
          paths[index] = elem;
        }
      });
    }).reverse();
  };

  return /*#__PURE__*/React.createElement("svg", (0, _extends2.default)({
    className: (0, _classnames.default)("".concat(prefixCls, "-circle"), className),
    viewBox: "0 0 ".concat(VIEW_BOX_SIZE, " ").concat(VIEW_BOX_SIZE),
    style: style,
    id: id
  }, restProps), gradient && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gradientId,
    x1: "100%",
    y1: "0%",
    x2: "0%",
    y2: "0%"
  }, Object.keys(gradient).sort(function (a, b) {
    return stripPercentToNumber(a) - stripPercentToNumber(b);
  }).map(function (key, index) {
    return /*#__PURE__*/React.createElement("stop", {
      key: index,
      offset: key,
      stopColor: gradient[key]
    });
  }))), /*#__PURE__*/React.createElement("circle", {
    className: "".concat(prefixCls, "-circle-trail"),
    r: radius,
    cx: VIEW_BOX_SIZE / 2,
    cy: VIEW_BOX_SIZE / 2,
    stroke: trailColor,
    strokeLinecap: strokeLinecap,
    strokeWidth: trailWidth || strokeWidth,
    style: circleStyle
  }), getStokeList());
};

Circle.defaultProps = _common.defaultProps;
Circle.displayName = 'Circle';
var _default = Circle;
exports.default = _default;