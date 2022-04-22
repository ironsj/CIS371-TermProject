<template>
	<div class="movie">
		<NavBar />
		<center>
			<br />
			<table>
				<tr>
					<!---<th>Movie Poster</th>--->
					<th>Movie Title</th>
					<th>Release Date</th>
					<th>Movie ID</th>
					<th>Movie Summary</th>
				</tr>
				<tr></tr>
				<tr v-for="(u, pos) in this.reviews" :key="pos">
					<td>{{ u.title }}</td>
					<td>{{ u.release_date }}</td>
					<td>{{ u.id }}</td>
					<td>{{ u.overview }}</td>
				</tr>
			</table>
			<br />
			<form>
				<label for="review">Review Movie:</label><br />
				<input type="text" v-model="newReview" /><br />
				<br />
				<button type="button" @click="reviewMovie">Review Movie</button>
			</form>
			<br />
			<table>
				<tr>
					<th>UserID</th>
					<th>Movie Review</th>
				</tr>
				<tr v-for="(u, pos) in this.totalReviews" :key="pos">
					<td>{{ u.userId }}</td>
					<td>{{ u.userData }}</td>
				</tr>
			</table>
		</center>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import axios, { Axios, AxiosResponse } from "axios";
import { movieData, movies } from "@/datatype";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	User,
	Auth,
	signOut,
	deleteUser,
} from "firebase/auth";
import { firebaseConfig } from "@/myconfig";
import {
	DocumentReference,
	doc,
	getDoc,
	updateDoc,
	getFirestore,
	setDoc,
	CollectionReference,
	getDocs,
	collection,
} from "firebase/firestore";

type publishedReviews = {
	userId: string;
	userData: string;
};
@Component({
	components: {
		NavBar,
	},
})
export default class MovieView extends Vue {
	@Prop() readonly id!: string;
	apiKey = "";
	reviews: Array<movieData> = [];
	totalReviews: Array<publishedReviews> = [];
	newReview = "";
	currentTitle = "";

	mounted(): void {
		this.apiKey = process.env.VUE_APP_MOVIE_DB_API_KEY;
		this.getDetails();
		// this.getReviews();
	}

	getDetails(): void {
		let searchurl = "".concat(
			"https://api.themoviedb.org/3/movie/",
			this.id,
			"?api_key=",
			this.apiKey,
			"&lang=en-US"
		);
		axios
			.request({
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
				this.currentTitle = r.title;
				this.reviews.push({
					title: r.title,
					release_date: r.release_date,
					id: r.id,
					poster_path: r.poster_path,
					overview: r.overview,
				});
			});
	}

	reviewMovie(): void {
		const app = initializeApp(firebaseConfig);
		const db = getFirestore(app);
		const auth = getAuth();
		const uid = auth.currentUser!.uid;
		console.log(this.currentTitle);
		console.log(uid);
		console.log(this.newReview);
		const locDoc: DocumentReference = doc(
			db,
			"Movies",
			this.currentTitle,
			"Reviews",
			uid
		);
		const docData = {
			newData: this.newReview,
		};
		this.newReview = "";
		setDoc(locDoc, docData);
	}
}
</script>

<style scoped>
td {
	padding: 3px 10px;
	border: 3px solid;
	background: white;
}
th {
	font-weight: bold;
	padding: 3px 15px;
	border: 3px solid;
	background: white;
}
table {
	width: 50%;
	font-size: 15pt;
}

label {
	font-size: 20pt;
	background: white;
	border: 3px solid;
}
input {
	padding: 10px 10px;
	width: 49%;
	border: 3px solid;
	line-height: 100%;
	background: white;
}
.movie {
	color: black;
}
</style>
