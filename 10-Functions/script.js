'use strict';

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}
const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ')
    console.log(first, ...others);
    
    return [first.toUpperCase(), ...others].join(' ')
}

// Higher-order function
const transform = function (str, fn){
    console.log(`Original string: ${str}`);
    console.log(`Transformed String: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
}
transform("JavaScript is the best!!!", oneWord)
transform("JavaScript is the best!!!", upperFirstWord)

//JS uses callbacks all the time

const boom = function(){
    console.log('🧨... 💥');   
}

// document.body.addEventListener('click', boom)

 function greet(greeting){
    return function (name){
        console.log(`${greeting} ${name}`);
    }
}

const greeting = greet('Hi')
greeting('Jonas')
greeting('Renan')
greeting('Kaiky')

// or
greet('Hey')('Hugo') // Fica mais estranho mais funciona

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hello')('Roger')


// ------------

const airlines = {
    lufthansa: {
        airline: 'Lufthansa',
        iataCode: 'LH',
        bookings: [],
    },
    eurowings: {
        airline: 'Eurowings',
        iataCode: 'EW',
        bookings: [],
    },
    swiss: {
        airline: 'Swiss',
        iataCode: 'SW',
        bookings: [],
    },
    gol: {
        airline: 'Gol',
        iataCode: 'G',
        bookings: [],
    },
    azul: {
        airline: 'Azul',
        iataCode: 'A',
        bookings: [],
    }
}
const airlinesArr = Object.keys(airlines)
console.log(airlinesArr);
airlinesArr.forEach((element) => {
    document.querySelector('#airline').innerHTML += `<option value='${element}'>${element.slice(0,1).toUpperCase() + element.slice(1)}</option>`
})

function book(name, seatCode){ 
    console.log(`${name} booked a seat on ${this.airline} flight: ${this.iataCode}${seatCode}`);
    this.bookings.push({flight: `${this.iataCode}${seatCode}`, name: name })
}

// call method
// call method run function with atribute this be the first argument;
book.call(airlines.lufthansa,'Sarah Willians', 23)
book.call(airlines.lufthansa,'Renan Gomes', 963)
book.call(airlines.eurowings,'Jonas schmedtmann', 633)

console.log(airlines.lufthansa);
console.log(airlines.eurowings);

// apply method
// apply method run function with atribute this be the first argument, but last arguments are array;
book.apply(airlines.swiss, ['Roger Williams', 543])

const flight = airlines['eurowings'] 

const flightData = [['Mary', 23], ['Hugo', 99], ['Lucas', 97], ['Tutu', 32]]
for(let seatData of flightData) {
    book.call(flight, ...seatData)
}
console.log(airlines.swiss);

// bind method
// bind method return a function with atribute this be the first argument;
const bookEW = book.bind(airlines.eurowings);
const bookEW24 = book.bind(airlines.eurowings)
bookEW('Mary', 23)

// with Event Listener
const lufthansa = {
    planes: 300,
    buyPlanes(){
    this.planes++     
    console.log(`now lufthansa have ${this.planes} planes`);
    }
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlanes.bind(lufthansa))

// Partial application

// with bind
// const addTax = (rate, value) =>  value + value * rate;
// console.log(addTax(0.1, 200));

// const addVat = addTax.bind(null, 0.23)
// // addVat = value => value + value * 0.23

// console.log(addVat(100));


// with function return function

const addTax = function(rate){
    return function (value){
        return value + value * rate;
    }
}

const addVat = addTax(0.23);
console.log(addVat(100));

// console.log(addTax(0.23)(100));


// const addTaxArr = (rate) => (value) => value + value * rate;

// const addVatArr = addTax(0.23)

// console.log(addVatArr(100));


// ----- Challenge #1
console.log('------ Challenge #1');

const answerButton = document.querySelector('.poll')

const poll = {
    question: 'What is your favorite programming language?',
    options: ["0: JavaScript\n"," 1: Python \n", " 2: Rust \n", " 3: C++"],
    answers: new Array(4).fill(0),
    registerNewAnswer(arr){
        let answer = prompt(`${this.question} \n ${String(this.options).replaceAll(',', '')}`)
        let NumAnswer = Number(answer)
        if(answer == '' || Number.isNaN(NumAnswer) || NumAnswer < 0 || NumAnswer > 3){
            alert(`Please enter a valid answer`)
        }else{ if(this.answers[answer] !== undefined){
            this.answers[answer]++
            this.displayResult() 
            this.displayResult('string') 
        }     
    }
    },
    displayResult(type = 'array'){
        if(type == 'array'){
            console.log(this.answers);
        }else if(type == 'string'){
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
        
    }
}
console.log(poll.answers[0][1]);

answerButton.addEventListener('click', poll.registerNewAnswer.bind(poll))
poll.displayResult.bind({answers: [0,2,5]})()
poll.displayResult.call({answers: [1, 5, 3, 9, 6, 1]}, 'string');

//IIFE
(function(){
    console.log('Lugin'); 
})();

const secureBooking = function(){
    let passengerCount = 0;
    console.log('herllo');
    return function(){
        passengerCount++
        console.log(`${passengerCount} passengers... `);
        
    }
}
const booker = secureBooking()

booker();

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  let color = 'red'
  header.style.color = color;
  
  document.querySelector('body').addEventListener('click', function() {
    color == 'red' ? color = 'blue' : color = 'red'
    header.style.color = color
  })
})();