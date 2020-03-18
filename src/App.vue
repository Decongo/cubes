<template>
  <div id="app">
    <div id="nav">
      
    </div>
    <router-view/>
  </div>
</template>

<script>
import CubeCollection from './script'

export default {
  name: 'CubeCollection',

  mounted() {
    console.log(`started searching...`);
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
    console.log(`search finished in ${(finished - start) / 1000} seconds`);

    console.log(cubeCollection.words);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
