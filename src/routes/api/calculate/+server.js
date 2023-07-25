// api/calculate.js

import { json } from '@sveltejs/kit';
import math from 'mathjs';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const { expression } = await request.json();
  return json(math.evaluate(expression));
}


