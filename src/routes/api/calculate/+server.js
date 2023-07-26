import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const { expression } = await request.json();
  return json(calculateExpression(expression));
}

function calculateExpression(expression) {
  function applyOperator(a, operator, b) {
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

  const operators = expression.split(/[0-9.]+/).filter(Boolean);
  const numbers = expression.split(/[-+*/]/).map(parseFloat);
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];
    const partialResult = applyOperator(result, operator, nextNumber);
    result = partialResult;
  }

  return result;
}


