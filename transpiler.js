import { isAlpha, isSkippable, token } from "./helper.js";
export var TokenType;
(function (TokenType) {
    TokenType[TokenType["TagName"] = 0] = "TagName";
    TokenType[TokenType["Identifier"] = 1] = "Identifier";
    TokenType[TokenType["LessThan"] = 2] = "LessThan";
    TokenType[TokenType["GreaterThan"] = 3] = "GreaterThan";
    TokenType[TokenType["LessThanSlash"] = 4] = "LessThanSlash";
    TokenType[TokenType["Equals"] = 5] = "Equals";
    TokenType[TokenType["OpenParen"] = 6] = "OpenParen";
    TokenType[TokenType["OpenCurlyBrace"] = 7] = "OpenCurlyBrace";
    TokenType[TokenType["CloseCurlyBrace"] = 8] = "CloseCurlyBrace";
    TokenType[TokenType["CloseParen"] = 9] = "CloseParen";
    TokenType[TokenType["Comma"] = 10] = "Comma";
    TokenType[TokenType["EqualsGreaterThan"] = 11] = "EqualsGreaterThan";
    TokenType[TokenType["SemiColon"] = 12] = "SemiColon";
    TokenType[TokenType["Const"] = 13] = "Const";
    TokenType[TokenType["Let"] = 14] = "Let";
    TokenType[TokenType["Return"] = 15] = "Return";
    TokenType[TokenType["For"] = 16] = "For";
    TokenType[TokenType["EOF"] = 17] = "EOF";
})(TokenType || (TokenType = {}));
var ElementTokenType;
(function (ElementTokenType) {
    ElementTokenType[ElementTokenType["div"] = 0] = "div";
    ElementTokenType[ElementTokenType["a"] = 1] = "a";
    ElementTokenType[ElementTokenType["abbr"] = 2] = "abbr";
    ElementTokenType[ElementTokenType["main"] = 3] = "main";
})(ElementTokenType || (ElementTokenType = {}));
const ELEMENTS = {
    div: ElementTokenType.div,
    a: ElementTokenType.a
};
const KEYWORDS = {
    'const': TokenType.Const,
    'return': TokenType.Return
};
// takes in a string, '<div></div>' for e.g and splits it into individual characters, then checks if they match a specific thing.
function tokenize(sourceCode) {
    const tokens = new Array();
    const src = sourceCode.split('');
    // logging used for debugging
    while (src.length > 0) {
        // the length of src array is greater than 0, run this, some if statements reduce the length of the src array by calling the shift method on it
        if (src[0] === '<') {
            tokens.push(token(src.shift(), TokenType.LessThan));
        }
        else if (src[0] === '/' && tokens[tokens.length - 1].value === '<') {
            tokens[tokens.length - 1].value += src.shift();
            tokens[tokens.length - 1].type = TokenType.LessThanSlash;
        }
        else if (src[0] === '>') {
            if (tokens[tokens.length - 1].value === '=') {
                console.log('done');
                tokens[tokens.length - 1].value += src.shift();
                tokens[tokens.length - 1].type = TokenType.EqualsGreaterThan;
            }
            else {
                tokens.push(token(src.shift(), TokenType.GreaterThan));
            }
        }
        else if (src[0] === '=') {
            tokens.push(token(src.shift(), TokenType.Equals));
        }
        else if (src[0] === '{') {
            tokens.push(token(src.shift(), TokenType.OpenCurlyBrace));
        }
        else if (src[0] === '}') {
            tokens.push(token(src.shift(), TokenType.CloseCurlyBrace));
        }
        else if (src[0] === '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }
        else if (src[0] === ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        }
        else if (src[0] === ',') {
            tokens.push(token(src.shift(), TokenType.Comma));
        }
        else if (src[0] === ';') {
            tokens.push(token(src.shift(), TokenType.SemiColon));
        }
        else {
            if (isAlpha(src[0])) {
                let identifier = '';
                while (src.length > 0 && isAlpha(src[0])) {
                    identifier += src[0];
                    src.shift();
                }
                const reserved = KEYWORDS[identifier];
                if (reserved == undefined) {
                    tokens.push(token(identifier, TokenType.Identifier));
                }
                else {
                    tokens.push(token(identifier, reserved));
                }
            }
            else if (isSkippable(src[0])) {
                src.shift(); // move to next character
            }
            else {
                src.shift();
                console.log('me');
            }
        }
    }
    tokens.push({ type: TokenType.EOF, value: 'EOF' });
    return tokens;
}
export default tokenize;
