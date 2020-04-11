"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Project = function Project(_ref) {
  var _ref$list = _ref.list,
      list = _ref$list === void 0 ? [] : _ref$list;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Project"), list.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("p", null, item);
  }), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      textAlign: "right"
    }
  }, "@toringo"), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      textAlign: "right"
    }
  }, "copy@right"));
};

var _default = Project;
exports["default"] = _default;

//# sourceMappingURL=product-list.js.map