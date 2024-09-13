// NOTE
///////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////////////
// #:
let arr = ["a", "b", "c", "d", "e"];

// #: slice() extract part of an  array without changing the original array
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice());
console.log([...arr]);

// #: splice .it mutate
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// #: reverse() .it mutate
const arr1 = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());

// #: concat()
const letters = arr1.concat(arr2);
console.log(letters);

// #: join()
console.log(letters.join("-"));

// NOTE: Looping an array using forEach()
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// #:
console.log(`starting with for of
`);
for (const [movement, index] of movements.entries()) {
  if (movement > 0)
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  else console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
}

// #:
console.log(`forEach`);
movements.forEach(function (movement, index, array) {
  if (movement > 0)
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  else console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
});

// #: forEach() Map()
const currencies = new Map([
  ["USD", "United States Dollar"],
  ["NGN", "Nigerian Naira"],
  ["GBP", "Pound Sterling"],
]);

currencies.forEach(function (value, key, map) {
  // console.log(`${key}: ${value}`);
  console.log(value);
});

// #: forEach() Set()
const currenciesUnique = new Set([
  "USD",
  "NGN",
  "GBP",
  "USD",
  "NGN",
  "NGN",
  "EUR",
  "GBP",
]);

console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
  console.log(set);
});

// NOTE map() method loop array and give us brand new array
const movementsMap = [200, 450, -400, 3000, -650, -130, 70, 1300];
const ngnToUsd = 0.0006;
const movementsUsd = movementsMap.map((movement) => movement * ngnToUsd);
console.log(movementsMap);
console.log(movementsUsd);

const movementsDescriptions = movementsMap.map(
  (movement, index, array) =>
    `Movement ${index + 1}: You ${
      movement > 0 ? "deposited" : "withdrew"
    } ${Math.abs(movement)}`
);
console.log(movementsDescriptions);

// NOTE filter() return new array based on certain conditions
const deposits = movements.filter((movement) => movement > 0);
console.log(deposits);

const withdrawals = movements.filter((movement) => Math.abs(movement < 0));
console.log(withdrawals);

// NOTE reduce() boild (reduces) all array elements down to one single value (e.g adding all elements together)
const balance = movements.reduce(
  (accumulator, curVal, index) => accumulator + curVal,
  0
);
console.log(balance);

console.log("accumulation with for of");
let balance2 = 0;
for (const movement of movements) balance2 += movement;
console.log(balance2);

// #: another reduce() example
// maximum value
const max = movements.reduce((accumulator, movement) => {
  if (accumulator > movement) return accumulator;
  else return movement;
}, movements[0]);
console.log(max);

const min = movements.reduce((accumulator, movement) => {
  if (accumulator < movement) return accumulator;
  else return movement;
}, movements[0]);
console.log(min);

// NOTE magic of chaining methods
const totalDepositsUSD = movements
  .filter((movement) => movement > 0)
  .map((movement) => movement * ngnToUsd)
  .reduce((accumulator, movement) => accumulator + movement, 0);
console.log(totalDepositsUSD);

// NOTE the find() method
const firstWithdrawal = movements.find((movement) => movement < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(
  (account) => account.owner === "Abdullahi Auwal Haruna"
);
console.log(account);
for (const account of accounts) {
  if (account.owner.includes("Abdullahi Auwal Haruna")) console.log(account);
}

// NOTE some()
console.log(movements);

// #: equality
console.log(movements.includes(-130));

// #: condition
const anyDeposits = movements.some((movement) => movement > 5000);
console.log(anyDeposits);

// NOTE every()
console.log(movements.every((movement) => movement > 0));
console.log(account4.movements.every((movement) => movement > 0));

// Separate callback
const deposit = (movement) => movement > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// flat()
const arr3 = [[0, 1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arr3.flat());

const arr3Deep = [[[[0, 1], 2], 3], [4, 5, 6], 7, 8, 9];
console.log(arr3Deep.flat(3));

const accountMovements = accounts.map((account) => account.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overralBalance = allMovements.reduce(
  (accumulator, movement) => accumulator + movement,
  0
);
console.log(overralBalance);

// flatMap()
const overralBalance2 = accounts
  .flatMap((account) => account.movements)
  .reduce((accumulator, movement) => accumulator + movement, 0);
console.log(overralBalance2);

// sort() #: it mutate, and only works for strings
const owners = ["Abdullahi", "Taofeeq", "Abdulsamad", "Jamiu"];
console.log(owners.sort());
console.log(owners);

// if we want to use numbers, we have to use callback function
// #: returning < 0 will result A, B (keep order)
// #: returning > 0 will result B, A (switch order)

// Ascending order
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements);

// Descending order
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(movements);

// Programmatically creating arrays
const x = new Array(7);
console.log(x);

// #: Array.from()
const y = Array.from({ length: 10 }, () => 1);
console.log(y);

const z = Array.from({ length: 10 }, (curVal, index) => index);
console.log(z);

// Creating date
const now = new Date();
console.log(now);
//
console.log(new Date("Sat Aug 17 2024 11:29:3"));
//
console.log(new Date("August 17"));
//
console.log(new Date(account1.movementsDates[0]));

// date methods get
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.getMilliseconds());
console.log(future.getTime());
console.log(future.toISOString());

console.log(new Date(2142253380000));
console.log(Date.now());

// date methods set
future.setFullYear(2040);
console.log(future);

// Operations with dates
const calcDaysPassed = (date1, date2) => date2 - date1 / (1000 * 60 * 60 * 24);
calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
