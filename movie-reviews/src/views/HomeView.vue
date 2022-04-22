<template>
	<div class="home">
		<NavBar />
		<div class="movieLists">
			<div id="top">
				<h2>Trending Movies</h2>
				<BasicMovieInfo
					v-for="(m, pos) in trendingMovies"
					:key="pos"
					:title="m.title"
					:release_date="m.release_date"
					:poster_path="m.poster_path"
					@movie-clicked="reviewMovie(m.id)"
				></BasicMovieInfo>
			</div>
			<div id="out">
				<h2>In Theaters</h2>
				<BasicMovieInfo
					v-for="(m, pos) in outNow"
					:key="pos"
					:title="m.title"
					:release_date="m.release_date"
					:poster_path="m.poster_path"
					@movie-clicked="reviewMovie(m.id)"
				></BasicMovieInfo>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import BasicMovieInfo from "@/components/BasicMovieInfo.vue";
import axios, { AxiosResponse } from "axios";
import { movieData, movies } from "@/datatype";

@Component({
	components: {
		NavBar,
		BasicMovieInfo,
	},
})
export default class HomeView extends Vue {
	apiKey = "";
	trendingMovies: Array<movieData> = [];
	outNow: Array<movieData> = [];

	mounted(): void {
		this.apiKey = process.env.VUE_APP_MOVIE_DB_API_KEY;
		this.getTrending();
		this.getNowPlaying();
	}

	getTrending(): void {
		const movieURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}`;
		axios
			.request({
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
				for (let i = 0; i < r.results.length; i++) {
					const m = r.results[i];
					this.trendingMovies.push({
						poster_path: m.poster_path,
						title: m.title,
						release_date: m.release_date,
						id: m.id,
					});
				}
			});
	}

	getNowPlaying(): void {
		const movieURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`;
		axios
			.request({
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
				for (let i = 0; i < r.results.length; i++) {
					const m = r.results[i];
					this.outNow.push({
						poster_path: m.poster_path,
						title: m.title,
						release_date: m.release_date,
						id: m.id,
					});
				}
			});
	}

	foo(): void {
		console.log("test");
	}

	reviewMovie(nextId: string): void {
		console.log("test");
		this.$router.push({
			name: "review",
			params: {
				id: nextId,
			},
		});
	}
}
</script>

<style scoped>
.movieLists {
	left: 1%;
	right: 1%;
}

h2 {
	font-family: Brandon Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
}

#top {
	padding: 10px;
	padding-top: 20px;
}

#out {
	padding: 10px;
	padding-top: 20px;
}
</style>
