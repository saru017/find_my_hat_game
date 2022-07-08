const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//class should take a single arg representing the field
class Field {
  constructor(field, x = 0, y = 0) {
    this.field = field;
    this.x = x;
    this.y = y;
  }

  get field() {
    return this._field;
  }

  set field(f) {
    this._field = f;
  }

  get x() {
    return this._x;
  }

  set x(newX) {
    this._x = newX;
  }

  get y() {
    return this._y;
  }

  set y(newY) {
    this._y = newY;
  }

  //function prints each row
  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));
    }
  }

  //evaluate function that tests the current user position and sees if they are in the hole or out of bournds
  //add a check to see if move would exceed array dimensions?
  evaluate() {
    if (
      this._x < 0 ||
      this._x > this._field[0].length ||
      this._y < 0 ||
      this._y > this._field.length
    ) {
      console.log('out of bounds!');
      return true;
    } else {
      const currentPos = this._field[this._y][this._x];
      switch (currentPos) {
        case '^':
          console.log('You Win!');
          return true;
        case 'O':
          console.log('Oh NO! Try again!');
          return true;
        case '░':
          return false;
      }
    }
  }

  //handle user input, update current location
  getInput() {
    let currentField = this._field;

    const input = prompt('Please enter a direction:');
    switch (input) {
      case 'w':
        this._y--;
        break;
      case 'a':
        this._x--;
        break;
      case 's':
        this._y++;
        break;
      case 'd':
        this._x++;
        break;
    }

    //call eval here? if win or lose  inturrupt main game loop by returning a true or false
    if (this.evaluate()) {
      return true;
    } else {
      currentField[this._y][this._x] = '*';
      this._field = currentField;
      return false;
    }
  }
  //This method should at least take arguments for height and width of the field, and it should return a randomized two-dimensional array representing the field with a hat and one or more holes.
  generateField(height, width, percent) {
    const numHoles = height * width * (percent / 100);
    let newField = [];

    //nested for loops to create array of arrays for base field
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
        newField[i][j] = fieldCharacter;
      }
    }

    for (let k = 0; k < numHoles; k++) {
      const holeX = Math.floor(Math.random() * width);
      const holeY = Math.floor(Math.random() * height);

      newField[holeY][holeX] = hole;
    }

    //use math.random to get coordinates for hat, and holes then replace them as needed
    const hatX = Math.floor(Math.random() * width);
    const hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat;

    this._field = newField;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

//game loop
myField.generateField(10, 10, 10);
let game = false;
while (!game) {
  myField.print();
  game = myField.getInput();
}
