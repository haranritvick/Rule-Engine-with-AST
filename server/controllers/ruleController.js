// server/controllers/ruleController.js

function create_rule(ruleString) {
  // The function to build the AST
  function buildAST(expression) {
    let pos = 0;

    function peek() {
      return expression[pos];
    }

    function consume() {
      return expression[pos++];
    }

    function skipWhitespace() {
      while (pos < expression.length && /\s/.test(peek())) {
        consume();
      }
    }

    function parseValue() {
      skipWhitespace();
      let value = '';

      // Handle quoted strings
      if (peek() === "'") {
        consume(); // Skip opening quote
        while (pos < expression.length && peek() !== "'") {
          value += consume();
        }
        consume(); // Skip closing quote
        return value;
      }

      // Handle numbers
      while (pos < expression.length && /[0-9]/.test(peek())) {
        value += consume();
      }
      if (value) return Number(value);

      // Handle other values (field names)
      while (pos < expression.length && /[a-zA-Z]/.test(peek())) {
        value += consume();
      }
      return value;
    }

    function parseComparison() {
      skipWhitespace();
      const left = parseValue();
      skipWhitespace();

      let operator = '';
      while (pos < expression.length && /[><=]/.test(peek())) {
        operator += consume();
      }

      skipWhitespace();
      const right = parseValue();

      return {
        type: 'comparison',
        operator,
        left,
        right
      };
    }

    function parseExpression() {
      skipWhitespace();

      if (peek() === '(') {
        consume(); // Skip opening parenthesis
        const node = parseLogical();
        skipWhitespace();
        consume(); // Skip closing parenthesis
        return node;
      }

      return parseComparison();
    }

    function parseLogical() {
      let left = parseExpression();

      while (pos < expression.length) {
        skipWhitespace();

        if (pos >= expression.length || peek() === ')') break;

        const operator = expression.substr(pos, 3);
        if (operator !== 'AND' && operator !== 'OR ') break;

        pos += operator.length;
        const right = parseExpression();

        left = {
          type: 'logical',
          operator: operator.trim(),
          left,
          right
        };
      }

      return left;
    }

    return parseLogical();
  }

  return buildAST(ruleString);
}

function combine_rules(ruleStrings) {
  if (!ruleStrings || ruleStrings.length === 0) {
    throw new Error('No rules provided');
  }

  if (ruleStrings.length === 1) {
    return create_rule(ruleStrings[0]);
  }

  const ruleAsts = ruleStrings.map(ruleString => create_rule(ruleString));
  
  // Combine rules with AND operator
  return ruleAsts.reduce((combined, current) => ({
    type: 'logical',
    operator: 'AND',
    left: combined,
    right: current
  }));
}

function evaluate_rule(ast, data) {
  if (!ast || !data) {
    return false;
  }

  function evaluateNode(node) {
    if (!node) return false;

    if (node.type === 'comparison') {
      const leftValue = data[node.left];
      const rightValue = node.right;

      switch (node.operator) {
        case '>':
          return leftValue > rightValue;
        case '<':
          return leftValue < rightValue;
        case '=':
          return leftValue === rightValue;
        case '>=':
          return leftValue >= rightValue;
        case '<=':
          return leftValue <= rightValue;
        default:
          return false;
      }
    }

    if (node.type === 'logical') {
      const leftResult = evaluateNode(node.left);
      const rightResult = evaluateNode(node.right);

      switch (node.operator) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          return false;
      }
    }

    return false;
  }

  try {
    return evaluateNode(ast);
  } catch (error) {
    console.error('Error evaluating rule:', error);
    return false;
  }
}

module.exports = { create_rule, combine_rules, evaluate_rule };