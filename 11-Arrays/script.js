'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Renan Freire',
  movements: [],
  interestRate: 1,
  pin: 5678,
};

const accounts = [account1, account2, account3, account4, account5];

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

let userLoggedIn

const displayMovements = function(movements, sort = false){
  const movs = sort == true ? movements.slice().sort((a,b) => a-b) : movements

  containerMovements.innerHTML = ''
  
  movs.forEach((mov, i) => {

    const movType = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movType}">${i + 1} ${movType}</div>
      <div class="movements__date">2 days ago</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}
const createUsernames = function(accs){
accs.forEach(acc => {
  acc.username = acc.owner.toLowerCase().split(' ').map(name => name.charAt(0)).join('')
  })
}
createUsernames(accounts)

const calcDisplayBalances = function(movements) {
  const balance = movements.reduce( (acc,cur) => acc+cur, 0)

  labelBalance.textContent = `${balance}€`
}

const calcDisplaySummary = function(movements){
  const totalIncomes = movements.filter(mov => mov > 0).reduce( (acc,cur) => acc+cur, 0)
  const totalOuts = movements.filter(mov => mov < 0).reduce( (acc,cur) => acc+cur, 0)
  
  const totalInterest = movements
  .filter(mov => mov > 0)
  .map(deposit => deposit * 0.012)
  .filter((int) => int >= 1)
  .reduce( (acc,cur) => acc + cur, 0)

  labelSumIn.textContent = `${totalIncomes.toFixed(2)}€`
  labelSumOut.textContent = `${Math.abs(totalOuts).toFixed(2)}€`
  labelSumInterest.textContent = `${totalInterest.toFixed(2)}€`
}

const loginAccount = function() {
  const username = inputLoginUsername.value
  const userPin = inputLoginPin.value
  
  const alreadyExistsUser = accounts.find(acc => acc.username == username)
  
  if(alreadyExistsUser && alreadyExistsUser.pin == userPin) {
    console.log('user logged');
    containerApp.style.opacity = '1'
    labelWelcome.textContent = `Hello, ${alreadyExistsUser.owner.split(' ')[0]}`

    updateUI(alreadyExistsUser)

    userLoggedIn = alreadyExistsUser.username

  } else {
    alert('user not found or pin invalid');
  }

  inputLoginUsername.value = ''
  inputLoginPin.value = ''
}

const transferMoneyToAccount = function() {
    const userReceiver = accounts.find(acc => acc.username == inputTransferTo.value)
    const amountSent = Number(inputTransferAmount.value)

    const userSend =  accounts.find(acc => acc.username == userLoggedIn)
    const userBalance = userSend.movements.reduce( (acc, bal) => acc + bal, 0)

    if(amountSent < 1){
      alert('Amount Invalid')
      return
    }

    if(!userReceiver){
      alert('user not found')
      return
    }

    if(userReceiver == userLoggedIn){
      alert('You cannot send money to yourself')
      return
    }

    
    if(userBalance < amountSent){
      alert('Amount greater than balance')
      return
    }

    userSend.movements.push(amountSent * -1)
    userReceiver.movements.push(amountSent)

    inputTransferAmount.value = inputTransferTo.value = '';
  
    updateUI(userSend)
}

const requestLoan = function(){
  const userRequested = accounts.find(acc => acc.username == userLoggedIn)

  if(!userRequested.movements.some(mov => mov >= Number(inputLoanAmount.value) * 0.1)){
    alert('Get more points first, before a get loan')
    return
  }
  userRequested.movements.push(Number(inputLoanAmount.value))

  updateUI(userRequested)

  inputLoanAmount.value = ''
}

const userCloseAccount = function(){
    const userToDeleted = accounts.find(acc => acc.username == inputCloseUsername.value)
    
    if(!userToDeleted || userToDeleted.username != userLoggedIn){
      alert('user not found')
      return
    }  
  
    console.log(inputClosePin.value);

    if(userToDeleted.pin != inputClosePin.value){
      alert('pin invalid')
      return
    }

    accounts.splice(accounts.findIndex(acc => acc.username == userToDeleted.username), 1)
    
    userLogout()    
}

const userLogout = function(){
  userLoggedIn = ''

  containerMovements.innerHTML = ''
  calcDisplayBalances([])
  calcDisplaySummary([])

    containerApp.style.opacity = '0'
    labelWelcome.textContent = `Log in to get started`
}

const updateUI = function(acc){
  const accMovements = acc.movements

  displayMovements(accMovements)
  calcDisplayBalances(accMovements)
  calcDisplaySummary(accMovements)
}



btnLogin.addEventListener('click', loginAccount)
btnTransfer.addEventListener('click', transferMoneyToAccount)
btnClose.addEventListener('click', userCloseAccount)
btnLoan.addEventListener('click', requestLoan)


let sorted = false;
btnSort.addEventListener('click', function(){
  const userMovements = accounts.find(acc => acc.username == userLoggedIn).movements
  displayMovements(userMovements, !sorted)
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// let arr = ['a', 'b', 'c', 'd', 'e']

// // SLICE - not changes original ARRAY
// console.log(arr.slice(2))
// console.log(arr.slice(0,2))
// console.log(arr.slice(-1))
// console.log(arr.slice()) // Repeat Array - same result than rest operator(...arr)
// console.log([...arr])

// // SPLICE - change original ARRAY
// console.log(arr.splice(2, 1))
// console.log(arr)

// // REVERSE - change orinal ARRAY
// arr = ['a', 'b', 'c', 'd', 'e']
// const arr2 = ['j', 'i', 'h', 'g', 'f']
// console.log(arr2.reverse())
// console.log(arr2)

// // CONCAT - not changes original ARRAY
// const letters = arr.concat(arr2)
// console.log([...arr, ...arr2]) // concat - same result as above 
// console.log(letters)

// // JOIN - not changes original ARRAY
// console.log(letters.join(' - '))

// // NEW METHOD
// const newArr = [23, 11, 54, 92, 42]

// console.log(newArr[0])
// console.log(newArr.at(0));

// // same as using brackets, but for get LAST element in array, its more practical
// // getting last element in array, in different ways
// console.log(`Last element using Brackets: ${newArr[newArr.length - 1]}`)
// console.log(`Last element using slice method: ${newArr.slice(-1)[0]}`)
// console.log(`Last element using at method: ${newArr.at(-1)}`)


// // at method, get last element in string 
// console.log('renan'.at(0))
// console.log('renan'.at(-1))

// // -----------

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // FOR METHOD
// console.log('for ----------')
// for(const movement of movements){
//   if(movement > 0){
//     console.log('You deposited ' + movement)
//   } else{
//     console.log('You withdraw ' + Math.abs(movement))
//   }
// }

// // FOREACH METHOD
// console.log('forEach ----------')
// movements.forEach((mov, i, arr) => console.log((mov > 0 ? 'You deposited' : 'You Withdraw') + ' ' + Math.abs(mov)))

// // -- 
// // forLoop : enable break and continues
// // forEach : not enable break and continues
// // use this context for decide which use


// // ---------

// // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
//   ['BRL', "Real Brasileiro"]
// ]);

// currencies.forEach(function(value, key, map){
//     console.log(`${key}: ${value}`)
// })

// // Set

// const currenciesUnique = new Set(['USD', 'BRL', "EUR", "BRL", "USD", "GBP"])

// currenciesUnique.forEach((val, _, set) => {
//   console.log(`${val}: ${val}`)
//   console.log(set)
// })

// // Coding Challenge #1

// /* 
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// const dogsJulia = [9, 16, 6, 8, 3]
// const dogsJuliaAdjust = dogsJulia.slice(1, -2)

// const dogsKate = [10, 5, 6, 1, 4]


// function checkDogs(dogs) {
//   dogs.forEach((dogAge, i) => {
//     const message = `Dog number ${i + 1} ${dogAge > 3 ? `is an adult, and is ${dogAge} years old` : "is still a puppy 🐶"}`
//     console.log(message)
//   })
// }
// console.log("---- Julia")
// checkDogs(dogsJuliaAdjust)
// console.log("---- Kate")
// checkDogs(dogsKate)

// const usdToEur = 0.94;

// const eurMovements = movements.map(mov => mov * usdToEur)

// console.log(movements);
// console.log(eurMovements);


// function convertEuro(mov) {
//   console.log(mov)
//   const converted = mov.map((values) => Number((values * 0.94).toFixed(2)))
//   console.log(converted)

//   displayMovements(converted)
// }

// convertEuro(account1.movements)

// const deposits = movements.filter(mov => mov > 0)
// const withdraws = movements.filter(mov => mov < 0)


// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

//   return average;
// };
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const averageLifeDogs = ages
//   .map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   .filter(age => age >= 18)
//   .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0) 

//   console.log(averageLifeDogs)
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])


// // Every and Some
// console.log(movements)
// console.log(movements.every(mov => {
//   console.log(mov)
//   return mov < 1300
// }))
 
// Flat and FlatMap

// const aNarr = [[1,2,3], [4,5,6], 7,8]
// console.log(aNarr.flat());
// console.log(aNarr.flatMap(item => item));


// return < 0 (keep order)
// return > 0 (switch order)
// // Ascending
// console.log(movements.sort((a,b) => a>b?1:-1))
// console.log(movements.sort((a,b) => a-b))

// //Descending
// console.log(movements.sort((a,b) => a>b?-1:1))
// console.log(movements.sort((a,b) => b-a))

console.log([1,2,3,4,5,6,7]);
console.log();

const testFill = [100,0,0,0,0,0,0]
testFill.fill(2)

console.log(testFill);


// Empty Array + Fill method
const tArr = new Array(7)
tArr.fill(2)
tArr.fill(1, 2, 4)
console.log(tArr);

// Array.from

const y = Array.from({length: 6}, (value,i) => Math.trunc(Math.random() * 60) + 1)
const o = Array.from(movements, (value,i) => value)
console.log(y.sort((a,b) => a-b));
console.log(o);

const movRowArr = Array.from(document.querySelectorAll('.movements__row'))

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  { weight: 32, curFood: 100, owners: ['Renan'], recommendedFood: 100}
];

// 1
dogs.forEach(function(dog){
  if(!dog.recommendedFood){
    dog.recommendedFood = dog.weight ** 0.75 * 28
  }
  dogEatRecommendedPortions(dog)
})

// 2
const dogSarah = dogs.find(dog => {
  if(dog.owners.includes('Sarah')){
    return dog
  }
});

function dogEatRecommendedPortions(dog){
  // Okay
  if(dog.curFood * 1.10 > dog.recommendedFood && dog.curFood * 0.9 < dog.recommendedFood){
    dog.statusFood = 'okay'
    return
  }
  // Above
  if(dog.curFood > dog.recommendedFood){
    dog.statusFood = 'too much'
    return
  }
  // Below
  else if(dog.curFood < dog.recommendedFood){
    dog.statusFood = 'too little'
    return
  }
}

const ownersEatTooMuch = dogs.filter(dog => dog.statusFood == 'too much').flatMap(dog => dog.owners)

const ownersEatTooLittle= dogs.filter(dog => dog.statusFood == 'too little').flatMap(dog => dog.owners)

const ownersEatOkay= dogs.filter(dog => dog.statusFood == 'okay').flatMap(dog => dog.owners)

console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`)
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little!`)
console.log(`${ownersEatOkay.join(' and ')} dogs eat recommended!`)

//5
console.log('----------')
dogs.forEach(dog => console.log(`${dog.owners.join(' and ')} dog eat ${dog.statusFood}`))


//8
const dogFoodAscending = dogs.sort((a,b) => a.recommendedFood-b.recommendedFood)

console.log(dogFoodAscending);
