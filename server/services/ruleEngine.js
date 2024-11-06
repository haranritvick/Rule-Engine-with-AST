class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type;
      this.left = left;
      this.right = right;
      this.value = value;
    }
  }
  
  const parseRule = (ruleString) => {
    // Simplified rule parsing to construct AST (can use regex or custom parser)
    // Use Stack to manage nodes based on parenthesis precedence
    const stack = [];
    const tokens = ruleString.split(/\s+/);
  
    let currentNode = null;
  
    tokens.forEach((token) => {
      if (token === "AND" || token === "OR") {
        currentNode = new Node("operator", null, null, token);
      } else if (token === "(") {
        stack.push(currentNode);
        currentNode = null;
      } else if (token === ")") {
        const lastNode = stack.pop();
        if (lastNode) {
          lastNode.right = currentNode;
          currentNode = lastNode;
        }
      } else {
        const [field, operator, value] = token.split(/(>|<|=)/);
        currentNode = new Node("operand", null, null, { field, operator, value });
      }
    });
  
    return currentNode;
  };
  
  const combineRules = (rules) => {
    // Simple combination using AND operators between all rules
    let rootNode = null;
  
    rules.forEach((rule, index) => {
      const ruleAst = parseRule(rule);
      if (index === 0) {
        rootNode = ruleAst;
      } else {
        rootNode = new Node("operator", rootNode, ruleAst, "AND");
      }
    });
  
    return rootNode;
  };
  
  function evaluateNode(node, data) {
    if (node.type === 'comparison') {
        const { left, operator, right } = node;
        switch (operator) {
            case '>':
                return data[left] > right;
            case '<':
                return data[left] < right;
            case '=':
                return data[left] === right;
            // Add other operators as needed
            default:
                return false;
        }
    } else if (node.type === 'logical') {
        const leftResult = evaluateNode(node.left, data);
        const rightResult = evaluateNode(node.right, data);
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
  
  module.exports = { parseRule, combineRules, evaluateRule, Node };
  