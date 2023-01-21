export {}

declare global { 
  interface TokenType {}

  interface Token {
    value: string,
    type: TokenType
  } 
}
