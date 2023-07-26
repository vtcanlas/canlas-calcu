import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const { expression } = await request.json();
  return json(calculateExpression(expression));
}

function calculateExpression(expression) {

  function applyOperator(a, operator, b) { //function for applying operation
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
    }
  }

  function getPrecedence(operator) { //function for gettingPrecedence (MDAS)
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }

  function infixToPostfix(tokens) { //convert infix to postfix to follow operator precedence
    const outputQueue = [];
    const operatorStack = [];

    for (let token of tokens) {
      if (!isNaN(token)) {         // if token is number
        outputQueue.push(token);   // push to queue
      } else {
        while (
          operatorStack.length > 0 &&   //operator stack not empty
          getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)  //precedence of operator at the top is greater than or equal to precednece of current token
        ) {
          outputQueue.push(operatorStack.pop()); //pop operator at top of the stack and push it to outputQueue
        }
        operatorStack.push(token); 
      }
    }

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
  }

  const tokens = expression.split(/(\+|\-|\*|\/)/).map((token) => {
    // Convert numbers to floats and leave operators as they are
    return isNaN(token) ? token : parseFloat(token);
  });

  const postfix = infixToPostfix(tokens);

  const stack = [];
  for (let token of postfix) {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      const result = applyOperator(a, token, b);
      stack.push(result);
    }
  }

  return stack[0];
}





