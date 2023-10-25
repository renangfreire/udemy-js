// Challenge #1
// BMI = IMC em PT,

// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both 
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about 
// whether Mark has a higher BMI than John

let markWeight = 78;
let markTall = 1.69;

let johnWeight = 92;
let johnTall = 1.95;

const johnBMI = formulaBMI(johnWeight, johnTall).toFixed(2)
const markBMI = formulaBMI(markWeight, markTall).toFixed(2)

const markHigherBMI = markBMI > johnBMI

function formulaBMI (weight, tall){
    const BMI = weight / tall**2;
    return BMI;
}

if(markHigherBMI){
    console.log(`Mark have a BMI(${markBMI}) higher than John(${johnBMI})`);
}
else{
    console.log(`John have a BMI higher than Mark`);
}
