function token(value = '', type: TokenType): Token {
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
