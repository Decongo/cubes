<template>
  <div id="app">
    <button @click='start()'>Find words</button>
    <p>{{message}}</p>
    <p>Result count: {{results.length}}</p>
    <span v-for='result in results' :key='result'>
      {{result}}
      <br />
    </span>
  </div>
</template>

<script>
import CubeCollection from './script'

export default {
  name: 'CubeCollection',

  methods: {
    start() {
      this.message = `Started searching...`;
      setTimeout(this.findWords, 10);
    },
    findWords() {
      const start = Date.now();

      let cubes = [['H','L','S','J','U','B'], 
                  ['O','O','N','O','S','O'], 
                  ['M','V','O','Y','A','O'], 
                  ['E','E','W','' ,'' ,'' ]];
      // let cubes = [['A',' ',' '],
      //              ['D',' ',' '],
      //              ['D',' ',' ']];
      let cubeCollection = new CubeCollection();
      cubeCollection.start(cubes);

      const finished = Date.now();
      this.message = `Search finished in ${(finished - start) / 1000} seconds`;

      this.results = cubeCollection.words;
    }
  },

  data() {
    return {
      message: "Click \"Find Words\" to begin",
      results: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #2c3e50;
}
</style>
