"use strict";
exports.__esModule = true;
exports.isSkippable = exports.isAlpha = exports.token = void 0;
function token(value, type) {
    if (value === void 0) { value = ''; }
    return { value: value, type: type };
}
exports.token = token;
// checki if it is string
function isAlpha(str) {
    return str.toUpperCase() != str.toLowerCase();
}
exports.isAlpha = isAlpha;
function isSkippable(str) {
    return str === ' ' || str === '\n' || str === '\t';
}
exports.isSkippable = isSkippable;
