export {}

declare global { 
  interface TokenType {}

  interface Token {
    value: string,
    type: TokenType
  } 

  interface Window {
    main: any
  }
}
