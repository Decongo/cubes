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

  // This function is responsible for creating cube arrangements from a list of cubes. It uses recursion 
  // to accomplish this goal. The main idea is to pop a cube off of a main cube list and add that cube 
  // to an arranged cube list until there are no more cubes in the orginal cube array. Once an arrangement 
  // is found, the buildWord() function is called.
  arrangeCubes(cubes=[], arrangedCubes=[]) {
    if (!cubes.length) {                    // base case: no cubes remaining
      this.buildWord(arrangedCubes);
      return;
    }

    let _cubes;
    let _arrangedCubes;

    let index;
    cubes.forEach(cube => {
      _cubes = cubes.slice();               // reset lists to their original state
      _arrangedCubes = arrangedCubes.slice();

      _arrangedCubes.push(cube);            // add cube to arranged list
      index = _cubes.indexOf(cube);         // remove cube from original list
      _cubes.splice(index, 1);
      this.arrangeCubes(_cubes, _arrangedCubes);
    })
  }

  // This function is responsible for building words from a given cube arrangement. It uses recursion to 
  // accomplish this goal. Like the previous function, the idea is to pop a cube off of the list of cubes
  // and build words from that cube's letters. To build words, this function iterates the list of letters, 
  // adding the current letter to the string, then recurses. This process continues until no cubes remain 
  // in the list. Once this base case is reached, the resulting string is validated. If the string is a 
  // valid word, then it is added to the list of words.
  buildWord(cubes=[], word="") {
    if (!cubes.length) {                                 // base case: no cubes remaining
      if (!word.trim().length) return                    // handle words of no length

      if (this.words.includes(word.trim())) return;      // check for repeat

      const regex = new RegExp(`\\b${word.trim().toLowerCase()}\\b`);
      if (!regex.test(dictionary)) return;               // check dictionary

      this.words.push(word.trim());                      // add word to list of results
      return;
    }
    
    let _word;
    let _cubes = cubes.slice();               // copy the cube array
    const firstCube = _cubes.shift();         // pop the first cube

    let usedLetters = [];                     // stores letters that have been examined

    for (const letter of firstCube) {
      if (usedLetters.includes(letter)) continue;

      _word = word + letter;                  // add letter to word
      usedLetters.push(letter);
      this.buildWord(_cubes, _word);
    }
  }
}