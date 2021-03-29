'use strict';
/*------------------------------------------------------------------------------
1. Run the exercise as given and observe that it works as advertised. Note that 
   the dice must be rolled an unpredictable number of times until we get an ACE 
   (eventually, we will).
2. Now, rewrite the body of the `rollDiceUntil()` function using async/await. 
   Hint: a `while` loop may come handy.
3. Refactor the function `main()` to use async/await and try/catch.
------------------------------------------------------------------------------*/
// ! Do not change or remove the next two lines
const rollDice = require('../../helpers/pokerDiceRoller');

function rollDiceUntil(wantedValue) {
  // TODO: rewrite this function using async/await
  const recurse = async () => {
    const value = await rollDice();
    while (value !== wantedValue) {
      return recurse();
    }
    return value;
  };
  return recurse();
}

// TODO refactor this function to use try/catch
async function main() {
  try {
    const results = await rollDiceUntil('ACE');
    console.log('Resolved', results);
  } catch (error) {
    console.log('Rejected', error.message);
  }
}

main();

// ! Do not change or remove the code below
module.exports = rollDiceUntil;
