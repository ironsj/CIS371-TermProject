<template>
    <div class="movie">
        <NavBar/>
        <center>
        <table>
            <tr>
                <!---<th>Movie Poster</th>--->
                <th>Movie Title</th>
                <th>Release Date</th>
                <th>Movie ID</th>
            </tr>
            <tr v-for="(u,pos) in movie" :key="pos">
                <!---<td><img :src="u.poster_path"></td>--->
                <td>{{u.title}}</td>
                <td>{{u.release_date}}</td>
                <td @click="changeView(u.id)">{{u.id}}</td>
            </tr>
        </table>
        
        </center>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import axios, { Axios, AxiosResponse } from "axios";
import { movieData, movies } from '@/datatype';

@Component({
    components: {
        NavBar
    },
})

export default class MovieView extends Vue {
    @Prop() readonly search!: string;
    apiKey = "";
    movie: Array<movieData> = [];

    mounted(): void {
        this.apiKey = process.env.VUE_APP_MOVIE_DB_API_KEY;
         console.log(this.search);
        this.getMovie();
   }

    getMovie(): void{
        let searchurl = ''.concat('https://api.themoviedb.org/3/search/movie?api_key=', this.apiKey,'&lang=en-US', '&query=', this.search,)
        axios.request({
            method: "GET",
            url: "https://api.allorigins.win/get",
        params: {
             url: searchurl,
        },
        })
        .then((r: AxiosResponse) => {
      return r.data;
        })
        .then((r: any) => JSON.parse(r.contents))
     .then((r: any) => {
      for(let i = 0; i < r.results.length; i++){
        const m = r.results[i];
        console.log(m.title);
        this.movie.push({title: m.title, release_date: m.release_date, id: m.id, poster_path: m.poster_path})
      }
    })
    }
    changeView(nextId: string): void{
        this.$router.push({
            name: 'review',
            params:{
                id: nextId
            }
        });
    }
}
</script>

<style scoped>
td {
    padding: 0 15px;
    border: 3px solid;
    background: white;
}
th {
    font-weight: bold;
    background: white;
}
.movie{
    color: black;
}

</style>