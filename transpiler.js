"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
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
// takes in a string, '<div></div>' for e.g and splits it into individual characters, then checks if they match a specific thing.
function tokenize(sourceCode) {
    var tokens = new Array();
    var src = sourceCode.split('');
    // logging used for debugging
    while (src.length > 0) {
        // the length of src array is greater than 0, run this, some if statements reduce the length of the src array by calling the shift method on it
        if (src[0] === '<') {
            tokens.push((0, helpers_1.token)(src.shift(), TokenType.LessThan));
        }
        else if (src[0] === '/' && tokens[tokens.length - 1].value === '<') {
            tokens[tokens.length - 1].value += src.shift();
            tokens[tokens.length - 1].type = TokenType.LessThanSlash;
        }
        else if (src[0] === '>') {
            tokens.push((0, helpers_1.token)(src.shift(), TokenType.GreaterThan));
        }
        else {
            if ((0, helpers_1.isAlpha)(src[0])) {
                var alpha = '';
                while (src.length > 0 && (0, helpers_1.isAlpha)(src[0])) {
                    alpha += src[0];
                    src.shift();
                }
                tokens.push((0, helpers_1.token)(alpha, TokenType.TagName));
            }
            else if ((0, helpers_1.isSkippable)(src[0])) {
                src.shift(); // move to next character
            }
            else {
                throw "Unrecognized source ".concat(src[0]);
            }
        }
    }
    return tokens;
}
module.exports = {
    "default": tokenize
};
