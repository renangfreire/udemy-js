// // Challenge 1-2

// dont erase/comment strict
"use strict";

// const teams = {
//     'Dolphins':{
//         score: [
//             44,
//             23,
//             71
//         ],

//     },
//    'Koalas': {
//     score: [
//         65,
//         80,
//         49
//     ],

//    },
//    'Monkeys': {
//     score: [
//         49,
//         30,
//         90
//     ],
// },
//     'Valorant': {
//     score: [
//         39,
//         81,
//         70
//     ]
//     }
// }
// function calcScore(score){
//     let valueScore = 0;
//     for (let i = 0; i < score.length; i++){
//         valueScore += score[i]
//     }
//     return Number((valueScore / 3).toFixed(2))
// }

// function objectAVG(name){
//     teams[name]['avg'] = calcScore(teams[name].score)
// }

// //pegar nome dos times
// const arrayTeamNames = Object.keys(teams).map(function(key){
//     return key
// })
// // calc avg
// for(let i = 0; i < arrayTeamNames.length; i++){
//     objectAVG(arrayTeamNames[i])
// }
// // pegar avg
// const arrayTeamAVG = Object.values(teams).map(function(key){
//     return key.avg
// })
// // ordenar times
// function sortTeams(){
//     let arrayTeams = [];
//     for(let i = 0; i < arrayTeamNames.length; i++){
//         arrayTeams.push(
//             {team: arrayTeamNames[i], avg: arrayTeamAVG[i]}
//             )
//         }
//         arrayTeams.sort(function (a, b) {
//             return b.avg - a.avg;
//         })
//         return arrayTeams
// }

// const orderedTeams = sortTeams()

//     let podium = 1
//     for(let i = 0; i < orderedTeams.length; i++){
//         console.log(`o time que ficou em ${podium}° foi o ${orderedTeams[i].team} com ${orderedTeams[i].avg}`)
//         podium = podium + 1
//     }

//     // pegar os times, pegar os avg, comparar todos, e retornar o maior.

//     // quero fazer um script que encontre o time vencedor no meio do Object, sem que eu precise alterar algo no codigo, podendo adicionar mais times.
//     // fazer uma function, que ao adicionar o nome do objeto, ele vai fazer o calc da AVG

// // Challenge 3
// const peoples = {
//     mark:{
//         firstName: 'Mark',
//         lastName: 'Miller',
//         mass: Number('78'),
//         height: Number('1.69'),
//     },
//     john:{
//         firstName: 'John',
//         lastName: 'Smith',
//         mass: Number('92'),
//         height: Number('1.95'),

//     },
//     bmi(people) {
//         if(people != undefined){
//             this[people]['bmi'] = Number((this[people].mass / (this[people].height ** 2)).toFixed(2))
//         }
//     }
// }

// const arrayPeoples = Object.keys(peoples).map(key => {
//     if(key !== 'bmi'){
//         return key
//     }
// })
// for(let i = 0; i < arrayPeoples.length; i++){
//     peoples.bmi(arrayPeoples[i])
// }
// console.log(peoples)

// Challenge 4

function calcTip(bills) {
  let billTips, billTotal;

  if (bills >= 50 && bills <= 300) {
    billTips = 0.15 * bills;
  } else {
    billTips = 0.2 * bills;
  }
  billTotal = billTips + bills;
  return {
    tips: billTips,
    totals: billTotal,
  };
}

function calcAverage(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].totals;
    // console.log(sum) // enable console sum
  }
  return Number((sum / arr.length).toFixed(2));
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

let totalBills = [];

for (let i = 0; i < bills.length; i++) {
  totalBills.push(calcTip(bills[i]));
}

// average total spent
console.log(calcAverage(totalBills));

