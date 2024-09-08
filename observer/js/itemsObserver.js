class Subject{
    constructor(){
        this.observers = [];
    }

    subscribe(observer){
        this.observers.push(observer);
    }

    unsubscribe(observer){
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data){
        this.observers.forEach(e=>{
            e.refresh(data);
        });
    }
}
class ItemsSubject extends Subject{

    constructor(){
        super();
        this.data = [];
        
    }

    add(item){
        this.data.push(item);
        super.notify(this.data);
    }
}

class HtmlElementObserver{
    
    constructor(element){
        this.element = element;
    }

    refresh(data){ 
        this.element.innerHTML = data.reduce((ac, e)=>{
            return ac + `<p>${e}</p>`;
        }, "");
    }
}

class Observer{
    
    constructor(fn){
        this.fn = fn;
    }

    refresh(data){ 
        this.fn(data);
    }
}

const items = new ItemsSubject();
const div1Observer = new HtmlElementObserver(div1);
const div2Observer = new HtmlElementObserver(div2);
const observer1 = new Observer((data)=>{
    div3.innerHTML = data.length;
});

items.subscribe(div1Observer);
items.subscribe(div2Observer);
items.subscribe(observer1);

function add(){
    const name = txtName.value;
    items.add(name);
}



