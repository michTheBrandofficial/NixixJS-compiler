export type NodeType = 
'FunctionExpression' | 
'Expression' | 
'Statement' | 
'Program' |
"Identifier" | 
"const";

export interface Statement {
  kind: NodeType
}

export interface Program extends Statement {
  kind: 'Program',
  body: Statement[]
}

export interface VariableDeclaration extends Statement{
  type: "VariableDeclaration", 
  declarations: Statement[],
  kind: "const"
}

export interface Expression extends Statement {}

export interface FunctionExpression extends Expression {
  kind: "FunctionExpression",
  left: Expression,
  right: Expression,
  assignment: string
}

export interface Identifier extends Expression {
  kind: "Identifier",
  symbol: string
}