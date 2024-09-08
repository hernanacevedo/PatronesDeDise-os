interface Component {
  getDetail(): string;
}

class ProducComponent implements Component {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  public getDetail(): string {
    return `${this.name}`;
  }
}
abstract class ProducDecorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public getDetail(): string {
    return this.component.getDetail();
  }
}

class ComercialInfoProductDecorator extends ProducDecorator {
  private tradename: string;
  private brand: string;
  constructor(component: Component,tradename:string, brand: string) {
    super(component);

    this.tradename=tradename;
    this.brand= brand
  }

  public getDetail(): string {
    return `${this.tradename} ${this.brand} `+
    super.getDetail();
  }
}

class StoreProducDecorator extends ProducDecorator{
    private price: number;
    constructor(component: Component,price:number) {
        super(component);
        this.price=price
      }
      public getDetail(): string {
        return super.getDetail() + ` ${this.price} `;
      }
    

}

class HTMLProducDecorator extends ProducDecorator{
    getDetail(): string{
        return `<h1> información del producto</h1>
        <p>
        ${super.getDetail()}
        </p>
        `

    }
}

//ejecución
//component
 const producComponent1= new ProducComponent("cerveza");
 console.log(producComponent1.getDetail())

// decorador 1 con  component

const commercialInfoProduct1 = new ComercialInfoProductDecorator(producComponent1,"london Porter", "fuller's")
console.log(commercialInfoProduct1.getDetail())

// decorador 2 con component

const StoreProduct2= new StoreProducDecorator(producComponent1,15.5)
console.log(StoreProduct2.getDetail())

// decorador 2 con decorador 1
const StoreProduct= new StoreProducDecorator(commercialInfoProduct1,15.5)
console.log(StoreProduct.getDetail())

// decorator 3 con decorator 2 con decorator 1
 const htmlProducDecorator= new HTMLProducDecorator(StoreProduct);
 console.log(htmlProducDecorator.getDetail())