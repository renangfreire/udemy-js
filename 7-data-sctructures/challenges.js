'use strict'

// // CHALLENGE 1 && CHALLENGE 2
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//   [
//   'Neuer',
//   'Pavard',
//   'Martinez',
//   'Alaba',
//   'Davies',
//   'Kimmich',
//   'Goretzka',
//   'Coman',
//   'Muller',
//   'Gnarby',
//   'Lewandowski',
//   ],
//   [
//   'Burki',
//   'Schulz',
//   'Hummels',
//   'Akanji',
//   'Hakimi',
//   'Weigl',
//   'Witsel',
//   'Hazard',
//   'Brandt',
//   'Sancho',
//   'Gotze',
//   ],
//   ],
//   score: '3:1',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
//   'Hummels', 'Akanji'],
//   date: 'Nov 9th, 2037',
//   odds: {
//   team1: 1.33,
//   x: 3.25,
//   team2: 6.5,
//   },
//   };


// const {players: [players1, players2]} = game
// const team1 = createTeam(...players1);
// const team2 = createTeam(...players2);
// const allPlayers = [...players1, ...players2]
// team1['playersFinal'] = [...players1, 'Thiago', 'Coutinho', 'Perisic']
// const {odds: {team1:oddTeam1, x: oddDraw, team2:oddTeam2}} = game

// function createTeam(...players){
//   const [gk] = players
//   const [, ...fieldPlayers] = players
//   return {
//     gk: gk,
//     fieldPlayers: fieldPlayers
//   }
// }

// function printGoals(...goals){
//   let index, player
//   for(let i = 0; i < goals.length; i++){
//     index = goals.indexOf(goals[i]) + 1;
//     player = goals[i]

//     console.log(`Goal ${index}: ${player}`);
//   }
//   console.log(`in the game ${goals.length} goals were scored`);
// }


// // console.log(allPlayers);
// // console.log(team1);
// // console.log(team2);
// // console.log(oddTeam1);
// // console.log(oddTeam2);
// // console.log(oddDraw);

// // Challenge 1 - task 6 && challenge 2 - task 1
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich', 'Thiago')
// printGoals(...game.scored)

// // // Challenge 2 - task 2
// const odds = Object.entries(game.odds)
// // let total = 0
// // for(const [key, value] of odds){
// //  total += value
// // console.log(total)
// // }
// // const average = total/odds.length
// // console.log(average);

// // Challenge 2 - task 3
// function printOdds(){
//   let printStr
// for(const [team, odd] of odds){
//   console.log(team, odd);
//   printStr = team == 'x' ? 'draw' : `victory ${game[team]}`
//   console.log(`Odd of ${printStr}: ${odd}`);
  
// } 
// }

// printOdds()

// // Challenge 2 - task Bonus

// function gameScorers(...scores){
//   let scr = {team1: {}, team2: {}}
//   console.log(scores);
  
//   console.log(players1);
  
//   for(const player of scores){
      
//       if(players1.includes(player)){
//       scr.team1[player] ? scr.team1[player]++ : scr.team1[player] = 1 
//     }else{
//       scr.team2[player] ? scr.team2[player]++ : scr.team2[player] = 1 
//     }
//   }

//  console.log(Object.keys(scr).length);
//   return scr

// }
// const scorers = gameScorers(...game.scored)

// console.log(scorers);


// function testSet() {
//   let arr = []
//   for(let i = 0; i < 10; i++){
//      arr.push(Math.trunc(Math.random() * 6) + 1)
//   }
//   const arrSet = new Set(arr)
//   console.log(arr);
//   console.log(arrSet);
  
//   console.log(arrSet.has(5));
// }
// testSet()


// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!']
// ]);

// console.log(question.get('question'));
// for(const [key, value] of question){
//   if(typeof key === 'number') 
//   console.log(`Answer ${key}: ${value}`);
// }
// const answer = 3;
// // const answer = Number(prompt('your answer'))
// console.log(question.get(question.get('correct') === answer));

// console.log(...question);
// console.log(...question.keys());
// console.log(...question.values());


// // Challenge #3
// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '🔃 Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '🔃 Substitution'],
//   [64, '🟨 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔃 Substitution'],
//   [72, '🔃 Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '🟨 Yellow card']
//   ])

// const [...events] = new Set(gameEvents.values())

// console.log(`what events type happened in the game ${events}`);

// gameEvents.delete(64);
// console.log(gameEvents);

// console.log(`An event happened, on average, every ${[...gameEvents.keys()][gameEvents.size-1] / gameEvents.size} minutes`);

// for(const [key, value] of gameEvents){
//   const str = key<45 ? '[First half]' : '[Second half]'
//   console.log(`${str}${key}: ${value}`);
  
// }





let airline = '24KB Air Plane'
const plane = 'A320'


console.log('------------ get char');

console.log(plane[0]);
console.log('B737'[0])
// or
console.log(plane.charAt(0))

console.log('------------ get length');

console.log(airline.length);
console.log('B737'.length);


console.log('------------ get index');
console.log(airline.indexOf('i'))

console.log('------------ slice');
console.log(airline.slice(0,2));

// Fist word in the string
console.log(airline.slice(0, airline.indexOf(' ')));

// last word in the string

console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// if the number is negative it will extract from the final letters
console.log(airline.slice(-3));

function checkMiddleSeat(seat = 'string') {
  const s = seat.slice(-1)
  const message =  s == 'E' || s == 'B' ? 'got middle' : 'not got middle';
  return `you ${message} seat`

 // B and E are middle seats
};

console.log(checkMiddleSeat('11E'));
console.log(checkMiddleSeat('2C'));
console.log(checkMiddleSeat('15B'));

const email = 'hello@example.com';
const loginEmail = '   Hello@ExamPLE.com'
// const loginEmailLower = loginEmail.toLowerCase()
// const loginEmailTrim = loginEmailLower.trim()
// console.log(loginEmailTrim);

// trim remove blank space in init
const normalizedEmail = loginEmail.toLowerCase().trim()
console.log(normalizedEmail);

console.log(email == normalizedEmail ? 'hi' : 'not hi');

// replacing

console.log('------------ replace');

const priceGB = '288,98£'
const priceUS = priceGB.replace(',', '.').replace('£', '$')

console.log(priceGB);
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!'
console.log(announcement);
console.log(announcement.replaceAll('door', 'gate'));
// Replace all with regular expression
console.log(announcement.replace(/door/g, 'gate'));

// booleans
console.log('------------ booleans');

console.log(plane);

console.log(plane.includes('20'));
console.log(plane.includes('30'));

console.log(plane.startsWith('A'));
console.log(plane.startsWith('2'));

// Practice Exercise

function checkBaggage(items){
  const baggage = items.toLowerCase();
  const noAllowed = ['knife', 'gun', 'drugs'];
  let passenger
for(const notAllow of noAllowed){
   if(baggage.includes(notAllow)){
    passenger =  `you not been released, own a ${notAllow} `
    break
   }else{
    passenger = 'Welcome aboard!!'
   }
}
console.log(passenger);

}
checkBaggage('i Have a laptop, some food and a pocket kNife');
checkBaggage('Socks and cameras');
checkBaggage('Got some snacks and a gUn for protection');

// SPLIT and JOIN
console.log('------------ split and join');

console.log('A very nice string'.split(' '))
const [firstName, lastName] = 'Renan Gomes'.split(' ')

console.log(lastName, firstName);

console.log(['Mr.', firstName, lastName.toUpperCase()].join(' '));

function capitalizeName(name){ 
  const nameArr = name.split(' ')
  let organizedName = []
  console.log(nameArr);
  for(const n of nameArr){ 
    // organizedName.push(n[0].toUpperCase() + n.slice(1))
    organizedName.push(n.replace(n[0], n[0].toUpperCase()))
  }
  console.log(organizedName.join(' '));
  }

capitalizeName('jessica ann smith davis')
capitalizeName('jonas schmedtmann')
capitalizeName('renan gomes freire')

// padding
console.log('------------ padding');

const message = 'Go to gate 23!'

// const max = 50
// for(let i = message.length; i < max; i++){
//   console.log(message.padStart(i, '1+1'));
// }

console.log('Renan'.padStart(20, '-').padEnd(35, '---'));
console.log('Renan'.padEnd(20, '-'));

// mask credit card init numbers

function maskCreditCard(number){
  const str = String(number)
  console.log();
  
  console.log(str.slice('-4').padStart(str.length, '*'));
  
}

maskCreditCard(6250941006528599)

// repeat
console.log('------------ repeat');

const message2 = 'Bad weather... All Departures delayed \n'

const planesInLine = function(n){
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
  
}

console.log(message2.repeat(3));
planesInLine(5)
planesInLine(3)
planesInLine(6)

// challenge #4
document.querySelector('button').addEventListener('click', () =>{
  if(!document.querySelector('textarea').value.trim() == '') camelText()
}
)

function camelText(){
  const text = document.querySelector('textarea').value.trim().split('\n')
  let counter = 1;
  
  for(const value of text){  
    const lowerText = value.toLowerCase().trim().split('_')
    
    for(let i = 0; i < lowerText.length; i++){
      if(!i == 0){      
        const camelWord = lowerText[i].replace(lowerText[i][0], lowerText[i][0].toUpperCase())
        lowerText[i] = camelWord
      }
    };
  
    console.log(`${lowerText.join('').padEnd(25, ' ')}  ${'✅'.repeat(counter)}`);
    counter++
}}

// Challenge #5
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const infoFlights = []

for(const value of flights.split('+')){
  
  const getCode = code => code.replace(/[0-9]/g, '').toUpperCase()
  let [flightStatus, departure, arrival, hours] = value.split(';')
  hours = hours.replace(':', 'h')
  flightStatus = flightStatus.replaceAll('_', ' ')

  flightStatus.toLowerCase().includes('delayed') ? flightStatus = flightStatus.replace(' ', '🔴 ') :  flightStatus = flightStatus.slice(1)

  console.log(` ${flightStatus.padStart(20)} from ${getCode(departure)} to ${getCode(arrival)} (${hours})`);
  
}


