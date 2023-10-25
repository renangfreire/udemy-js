// ## Challenge 1

function printForecast(arr1, arr2){
  const newArr = arr1.concat(arr2);
  

  for(let i = 0; i < newArr.length; i++){
    console.log(`${newArr[i]}°C in ${i + 1} day `)
  }
}

printForecast([17,21,23], [12,5,-5,0,4])