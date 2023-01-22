import { isAlpha, isSkippable, token } from "./helper";

export enum TokenType {
  TagName,
  Identifier,
  LessThan,
  GreaterThan, 
  LessThanSlash,
  Equals, 
  OpenParen,
  OpenCurlyBrace,
  CloseCurlyBrace,
  CloseParen,
  Comma,
  EqualsGreaterThan,
  SemiColon,
  Const,
  Let,
  Return,
  For,
  EOF
}

enum ElementTokenType {
  div,
  a,
  abbr,
  main
}

const ELEMENTS: Record<string, ElementTokenType> = {
  div: ElementTokenType.div,
  a: ElementTokenType.a
}

const KEYWORDS: Record<string, TokenType> = {
  'const': TokenType.Const,
  'return': TokenType.Return
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
      if (tokens[tokens.length -1].value === '='){
        console.log('done')
        tokens[tokens.length - 1].value += src.shift();
        tokens[tokens.length - 1].type = TokenType.EqualsGreaterThan
      } else {
        tokens.push(token(src.shift(), TokenType.GreaterThan))
      }
    } else if (src[0] === '=') {
      tokens.push(token(src.shift(), TokenType.Equals))
    } else if (src[0] === '{') {
      tokens.push(token(src.shift(), TokenType.OpenCurlyBrace))
    } else if (src[0] === '}') {
      tokens.push(token(src.shift(), TokenType.CloseCurlyBrace))
    } else if (src[0] === '(') {
      tokens.push(token(src.shift(), TokenType.OpenParen))
    } else if (src[0] === ')') {
      tokens.push(token(src.shift(), TokenType.CloseParen))
    } else if (src[0] === ',') {
      tokens.push(token(src.shift(), TokenType.Comma))
    } else if (src[0] === ';') {
      tokens.push(token(src.shift(), TokenType.SemiColon))
    } else {
      if (isAlpha(src[0])) {
        let identifier = '';
        while (src.length > 0 && isAlpha(src[0])) {
          identifier += src[0];
          src.shift();
        }
        const reserved = KEYWORDS[identifier];
        if (reserved == undefined) {
          tokens.push(token(identifier, TokenType.Identifier));
        } else {
          tokens.push(token(identifier, reserved))
        }
      } else if (isSkippable(src[0])) {
        src.shift()// move to next character
      } else {
        src.shift()
        console.log('me')
      }
    }
  }

  tokens.push({type: TokenType.EOF, value: 'EOF'})
  return tokens;
}

export default tokenize;