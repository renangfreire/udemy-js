'use strict';

// const datesPersons = {
//     dateNames: ['Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio",'Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio",'Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio",'Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio",'Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio",'Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio",'Jonas','Julien','Febrero','Marzo','Renan','Julio','Marcos',"Marcio"],
//     dateBirthYears: [1999,1980,1992,1984,2005,2012,2006,1989,1999,1980,1992,1984,2005,2012,2006,1989,1999,1980,1992,1984,2005,2012,2006,1989,1999,1980,1992,1984,2005,2012,2006,1989,1999,1980,1992,1984,2005,2012,2006,1989,1999,1980,1992,1984,2005,2012,2006,1989,1999,1980,1992,1984,2005,2012,2006,1989]
// }


// const Person = function(firstName, birthYear){
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     // Never to this -- too many instances created with function, this overload app
//     // this.calcAge = function(){
//     //     console.log(2037 - this.birthYear)
//     // }
// }

// console.log(new Person('Jonas', 1993)
// )

// const persons = []

// datesPersons.dateNames.forEach((value, i) => {
//     persons.push(new Person(value, datesPersons.dateBirthYears[i]))
// })

// // Static Methods
// Person.hey = function(){
//     console.log('Hi There')
// }

// Person.hey()
// // persons[0].hey() //Dont works in instances


// // Why construction function works
// //1. New {} is created;
// //2. function is called, this = {}
// //3. {} linked to prototype
// //4. function automatically return {} 


// //Prototypes
// console.log(Person.prototype)

// Person.prototype.calcAge = function(){
//     console.log(2037-this.birthYear)
// }

// // Testar Desempenho 
// // ProtoType Vs function in constructor object

// console.dir(Person.prototype.constructor)

// console.log(String.prototype)

// // Coding Challenge #1

// /* 
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// const Car = function(make, speed){
//     this.make = make;
//     this.speed = speed
// }

// Car.prototype.accelerate = function(){
//     this.speed += 10
//     console.log(`${this.make} is going at ${this.speed}`)

// }
// Car.prototype.brake = function(){
//     this.speed -= 5
//     console.log(`${this.make} is going at ${this.speed}`)
    
// }

// const bmw = new Car('BMW', 120)
// const mercedes = new Car('Mercedes', 95)

// document.querySelector('body').addEventListener('keydown', (e) => {
//     e.key == 'm' && mercedes.accelerate()
//     e.key == 'b' && bmw.accelerate()
// })

// // Class Expression
// // const personCl = class{}

// // Class Declaration
// class PersonCl {
//     // Instance Methods
//     constructor(fullName, birthYear){
//         this.fullName = fullName
//         this.birthYear = birthYear
//     }
//     calcAge(){
//         console.log(2037 - this.birthYear)
//     }
//     get age(){
//         return 2023 - this.birthYear
//     }
//     // Set a property that already exists
//     set fullName(name){
//         console.log(name)
//         this._fullName = name;
//     }
//     // Get a property 
//     get fullName(){
//         return this._fullName
//     }

//     // Static
//     static hey(){
//         console.log('Hi there')
//     }
// }

// const jessica = new PersonCl('Jessica Davis', 1990)

// console.log(jessica)
// jessica.calcAge()

// //1. Classes NOT Hoisted
// //2. Classes are first-class citizens
// //3. Classes are executed in strict mode

// const account = {
//     user: 'jonas',
//     movements: [200,300,400,10],
    
//     get latest(){
//         return this.movements.slice(-1)[0]
//     },
//     set latest(mov){
//         this.movements.push(mov)
//     }


// }

// PersonCl.hey()


// // Object.Create()
// const PersonProto = {
//     calcAge(){
//         console.log(2023 - this.birthYear) 
//     },
//     init(firstName, birthYear){
//         this.firstName = firstName
//         this.birthYear = birthYear
//     }
// }

// const steven = Object.create(PersonProto)
// steven.name = 'Steven'
// steven.birthYear = 1990
// steven.calcAge()

// console.log(steven.__proto__ == PersonProto)

// const sarah = Object.create(PersonProto)
// sarah.init('Sarah', 1987)
// sarah.calcAge()

// ///////////////////////////////////////
// // Coding Challenge #2

// /* 
// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀
// */


// class CarES6 {
//     constructor(make, speed){
//         this.make = make;
//         this.speed = speed;
//     }
//     accelerate(){
//         this.speed += 10
//         console.log(`${this.make} is going at ${this.speed}`)
//     }
//     brake(){
//         this.speed -= 5
//         console.log(`${this.make} is going at ${this.speed}`)
//     }

//     set speedUS(speed){
//         return this.speed = speed * 1.6
//     }

//     get speedUS(){
//         return this.speed / 1.6
//     }
   
// }

// const bmwES6 = new CarES6('BMW', 120)
// const mercedesES6 = new CarES6('Mercedes', 95);
// const fordES6 = new CarES6('Ford', 120)

// bmwES6.accelerate()
// bmwES6.brake()
// bmwES6.speedUS = 100

// console.log(bmwES6.speedUS)
// console.log(bmwES6.speed)

// bmwES6.accelerate()
// bmwES6.brake()
// bmwES6.brake()
// bmwES6.brake()
// bmwES6.brake()
// bmwES6.accelerate()
// bmwES6.accelerate()


///////////////////////////////
//Inheritance Between "Classes"
//Constructor Functions

// const Person = function(firstName, birthYear){
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// }

// Person.prototype.calcAge = function(){
//     console.log(2037-this.birthYear)
// }

// const Student = function(firstName, birthYear, course){
//     Person.call(this, firstName, birthYear)
//     this.course = course
// }
// // Linking ProtoTypes

// Student.prototype = Object.create(Person.prototype)

// Student.prototype.introduce = function(){
//     console.log(`Hi, My name ${this.firstName} and I study ${this.course} `)
// }

// const mike = new Student('Mike', 2001, 'Science Computing')

// Student.prototype.constructor = Student;

// console.log(mike instanceof Student)
// console.log(mike instanceof Person)


// console.log(mike)
// mike.introduce()
// mike.calcAge()

// const jessica = new Person('Jessica', 2002)

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function(make, speed){
//     this.make = make;
//     this.speed = speed
// }

// Car.prototype.accelerate = function(){
//     this.speed += 10
//     console.log(`${this.make} is going at ${this.speed}`)

// }
// Car.prototype.brake = function(){
//     this.speed -= 5
//     console.log(`${this.make} is going at ${this.speed}`)
    
// }

// const EV = function(make, speed, charge){
//     Car.call(this, make, speed)
//     this.charge = charge
// }

// EV.prototype = Object.create(Car.prototype)

// Object.defineProperty(EV.prototype, 'chargeBattery', {
//     set: function(chargeTo){
//         console.log('Car is charging...')
//         console.log('...')
//         this.charge = chargeTo
//         console.log('Done')

//     }
// })

// EV.prototype.accelerate = function(){
//     this.speed += 20
//     this.charge -= 1
//     console.log(`${this.make} is going at ${this.speed}, with battery of ${this.charge}`)
// }

// EV.prototype.constructor = EV;

// const tesla = new EV('Tesla', 120, 23)

// tesla.accelerate()
// tesla.accelerate()
// tesla.accelerate()
// tesla.accelerate()

// tesla.brake()
// tesla.brake()
// tesla.brake()
// tesla.brake()

// tesla.chargeBattery = 90

// console.log(tesla)

// tesla.accelerate()
// tesla.accelerate()


///////////////////////////////
//Inheritance Between "Classes"
//ES6 Classes

// class PersonCl {
//     // Instance Methods
//     constructor(fullName, birthYear){
//         this.fullName = fullName
//         this.birthYear = birthYear
//     }
//     calcAge(){
//         console.log(2037 - this.birthYear)
//     }
//     get age(){
//         return 2023 - this.birthYear
//     }
//     // Set a property that already exists
//     set fullName(name){
//         console.log(name)
//         this._fullName = name;
//     }
//     // Get a property 
//     get fullName(){
//         return this._fullName
//     }

//     // Static
//     static hey(){
//         console.log('Hi there')
//     }
// }

// class StudentCl extends PersonCl{
//     constructor(fullName, birthYear, course){
//         // Always need happen first!
//         super(fullName, birthYear)
//         this.course = course;
//     }
// }

// const math = new StudentCl('Math', 1999, 'Science Computing')

// console.dir(math)


// ///////////////////////////////
// //Inheritance Between "Classes"
// //Object Create 


// const PersonProto = {
//     calcAge(){
//         console.log(2037 - this.birthYear)
//     },
    
//     init(firstName, birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }
// }

// const steven = Object.create(PersonProto)

// const StudentProto = Object.create(PersonProto)
// StudentProto.init = function(firstName, birthYear, course){
//     PersonProto.init.call(this, firstName, birthYear)
//     this.course = course
// }

// StudentProto.intro = function(){
//     console.log(`Hi, my name is ${this.firstName}, i am studding ${this.course}`)
// }

// console.log(StudentProto)

// steven.init('Steven', 1990)
// console.log(steven)

// const jay = Object.create(StudentProto)
// jay.init('Jay', 2004, 'Computing Science')
// console.log(jay)

// // Another Example Class

// // Public Fields
// // Private Fields
// // Public Methods
// // Private Methods
// // (there is also the static version)

// class Account {
    
//     //1) Public Fields (instances)
//     locale = navigator.language

//     //2) Private Fields (instances)
//     #movements = []
//     #pin

//     constructor(owner, currency, pin){
//         this.owner = owner
//         this.currency = currency
//         // Protected property
//         this.#pin = pin
        

//         console.log(`Thanks for opening an account, ${owner}}`)
//     }

//     //3) Public Methods
    
//     deposit(val){
//         this.#movements.push(val)
//         // for Chaining Works
//         return this
//     }
//     withdraw(val){
//         this.#movements.push(-val)
//         // for Chaining Works
//         return this
//     }
//     requestLoan(val){
//         if(this._approveLoan){
//             this.deposit(val)
//             console.log('Loan Approved')
//         }
//         // for Chaining Works
//         return this
//     }
//     get getMovements(){
//         return this.#movements
//     }

//     // Private Methods - browser sees as field
//     // #approveLoan(){}

//     _approveLoan(){
//         return true
//     }

//     // Static
//     static helper(){
//         console.log('help')
//     }

// }

// const acc1 = new Account('Jonas', 'EUR', 1111)
// const acc2 = new Account('Renan', 'BRL', 2222)

// // Don't change data, in this way, create prototypes for it
// // acc1.movements.push(240)
// // acc1.movements.push(-140)

// acc1.deposit(250)
// acc1.withdraw(150)
// acc1.requestLoan(1500)

// console.log(acc1.getMovements)
// Account.helper()


// // Chaining
// acc1.deposit(500).deposit(200).withdraw(300).requestLoan(4000).withdraw(3000)


///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// Challenge #3...

// const Car = function(make, speed){
//     this.make = make;
//     this.speed = speed
// }

// Car.prototype.accelerate = function(){
//     this.speed += 10
//     console.log(`${this.make} is going at ${this.speed}`)

// }
// Car.prototype.brake = function(){
//     this.speed -= 5
//     console.log(`${this.make} is going at ${this.speed}`)
    
// }

// const EV = function(make, speed, charge){
//     Car.call(this, make, speed)
//     this.charge = charge
// }

// EV.prototype = Object.create(Car.prototype)

// Object.defineProperty(EV.prototype, 'chargeBattery', {
//     set: function(chargeTo){
//         console.log('Car is charging...')
//         console.log('...')
//         this.charge = chargeTo
//         console.log('Done')

//     }
// })

// EV.prototype.accelerate = function(){
//     this.speed += 20
//     this.charge -= 1
//     console.log(`${this.make} is going at ${this.speed}, with battery of ${this.charge}`)
// }

// EV.prototype.constructor = EV;


// class CarCl {
//     constructor(make, speed){
//         this.make = make;
//         this.speed = speed;
//     }
//     accelerate(){
//         this.speed += 10
//         console.log(`${this.make} is going at ${this.speed}`)
//     }
//     brake(){
//         this.speed -= 5
//         console.log(`${this.make} is going at ${this.speed}`)
//         return this
//     }
// }

// class EVCl extends CarCl{
//     // Private Property
//     #charge
//     constructor(make, speed, charge){
//         super(make, speed)
//         this.#charge = charge
//     }
    
//     chargeBattery(chargeTo){
//         console.log('Car is charging')
//         console.log('...')
//         this.#charge = chargeTo
//         console.log('Done')
//         return this
//     }
//     accelerate(){
//         this.speed += 20;
//         this.#charge--;
//         console.log(`${this.make} is going at ${this.speed}, with battery of ${this.#charge}`)
//         return this
//     }
// }

// const rivian = new EVCl('Rivian', 120, 23)

// console.log(rivian)

// console.log(
//     rivian
//     .accelerate()
//     .accelerate()
//     .accelerate()
//     .accelerate()
//     .accelerate()
//     .chargeBattery(90)
//     .brake()
//     .brake()
//     .brake()
//     .brake()
//     .accelerate())