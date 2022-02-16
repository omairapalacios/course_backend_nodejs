class User {
  constructor(name, lastname, books = [], pets = []) {
    this.name = name,
    this.lastname = lastname,
    this.books = books,
    this.pets = pets,
  }

  getFullName() {
    return `${this.name} ${this.lastname}`;
  }

  addPet(pet) {
    this.pets = [...this.pets, pet];
  }

  countPets() {
    return this.pets.length;
  }

  addBook(name, autor) {
    this.books = [...this.books, { name, autor }];
  }

  getBooksNames() {
    return this.books.map(({ name }) => name);
  }
}

// user instance
const user = new User('Omaira', 'Palacios');

console.log(user.getFullName()); // output: Omaira Palacios

user.addPet('perro');
user.addPet('gato');

console.log(user.countPets()); // output: 2

user.addBook('Los ojos de mi princesa', 'Carlos Cuauhtémoc');
user.addBook('Juventud en éxtasis', 'Carlos Cuauhtémoc');

console.log(user.getBooksNames()); // output: [ 'Los ojos de mi princesa', 'Juventud en éxtasis' ]
