class Singleton{

    static getInstance(){
        return Singleton.instance
    }
    constructor(){
        this.random = Math.random();
        console.log("entrando a constructor");
        if(Singleton.instance){
            console.log("ya existe")
            return Singleton.instance
        }
        console.log("no existe y se crea")
        Singleton.instance= this

    }
}

const singleton = new Singleton();
const singleton2 = new Singleton();
const singleton3 = new Singleton();

console.log(singleton.random);
console.log(singleton2.random);
console.log(singleton.random===singleton2.random);
console.log(singleton2.random===singleton3.random);

// ejemplo  1

class WeekDays{
    daysEs=["lunes","martes","Miercoles","jueves","Viernes","Sabado","domingo"]
    daysEn=["mondays","tuesday","wednesday","thursday","Friday","saturday","sunday"]
    constructor(lang){
        this.lang=lang;
        if(WeekDays.instance){
            return WeekDays.instance;
        }
        WeekDays.instance = this;
    }
    getDays(){
        return this.lang === "es" ? this.daysEs: this.daysEn;


    }
}
 const weekDays= new WeekDays("es");
 const weekDays2= new WeekDays("en");

 console.log(weekDays.getDays())
 console.log(weekDays.getDays())