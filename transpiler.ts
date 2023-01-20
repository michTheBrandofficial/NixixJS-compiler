type TokenArray = string[];

function tokenize(sourceCode: string): TokenArray {
  return sourceCode.split('');
}

module.exports = {
  default: tokenize
}