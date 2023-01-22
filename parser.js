import tokenize, { TokenType } from "./transpiler";
export default class Parser {
    tokens = [];
    not_EOF() {
        return this.tokens[0].type != TokenType.EOF;
    }
    at() {
        return this.tokens[0];
    }
    eat() {
        const prev = this.tokens.shift();
        return prev;
    }
    produceAST(sourceCode) {
        this.tokens = tokenize(sourceCode);
        const program = {
            kind: 'Program',
            body: []
        };
        // parse until end of file
        while (this.not_EOF()) {
            program.body.push(this.parse_statement());
        }
        return program;
    }
    // parse_statement
    parse_statement() {
        return this.parse_expression();
    }
    // parse_expression
    parse_expression() {
        return this.parse_primaryExpression();
    }
    // parse_primaryExpression
    parse_primaryExpression() {
        const currentTokenType = this.at().type;
        switch (currentTokenType) {
            case TokenType.Identifier:
                return { kind: 'Identifier', symbol: this.at().value };
        }
    }
}
