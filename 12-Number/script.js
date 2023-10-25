'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2022-07-28T09:15:04.904Z',
    '2022-08-01T10:17:24.185Z',
    '2022-09-08T14:11:59.604Z',
    '2023-01-04T17:01:17.194Z',
    '2023-01-13T23:36:17.929Z',
    '2023-01-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-01-12T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Renan Freire',
  movements: [3000, -2400, -120, -590, 2110, -1000, 4500, -30],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-01-12T12:01:20.894Z',
  ],
  currency: 'BRL',
  locale: 'pt-BR',
};

const accounts = [account1, account2, account3];

const convertCurrency = {
  'USD': 1,
  'EUR': 0.92,
  'BRL': 5.09
}

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovements = function(date, locale){  
  const calcDaysPassed = (date1, date2) => Math.trunc(Math.abs(date2 - date1) / 86400000);

  const daysPassed = calcDaysPassed(new Date(), date)

  if(daysPassed == 0) return 'Today'
  if(daysPassed == 1) return 'Yesterday'
  if(daysPassed <= 7) return `${daysPassed} day ago`
  if(daysPassed <= 14) return `Last Week`
    
  /*
  // reduce all this code, with one line, using native JS INTL api
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
     
    return `${day}/${month}/${year}`
    */
   const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

   return new Intl.DateTimeFormat(locale, options).format(date)

}

const formatCurrency = function(mov, locale, userCurrency){
    const convertUserCurrency = convertCurrency[userCurrency] * mov
  
    const options = {
      style: 'currency',
      currency: userCurrency
    }

    return Intl.NumberFormat(locale, options).format(convertUserCurrency)
}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i])
    const formattedDate = formatMovements(date, acc.locale)
    const formattedCurrency = formatCurrency(mov, acc.locale, acc.currency)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}
      </div>
      <div class="movements__date">${formattedDate}</div>
      <div class="movements__value">${formattedCurrency}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const startLogoutTimer = () => {
  let time = 300 // 5 minutes
  const tick = function(){
      const minutes = String(Math.trunc(time / 60)).padStart(2, '0')
      const seconds = String(time % 60).padStart(2, '0')
  
      labelTimer.textContent = (`${minutes}:${seconds}`)
  
      if(time == 0) {
        clearInterval(timer)
        userLogout()
      }

      time--
    }
    tick()
  const timer = setInterval(tick, 1000)

  return timer
}


const calcDisplayBalance = function (acc) {
  if(typeof acc == 'undefined'){
    labelBalance.textContent = '0'
    return
  }
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCurrency(acc.balance, acc.locale, acc.currency)}`;
};

const calcDisplaySummary = function (acc) {
  if(typeof acc == 'undefined'){
    labelSumIn.textContent = '0'
    labelSumOut.textContent = '0'
    labelSumInterest.textContent = '0'
    return
  }
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurrency(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurrency(out, acc.locale, acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCurrency(interest, acc.locale, acc.currency)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const updateDate = function(){
  const now = new Date(Date.now())
  const locale = currentAccount.locale

    // Update Date
    const options = {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(Date.now())
}

const userLogout = function(){
  currentAccount = ''

  containerMovements.innerHTML = ''
  calcDisplayBalance()
  calcDisplaySummary()

    containerApp.style.opacity = '0'
    labelWelcome.textContent = `Log in to get started`
}

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update Date
    updateDate()

    // Update UI
    updateUI(currentAccount);

    // if Already Exists another user
    if(timer){
      clearTimeout(timer);
    }
    // Launch Timer
    timer = startLogoutTimer()
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount);

    // if Already Exists another user
    if(timer){
      clearTimeout(timer);
    }
    // Launch Timer
    timer = startLogoutTimer()
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

  // if Already Exists another user
  if(timer){
    clearTimeout(timer);
  }
  // Launch Timer
  timer = startLogoutTimer()
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Conversion
// console.log(Number('23'));
// console.log(+'23')

// // Parsing
// console.log(Number.parseInt('20px'));
// console.log(Number.parseInt('e23'));

// console.log(parseInt(' 2.5rem   '));
// console.log(parseFloat(' 2.5rem   '));


// // Checking if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 /0 ));


// // Checking if value is number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
 
// console.log(Number.isFinite(20));
// console.log(Number.isFinite(20.0));
// console.log(Number.isFinite(20.2020320));
// console.log(Number.isFinite('20'));

// console.log(Math.sqrt(25));

// const nmbArr = [0,20,10,100,25,10000]
// console.log(Math.max(...nmbArr))
// console.log(Math.min(...nmbArr))

// const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min

// // Rounding integers
// // Remove decimal part
// console.log(Math.trunc(23.3));

// // Around to nearest integer
// console.log(Math.round(23.2));
// console.log(Math.round(23.9));

// // Around up
// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// //Around down to 23
// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));

// // If you need rounding negative numbers, using Math.floor knows that rounding DOWN
// // however, if use use -23.3, around for -24

// console.log(Math.floor(-23.3))
// // but trunc, so remove only decimal part
// console.log(Math.trunc(-23.3))
// console.log((2.3).toFixed(2))

// // Remainder Operator
// console.log(5 % 2) // 5 = 2*2 + 1 
// console.log(7 % 2) // 7 = 2*3 + 1
// console.log(8 % 3) // 8 = 3*2 + 2

// const isEven = (n) => n % 2 === 0;

// console.log(isEven(2));
// console.log(isEven(7));
// console.log(isEven(51928));
// console.log(isEven(51923));

// const bigNumber = 90319318931831737817381n;
// const bgChange = (nm) => {
//     const arrNumber = [...String(bigNumber )].reverse()

//     const numberSeparation = arrNumber.map((value, i) => {
//       console.log(i);
      
//       if(i == 0) {
//         return value
//       }
//       if((i+1) % 3 == 0){
//         return '.'+value
//       }
//       else {
//         return value
//       }
//     })

//   return numberSeparation.reverse().join('')
    
// }

// console.log(bgChange(bigNumber));
// console.log(bigNumber);

// // BigInt
// console.log(83183183781731371731737131)
// console.log(83183183781731371731737131n)

// // Operations
// // BigInt can only operations with bigInt
// console.log(100n + 100n)
// console.log(100000000000020n * 319319381n)
// // console.log(Math.sqrt(16n)) // DONT WORK

// const huge = 203901931332323281n;
// const num = 23;
// console.log(huge * BigInt(num))

// // Exceptions
// console.log(20n > 15)
// console.log(20n === 20)
// console.log(typeof 20n);
// console.log(20n == '20');

// console.log(huge + ' is REALLY BIG!!!');

// // Divisions
// console.log(10n / 3n);
// console.log(10 / 3);

// Create Date
// console.log(new Date());
// console.log(new Date('Aug 02 2025 18:10:20'));
// console.log(new Date('November 31 2025 18:10:20'));
// console.log(new Date(2032, 1, 10, 19, 41, 20));
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
// const future = new Date(2032, 1, 10, 19, 41, 20)

// console.log(new Date(future.getTime() + 3 * 86400000));

// console.log(+future)