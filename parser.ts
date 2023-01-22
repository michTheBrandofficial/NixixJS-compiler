import { Statement, Expression, FunctionExpression, Program, Identifier } from "./ast";
import  tokenize,{ TokenType } from "./transpiler";


export default class Parser {
  private tokens: Token[] = [];

  private not_EOF(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  private at() {
    return this.tokens[0];
  }

  private eat() {
    const prev = this.tokens.shift() as Token;
    return  prev;
  }

  public produceAST (sourceCode: string) {
    this.tokens = tokenize(sourceCode)
    const program: Program = {
      kind: 'Program',
      body: []
    };

    // parse until end of file
    while (this.not_EOF()) {
      program.body.push(this.parse_statement());
    }

    return program
  }

  // parse_statement
  private parse_statement(): Statement {
    return this.parse_expression();
  }

  // parse_expression
  private parse_expression(): Expression {
    return this.parse_primaryExpression();
  }

  // parse_primaryExpression
  private parse_primaryExpression(): Expression {
    const currentTokenType = this.at().type;

    switch (currentTokenType) {
      case TokenType.Identifier: 
        return {kind: 'Identifier', symbol: this.at().value} as Identifier;
    }
  }
}

