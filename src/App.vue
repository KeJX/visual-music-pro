<template>
  <div id="app">
      <candy></candy>
      <music-bar></music-bar>
  </div>
</template>

<script>
import MusicBar from "@/components/MusicBar"
import Candy from "@/components/Candy"
export default {
  name: 'app',
  components:{
    MusicBar,
    Candy
  }
}
</script>

<style>

</style>
