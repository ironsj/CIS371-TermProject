<template>
  <div class="home">
    <NavBar/>
    <div class="tables">
      <table>
        <tr><th id="title">Trending Movies</th></tr>
        <tr>
          <th>Name</th><th>Release Date</th>
        </tr>
        <tr v-for="(m, pos) in topTen" :key="pos">
          <td>{{m.title}}</td><td>{{m.release_date}}</td>
        </tr>
      </table>
      <table>
        <tr><th id="title">In Theaters</th></tr>
        <tr>
          <th>Name</th><th>Release Date</th>
        </tr>
        <tr v-for="(n, pos) in outNow" :key="pos">
          <td>{{n.title}}</td><td>{{n.release_date}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue'
import axios, { AxiosResponse } from "axios";


type movieData = {
  title: string;
  release_date: string;
};

type movies = {
  results: Array<movieData>;
}


@Component({
  components: {
    NavBar
  },
})
export default class HomeView extends Vue {
  apiKey = "";
  topTen: Array<movieData> = []
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
        this.topTen.push({title: m.title, release_date: m.release_date})
        console.log(m.title);
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
        this.outNow.push({title: m.title, release_date: m.release_date})
        console.log(m.title);
      }
    })
  }

}
</script>

<style scoped>
.tables{
  display:flex;
  align-items: center;
  justify-content: center;
}

table{
  padding: 5%;
}

#title{
  font-size: 20;
}
</style>
