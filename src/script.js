// I'm doing this with the assumption that a space in the middle of a string invalidates the string

import dictionary from './dictionary.txt'

export default class CubeCollection {

  constructor() {
    this.words = [];
  }

  async start(cubes=[]) {
    this.arrangeCubes(cubes);
    this.words.sort();
  }

  arrangeCubes(cubes=[], arrangedCubes=[]) {
    if (!cubes.length) {
      this.buildWord(arrangedCubes);
      return;
    }

    let _cubes;
    let _arrangedCubes;

    let index;
    cubes.forEach(cube => {
      _cubes = cubes.slice();
      _arrangedCubes = arrangedCubes.slice();

      _arrangedCubes.push(cube);
      index = _cubes.indexOf(cube);
      _cubes.splice(index, 1);
      this.arrangeCubes(_cubes, _arrangedCubes);
    })
  }

  buildWord(cubes=[], word="") {
    if (!cubes.length) {
      if (!word.trim().length) return                    // handle words of no length

      if (this.words.includes(word.trim())) return;      // check for repeat

      const regex = new RegExp(`\\b${word.trim().toLowerCase()}\\b`);
      if (!regex.test(dictionary)) return;               // check dict

      this.words.push(word.trim());
      return;
    }
    
    let _word;
    let _cubes = cubes.slice();               // copy the cube array
    const firstCube = _cubes.shift();         // pop the first cube

    let usedLetters = [];

    for (const letter of firstCube) {
      if (usedLetters.includes(letter)) continue;

      _word = word + letter;
      usedLetters.push(letter);
      this.buildWord(_cubes, _word);
    }
  }
}