"use strict";
exports.__esModule = true;
exports.isSkippable = exports.isAlpha = exports.token = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["TagName"] = 0] = "TagName";
    TokenType[TokenType["LessThan"] = 1] = "LessThan";
    TokenType[TokenType["GreaterThan"] = 2] = "GreaterThan";
    TokenType[TokenType["LessThanSlash"] = 3] = "LessThanSlash";
    TokenType[TokenType["Equals"] = 4] = "Equals";
    TokenType[TokenType["OpenParen"] = 5] = "OpenParen";
    TokenType[TokenType["OpenCurlyBrace"] = 6] = "OpenCurlyBrace";
    TokenType[TokenType["Comma"] = 7] = "Comma";
    TokenType[TokenType["CloseCurlyBrace"] = 8] = "CloseCurlyBrace";
    TokenType[TokenType["CloseParen"] = 9] = "CloseParen";
    TokenType[TokenType["EqualsGreaterThan"] = 10] = "EqualsGreaterThan";
})(TokenType || (TokenType = {}));
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
