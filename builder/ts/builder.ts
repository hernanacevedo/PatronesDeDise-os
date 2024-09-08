class Persona {
  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private city: string;
  private hobbies: string[];

  constructor(
    name: string,
    lastName: string,
    age: number,
    country: string,
    city: string,
    hobbies: string[]
  ) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }
  getFullName(): string {
    return this.name + " " + this.lastName;
  }
}

interface PersonaBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  setName(name: string): PersonaBuilder;
  setLastName(name: string): PersonaBuilder;
  setAge(age: number): PersonaBuilder;
  setCountry(country: string): PersonaBuilder;
  setCity(city: string): PersonaBuilder;
  addHobby(hobby: string): PersonaBuilder;
  build(): Persona;
}
class NormalPersonaBuilder implements PersonaBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];
  constructor() {
    this.reset();
  }
  reset(): void {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }
  setName(name: string): PersonaBuilder {
    this.name = name;
    return this;
  }
  setLastName(lastName: string): PersonaBuilder {
    this.lastName = lastName;
    return this;
  }
  setAge(age: number): PersonaBuilder {
    this.age = age;
    return this;
  }
  setCountry(country: string): PersonaBuilder {
    this.country = country;
    return this;
  }
  setCity(city: string): PersonaBuilder {
    this.city = city;
    return this;
  }
  addHobby(hobby: string): PersonaBuilder {
    this.hobbies.push(hobby);
    return this;
  }
  build(){
    const person = new Persona(
        this.name,
        this.lastName,
        this.age,
        this.country,
        this.city,
        this.hobbies
    )
    this.reset();
    return person;

}
}
