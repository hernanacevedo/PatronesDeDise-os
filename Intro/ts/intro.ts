class Drink1 {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Definición del método info
    info(): string {
        return this.name;
    }
}

// Ejemplo de uso
const drink1 = new Drink1("Coca-Cola");
console.log(drink1.info());

interface Product{
    price:number;
    getPrice():string
}

class Beer extends Drink1 implements Product{
    private alcohol:number
    price :number
     constructor(name:string,alcohol:number,price:number){
        super(name);
        this.alcohol=alcohol;
        this.price=price
     }
     getPrice(): string {
        return  "$ " + this.price;
    }

     info(): string {
        return super.info()+ " " + this.price;
    }

}
const beer = new Beer("heinikel",8.5,100)

console.log(beer.info());

class Snack implements Product{
    price :number;
    name:string;
    constructor(name:string,price:number){
        this.name=name;
        this.price=price;

    }
     getPrice(): string {
         return "El precio  es: $ "+ this.price;
     }
}

const products:Product[]=[ 
    new Beer("Corona",4.5,1),
    new Snack("papas",0.5),
    new Beer("Corona",4.5,1),
];

function getPrice(items:Product[]){
    for (const item of items){
        console.log(item.getPrice())
    }
}
getPrice(products);
