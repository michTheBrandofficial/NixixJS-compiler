import { isSkippable, isAlpha, token } from "./helpers";

enum TokenType {
  TagName,
  LessThan,
  GreaterThan, 
  LessThanSlash,
  Equals, 
  OpenParen,
  OpenCurlyBrace,
  Comma,
  CloseCurlyBrace,
  CloseParen,
  EqualsGreaterThan,
}

// takes in a string, '<div></div>' for e.g and splits it into individual characters, then checks if they match a specific thing.
function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split('');
  // logging used for debugging

  while (src.length > 0) {
    // the length of src array is greater than 0, run this, some if statements reduce the length of the src array by calling the shift method on it
    if (src[0] === '<') {
      tokens.push(token(src.shift(), TokenType.LessThan));
    } else if (src[0] === '/' && tokens[tokens.length - 1].value === '<') {
      tokens[tokens.length - 1].value += src.shift();
      tokens[tokens.length - 1].type = TokenType.LessThanSlash
    } else if (src[0] === '>'){
      tokens.push(token(src.shift(), TokenType.GreaterThan));
    } else {
      if (isAlpha(src[0])) {
        let alpha = '';
        while (src.length > 0 && isAlpha(src[0])) {
          alpha += src[0];
          src.shift();
        }
        tokens.push(token(alpha, TokenType.TagName))
      } else if (isSkippable(src[0])) {
        src.shift() // move to next character
      } else {
        throw `Unrecognized source ${src[0]}`
      }
    }
  }
  return tokens;
}

module.exports = {
  default: tokenize
}