"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Kumar Saurav",
  movements: [200, 450, -400, 30000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Inderjit Shahi",
  movements: [5000, 3400, -150, 790000, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2001,
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
  locale: "hi",
  currency: "INR",
};

// const account3 = {
//   owner: "Kumar Saurav",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 2000,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// currency:'USD',
// };

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formattedMov = (bal, curr, locale) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: curr,
  }).format(bal);
const displayMovements = function (acc, sorted = false) {
  containerMovements.innerHTML = ""; //emptying previous data of movements

  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    let type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);

    const html = `  
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${date
            .getDate()
            .toString()
            .padStart(2, 0)}-${date
      .getMonth()
      .toString()
      .padStart(2, 0)}-${date.getFullYear()}</div>
          <div class="movements__value">${formattedMov(
            mov,
            acc.currency,
            acc.locale
          )}</div>
        </div>
    `; //creating html literal

    containerMovements.insertAdjacentHTML("afterbegin", html); //inserting new html afterbegin
  });
};

const createUserName = function (accs) {
  //creating user name for each account
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUserName(accounts);

const calBalanaceDisplay = function (accs) {
  accs.balance = accs.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `  ${formattedMov(
    accs.balance,
    accs.currency,
    accs.locale
  )}`;
};

const calDisplaySummary = function (accs) {
  const incomes = accs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = ` ${formattedMov(
    incomes,
    accs.currency,
    accs.locale
  )}`;
  const outBal = Math.abs(
    accs.movements.filter((mov) => mov < 0).reduce((acc, curr) => acc + curr, 0)
  );
  labelSumOut.textContent = `${formattedMov(
    outBal,
    accs.currency,
    accs.locale
  )}`;
  const Interest = accs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + (mov * accs.interestRate) / 100, 0);
  labelSumInterest.textContent = ` ${formattedMov(
    Interest,
    accs.currency,
    accs.locale
  )}`;
};

const updateUI = function (acc) {
  //Display movements
  displayMovements(currentAccount);
  //Display Balance
  calBalanaceDisplay(currentAccount);
  //Display Summary
  calDisplaySummary(currentAccount);
};
//Event Handlers
let currentAccount, timer;

const startLogOutTimer = function () {
  let t = 300;
  ////set timmer for 5 mim
  ////call the timer every second
  const tick = function () {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    labelTimer.textContent = `${min.toString().padStart(2, 0)}:${sec
      .toString()
      .padStart(2, 0)}`;
    t--;
    if (t < 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
  };

  tick();
  if (timer) clearInterval(timer);
  timer = setInterval(tick, 1000);
  return timer;
  ////after 5 second log out the user
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin == Number(inputLoginPin.value)) {
    //Display UI and Welcome Method
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    startLogOutTimer();
    updateUI(currentAccount);
  }
  //setting present Date
  labelDate.textContent = new Intl.DateTimeFormat("hi-IN", {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount.userName !== currentAccount.userName &&
    receiverAccount
  ) {
    //dping the transfer
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
    //Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    //
    clearInterval(timer);
    timer = startLogOutTimer();
    //updating UI
    updateUI(currentAccount);
  }
});

//bank only guaratee loan if has a deposit of 10% of th requested loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 10)
  ) {
    setTimeout(function () {
      //Add the amount to currentAccount
      currentAccount.movements.push(amount);
      // Add Loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //Update UI
      clearInterval(timer);
      timer = startLogOutTimer();
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName == currentAccount.userName
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 0, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd=1.5;
// const movementsUsd= movements.map(mov=>  mov*euroToUsd
// ); //using map method of arrays.
// console.log(movementsUsd,movements);
////////////////////////filter method//////////////////////////
// const withdraw=movements.filter(mov=>mov<0);
// console.log(movements,withdraw);

////////////slice method/////////////////////////////////////////

// let arr=['a','b','c','e','g'];
// console.log(arr.slice(0,-1));  ///dont affect origibnal array,give new array
// const newArr=[...arr];
// console.log( newArr);
// console.log(arr.slice(1,4));
// console.log(arr.splice(1,4));
// console.log(arr);
/////////REVERSE
// console.log(arr.reverse());
// console.log(arr.join(' @ '));
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.join('_'));
// console.log(movements);
// for (const [index,movement] of movements.entries()) { //for_of_loop
//     if(movement>0)console.log(`you deposited ${movement}` );
//     else console.log(`you withdraw ${Math.abs(movement)}`);
// }

// movements.forEach(function(movement,index,order){
//   if(movement>0)console.log(`you deposited ${movement}` );
//    else console.log(`you withdraw ${Math.abs(movement)}`);
// });
///////////////////////////////////////////////////////////////
//Pipeline
// const euroToUsd = 1.5;
// const totalDepositInUsd=movements.filter((mov) => mov > 0).map((mov) => mov * euroToUsd).reduce((acc,mov)=>acc+mov,0);
// console.log(totalDepositInUsd,movements);

// const firstwithdraw=movements.find(mov=> mov<0)
// console.log(firstwithdraw);

//////////////////flat////////////////////
// const accounMovements=accounts.map(acc=>acc.movements)
// console.log(accounMovements.flat());
// const overalBalance=accounts.map(acc=>acc.movements).flat().reduce((acc,mov)=>acc+mov,0);
// console.log(overalBalance);

//////////////////sorting//////////////////////////////////////
// console.log(movements.sort((a,b)=>{
//   if(a>b) return 1;
//   else return -100;
// }));
// const z=Array.from({length:100},()=>Math.round(Math.random(6)*(6-1)+1))
// console.log(z);

////////////////////Numbers///////////////////////////////
// console.log(0.1+0.2==0.3);
// console.log(0.1+0.2);
// const a='20';
// console.log(typeof(a),typeof(+a));

// //parsing
// console.log(Number.parseInt('2378b767'));
// console.log(32**(1/5));
// // const arr={23,4,55,6,56,545,6,46,7};
// // console.log(Math.max(arr));
// const randomInt=(max,min)=>Math.floor(Math.random()*(max-min))+min;
// console.log(randomInt(10,1));
// console.log((20.3).toFixed(5));

////////////////////////BigInt/////////////////////////////////
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(19896868n**10n);
// console.log(20n==20);

//////////////Create A date////////////////////////////////////
// const now=new Date();
// console.log(now);
// console.log(new Date('December 24,2021')); //js parsing string into date
// console.log(new Date('2022-12-3,23:34:4'));
// console.log(new Date(2034,1,1,19,34,4)); //month start from 0
// console.log(now.getFullYear());

// const calcDaysPassed = (date1, date2) =>
//   Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
// console.log(calcDaysPassed(new Date(), new Date(2020, 11, 10)));
// console.log(new Intl.DateTimeFormat("IN").format(new Date()));

///////////////internationalization of Numbers///////////////////
// const num = 232324.435;
// const options = {
//   style: "currency",
//   currency: "INR",
// };
// console.log(new Intl.NumberFormat("en", options).format(num));

//////////////////Timers/////////////////////////////////////////
// setTimeout(()=>console.log('hello world'),10000);

// setInterval((i)=>{
//   console.log(i++);
// },1000,1);
