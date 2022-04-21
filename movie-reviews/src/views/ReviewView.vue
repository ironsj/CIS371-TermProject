<template>
    <div class="movie">
        <NavBar/>
        <center>
            <br>
       <table>
            <tr>
                <!---<th>Movie Poster</th>--->
                <th>Movie Title</th>
                <th>Release Date</th>
                <th>Movie ID</th>
                <th>Movie Summary</th>
            </tr>
            <tr>
                <td>{{reviews[0].title}}</td>
                <td>{{reviews[0].release_date}}</td>
                <td>{{reviews[0].id}}</td>
                <td>{{reviews[0].overview}}</td>
            </tr>
       </table>
       <br>
       <form>
           <label for="review">Review Movie:</label><br>
            <input type="text" id="review" name="review"><br>
            <br>
            <button :click="reviewMovie">Review Movie</button>
        </form>
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
    @Prop() readonly id!: string;
    apiKey = "";
    reviews: Array<movieData> = [];


    mounted(): void {
        this.apiKey = process.env.VUE_APP_MOVIE_DB_API_KEY;
         console.log(this.id);
        this.getDetails();
   }

    getDetails(): void{
         let searchurl = ''.concat('https://api.themoviedb.org/3/movie/', this.id, '?api_key=', this.apiKey, '&lang=en-US')
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
        this.reviews.push({title: r.title, release_date: r.release_date, id: r.id, poster_path: r.poster_path, overview: r.overview})
    })
    }

}


</script>


<style scoped>
td {
    padding: 3px 10px;
    border: 3px solid;
}
th {
    font-weight: bold;
    padding: 3px 15px;
    border: 3px solid;
}
table {
    width: 50%;
    font-size: 15pt;
}

label {
    font-size: 20pt;
}
input {
    padding: 10px 10px;
    width: 30%;
    line-height: 100%;
}

</style>