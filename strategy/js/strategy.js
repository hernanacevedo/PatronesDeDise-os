class SaleContext{

    constructor(strategy){
        this.strategy = strategy; 
    }

    setStrategy(strategy){
        this.strategy = strategy;
    }

    calculate(amount){
        return this.strategy.calculate(amount);
    }
}

class RegularSaleStrategy{
    
    constructor(tax){
        this.tax = tax;
    }

    calculate(amount){
        return amount + ( amount * this.tax);
    }
}

class DiscountSaleStrategy{
    
    constructor(tax, discount){
        this.tax = tax;
        this.discount = discount;
    }

    calculate(amount){
        return amount + ( amount * this.tax) - this.discount;
    }
}

class ForeignSaleStrategy{
    
    calculate(amount){
        return amount * this.getDollarPrice();
    }

    getDollarPrice(){
        return 20;
    }
}

let regularSale = new RegularSaleStrategy(0.16);
let discountSale = new DiscountSaleStrategy(0.16, 3);
let foreignSale = new ForeignSaleStrategy();

let sale = new SaleContext(regularSale);
console.log(sale.calculate(10));
sale.setStrategy(discountSale);
console.log(sale.calculate(10));
sale.setStrategy(foreignSale);
console.log(sale.calculate(10));


// Explicación práctica---------------------------------------------------------

class InfoContext{

    constructor(strategy, data, element){
        this.setStrategy(strategy);
        this.data = data;
        this.element = element;
    }

    setStrategy(strategy){
        this.strategy = strategy;
    }

    show(){
        this.strategy.show(this.data, this.element);
    }
}

class ListStrategy{

    show(data, element){

         element.innerHTML = data.reduce((ac, e)=>{
            
            return ac + `<div>
                    <h2>${e.name}</h2> 
                    <p>${e.country}<p>
                </div>
            <hr>`;
        }, "");

    }
}

class DetailedListStrategy{

    show(data, element){
         element.innerHTML = data.reduce((ac, e)=>{
     
            return ac + `<div>
                    <h2>${e.name}</h2> 
                    <p>${e.country}<p>
                    <p>${e.info}</p>
                </div>
            <hr>`;
        }, "");

    }
}

class ListWithImageStrategy{

    show(data, element){
         element.innerHTML = data.reduce((ac, e)=>{
                return ac + `<div>
                        <img width="10%" src="${e.img}">
                        <h2>${e.name.toUpperCase()}</h2> 
                        <p>${e.country}<p>
                        <p>${e.info}</p>
                    </div>
                <hr>`;
        }, "");

    }
}




const data = [{
    name: "Erdinger Pikantus",
    country: "Alemania",
    info: "Erdinger Pikantus es una cerveza de estilo weizenbock elaborada en la localidad bávara de Erding.",
    img: "https://dxjcdxuv6chk2.cloudfront.net/assets/biere/flascheglas/pikantus-2020-v2.png"
},
{
    name: "Corona",
    country: "México",
    info: "La cerveza Corona es una marca mundialmente conocida, distribuida a lo largo de más de 159 países en los cinco continentes.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Corona-6Pack.JPG"
},
{
    name: "Delirium Tremens",
    country: "Bélgica",
    info: "Esta pale ale tiene una efervescencia fina con un toque un tanto picante. Al tomarse, calienta el paladar y deja un sabor fuerte y de un amargor seco.",
    img: "https://www.delirium.be/themes/custom/delirium/assets/img/beers/beer_delirium_tremens_bottle.png"
}];

const strategies = [
    new ListStrategy(),
    new DetailedListStrategy(),
    new ListWithImageStrategy()
]

const info = new InfoContext(
    new ListStrategy(),
    data,
    content);

info.show();

slcOptions.addEventListener("change",(event)=>{
    const op = event.target.value;
    info.setStrategy(strategies[op]);
    info.show();
});
