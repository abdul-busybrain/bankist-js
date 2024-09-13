"use strict";

////////////////////////////////////////////////
// BANKIST APP

////////////////////////////////////////////////
// #: Data
const account1 = {
  owner: "Abdullahi Auwal Haruna",
  movements: [2909900, 4999809, -500000, 3990, 65898, 1999, 79999, 13099999],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2024-08-10T14:43:26.374Z",
    "2024-08-15T18:49:59.371Z",
    "2024-08-16T12:01:20.894Z",
  ],
  currency: "NGN",
  locale: "en-NG",
};

const account2 = {
  owner: "Abdulrasaq Taofeeq",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Ibrahim Tijjani",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "NGN",
  locale: "en-NG",
};

const account4 = {
  owner: "Jami'u Salihu",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "NGN",
  locale: "en-NG",
};

const accounts = [account1, account2, account3, account4];

// #: label Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

// #: container ELements
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

// #: button ELements
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

// #: input ELements
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

////////////////////////////////////////////////
// #: Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const moves = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  moves.forEach(function (movement, index) {
    const movementType = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.movementsDates[index]);
    const displayDate = formatMovementDate(date, "en-NG");
    const formattedMovement = formatCurrency(
      movement,
      account.currency,
      account.locale
    );
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
    <div class="movements__date">${displayDate}</div>

    <div class="movements__value">${formattedMovement}</div>
    </div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce(
    (accumulator, movement) => accumulator + movement,
    0
  );
  labelBalance.textContent = formatCurrency(
    balance,
    account.currency,
    account.locale
  );
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((movement) => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);
  labelSumIn.textContent = formatCurrency(
    incomes,
    account.currency,
    account.locale
  );

  const out = account.movements
    .filter((movement) => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    account.currency,
    account.locale
  );

  const interest = account.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest, _, array) => {
      return interest >= 1;
    })
    .reduce((accumulator, interest) => accumulator + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    account.currency,
    account.locale
  );
};

const createUsernames = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (account) {
  //  Display movements
  displayMovements(account);

  // Display balance
  calcDisplayBalance(account);

  // Display summary
  calcDisplaySummary(account);
};

const startLogoutTimer = function () {
  const tick = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    //  In each call, print the remaining time to the UI
    labelTimer.textContent = `${minute}:${second}`;

    //  When 0 seconds stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    // Descrease 1s
    time--;
  };
  //  TODO Set  time to 5 minutes
  let time = 300;

  //  Call the timer every seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

////////////////////////////////////
// #: Event handlers
let currentAccount, timer;

// Fake always LOGGED in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      // weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat("en-NG", options).format(
      now
    );

    // day/mon/year
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // const year = now.getFullYear();

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);

    startLogoutTimer();

    // Updating UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date());
    receiverAccount.movementsDates.push(new Date());

    // Updating UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((movement) => movement >= amount / 10)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update Ui
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
