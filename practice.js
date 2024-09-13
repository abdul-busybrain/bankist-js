// Array methods practice

// Total number of deposits in the bank
const bankDepositSum = accounts
  .flatMap((account) => account.movements)
  .filter((movement) => movement > 0)
  .reduce((accumulator, movement) => accumulator + movement, 0);
console.log(bankDepositSum);

// Number of Deposit 1000
const numDeposits1000 = accounts
  .flatMap((account) => account.movements)
  .filter((movement) => movement >= 1000).length;
console.log(numDeposits1000);

// Create an object of the deposits and the withdrawals
const sums = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (accumulator, curVal) => {
      curVal > 0
        ? (accumulator.deposits += curVal)
        : (accumulator.withdrawals += curVal);
      return accumulator;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// Convert string to tittleCase
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  const tittleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return capitalize(tittleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title, but TOO long"));
