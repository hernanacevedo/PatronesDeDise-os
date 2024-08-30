console.log("hola mundo 2")

function suma(a,b){
    return a+ b
}

let res= suma;
console.log(res);

const fsum =suma
res = fsum(5,6)

console.log(res);

function operation(fn ,a,b){
    console.log(" se hace algo");
    console.log(fn(a,b))
}

// arrow function
operation((a,b)=>a*b, 5,5);
operation((a,b)=>{
    const c= a+ b;
    return c*2;
},1,2)
// for each
const names =["juan","hector","david","Ana"]
names.forEach((name)=> console.log(name.toUpperCase()))
names.sort()
console.log(names);

// map
 const nameUpper = names.map((name)=> name.toUpperCase())
 console.log(names);
 console.log(nameUpper);

 // reduce
 const numbers= [5,4,7,1,10]
 const total= numbers.reduce((ac,number)=>{
    return ac+ number;
 },0);
 console.log(total);
 // clase

 class Drink{
    constructor(name){
    this.name= name;
    }
    info(){
    return "la bebida es: " + this.name
    }
 }
 const drink = new Drink ("agua");
 console.log(drink.name)
 console.log(drink.info())

 // funcional

function Drink2(name){
    this.name= name;
    this.info = function(){return "la bebida es: " + this.name
    }
 }
 const drink2 = new Drink2 ("agua");

 console.log(drink2.info())

 // herencia
  class Beer extends Drink{
    constructor(name,alcohol){
        super(name);
        this.alcohol= alcohol;
    }
        info(){
            return super.info() + " " + this.alcohol;
        }
    }

  const beer = new Beer("heinikel",8.5)

  console.log(beer.info());