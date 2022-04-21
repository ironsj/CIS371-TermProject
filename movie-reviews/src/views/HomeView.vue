<template>
  <div class="home">
    <NavBar/>
    <div class="movieLists">
      <div id="top">
        <h1>Trending Movies</h1>
        <BasicMovieInfo v-for="(m, pos) in trendingMovies" :key="pos" :title="m.title" :release_date="m.release_date" :poster_path="m.poster_path"></BasicMovieInfo>
      </div>
      <div id="out">
        <h1>In Theaters</h1>
        <BasicMovieInfo v-for="(m, pos) in outNow" :key="pos" :title="m.title" :release_date="m.release_date" :poster_path="m.poster_path"></BasicMovieInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue'
import BasicMovieInfo from '@/components/BasicMovieInfo.vue'
import axios, { AxiosResponse } from "axios";
import {movieData, movies} from "@/datatype"


@Component({
  components: {
    NavBar,
    BasicMovieInfo
  },
})
export default class HomeView extends Vue {
  apiKey = "";
  trendingMovies: Array<movieData> = []
  outNow: Array<movieData> = []

  mounted(): void{
    this.apiKey = process.env.VUE_APP_MOVIE_DB_API_KEY;
    this.getTrending();
    this.getNowPlaying();
  }

  getTrending(): void{
    const movieURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}`;
    axios.request({
      method: "GET",
      url: "https://api.allorigins.win/get",
      params: {
        url: movieURL,
      },
    })
    .then((r: AxiosResponse) => {
      return r.data;
    })
    .then((r: any) => JSON.parse(r.contents))
    .then((r: any) => {
      for(let i = 0; i < r.results.length; i++){
        const m = r.results[i];
        this.trendingMovies
    .push({poster_path: m.poster_path, title: m.title, release_date: m.release_date})
      }
    })
  }

  getNowPlaying(): void{
    const movieURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`
    axios.request({
      method: "GET",
      url: "https://api.allorigins.win/get",
      params: {
        url: movieURL,
      },
    })
    .then((r: AxiosResponse) => {
      return r.data;
    })
    .then((r: any) => JSON.parse(r.contents))
    .then((r: any) => {
      for(let i = 0; i < r.results.length; i++){
        const m = r.results[i];
        this.outNow.push({poster_path: m.poster_path, title: m.title, release_date: m.release_date})
      }
    })
  }

}
</script>

<style scoped>
.movieLists{
  left: 1%;
  right: 1%;
}

</style>
