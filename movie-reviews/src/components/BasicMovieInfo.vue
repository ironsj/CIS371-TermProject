<template>
  <div id="movie">
    <img :src="image_url">
    <div id="info">
        <p>{{title}}</p>
        <p>Released: {{release_date}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class BasicMovieInfo extends Vue {
  @Prop() title!: string;
  @Prop() release_date!: string;
  @Prop() poster_path!: string;
  image_url = "";

  mounted():void{
      this.image_url = `https://image.tmdb.org/t/p/w154${this.poster_path}`;
      console.log(this.title);
  }


}
</script>

<style scoped>
#movie {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 4px;
  width: 6em;
}
#movie:hover {
  transform: scale(1.05);
  cursor: pointer;
}

#movie div{
 bottom: 0;
 right: 0;
 background: black;
 color: white;
 margin-bottom: 5px;
 font-family: sans-serif;
 opacity: 0;
 visibility: hidden;
 -webkit-transition: visibility 0s, opacity 0.5s linear; 
 transition: visibility 0s, opacity 0.5s linear;
}

#movie:hover div{
 width: 180px;
 padding: 8px 15px;
 visibility: visible;
 opacity: 0.7; 
}
</style>