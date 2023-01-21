export {};

declare global {
  type TokenType ={
    
  }

  interface Token {
    value: string,
    type: TokenType
  }
}