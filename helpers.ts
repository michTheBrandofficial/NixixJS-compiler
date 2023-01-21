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

function token(value = '', type: TokenType) {
  return {value, type}
}
// checki if it is string
function isAlpha(str:string) {
  return str.toUpperCase() != str.toLowerCase();
}

function isSkippable(str:string) {
  return str === ' ' || str === '\n' || str === '\t';
}

export {
  token,
  isAlpha,
  isSkippable
}