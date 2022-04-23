<template>
    <div class="movie">
        <NavBar/>
        <center>
            <br>
            <div class="movieInfo">
                <img :src="image_url"/>
                <table>
                    <tr>
                        <!---<th>Movie Poster</th>--->
                        <th>Movie Title</th>
                        <th>Release Date</th>
                        <th>Movie Summary</th>
                    </tr>
                    <tr>
                        <tr v-for="(u,pos) in this.reviews" :key="pos">
                        <td>{{u.title}}</td>
                        <td>{{u.release_date}}</td>
                        <td>{{u.overview}}</td>
                    </tr>
                </table>
            </div>
            <br>
            <form>
                <label for="review">Leave a Review:</label><br>
                <textarea rows="10" name="review" v-model="newReview"></textarea><br>
                <br>
                <button type="button" @click="reviewMovie">Post</button><button type="button" @click="deleteReview">Delete Review</button>
            </form>
        </center>
        <template v-if="currentTitle">
            <Review
                v-for="(r, pos) in totalReviews"
                :key="pos"
                :title="currentTitle" 
                :date="r.date"
                :profilePic="r.profilePic"
                :review="r.review"
                :name="r.name"
            ></Review>
        </template>
        <p v-else>F</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import Review from "@/components/Review.vue"
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
        doc, getDoc,  updateDoc,
        getFirestore, setDoc,  
        CollectionReference, getDocs,
        collection,deleteDoc, Timestamp, QuerySnapshot, QueryDocumentSnapshot,
      } from "firebase/firestore";

type publishedReviews = {
    title: string;
    date: string;
    profilePic: string;
    review: string;
    name: string;
};
@Component({
	components: {
		NavBar,
        Review,
	},
})
export default class MovieView extends Vue {
    @Prop() readonly id!: string;
    apiKey = "";
    reviews: Array<movieData> = [];
    totalReviews: Array<publishedReviews> = [];
    newReview ="";
    currentTitle="";
    poster_path="";
    image_url = "";
    userPhotoURL = "";


    mounted(): void {
        this.apiKey = process.env.VUE_APP_MOVIE_DB_API_KEY;
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
            this.currentTitle= r.title;
            this.poster_path = r.poster_path;
            this.image_url = `https://image.tmdb.org/t/p/w500${this.poster_path}`
            this.reviews.push({title: r.title, release_date: r.release_date, id: r.id, poster_path: r.poster_path, overview: r.overview})
        })
        .finally(() => {
            this.getReviews();
        })
    }

    getReviews(): void{
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const reviews = collection(db, "Movies", this.currentTitle, "Reviews");
            getDocs(reviews).then((reviewQuery: QuerySnapshot) => {
                reviewQuery.forEach((movieReview:QueryDocumentSnapshot) => {
                    const revData = movieReview.data();
                    console.log(revData.newData);
                    this.totalReviews.push({
                        title: this.currentTitle,
                        date: new Date(revData.date.seconds * 1000 + revData.date.nanoseconds / 1000000).toLocaleString(),
                        profilePic: revData.profilePhoto ?? "",
                        review: revData.newData,
                        name: revData.userName
                    })
            });
        });
    }

    deleteReview(): void{
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth();
        const uid = auth.currentUser!.uid;
        const delDoc:DocumentReference = doc(db, "Movies", this.currentTitle, "Reviews", uid);
        deleteDoc(delDoc);
    }
    
    reviewMovie(): void {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth();
        const user = auth.currentUser
        const uid = auth.currentUser!.uid;
        const locDoc:DocumentReference = doc(db, "Movies", this.currentTitle, "Reviews", uid);
        const personalDoc:DocumentReference = doc(db, uid, this.currentTitle);
        const docData = {
            newData: this.newReview,
            userName: user!.displayName,
            date: Timestamp.now(),
            profilePhoto: user!.photoURL ?? "",
        }
        this.newReview ="";
        setDoc(locDoc, docData);
        setDoc(personalDoc, docData);
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
    background: black;
    background-color: black;
}
tr{
    background-color: black;
}
td{
    background-color: black;
}
th{
    background-color: black;
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
.movieInfo{
    color: white;
    display: flex;
    justify-content: center;
    align-content: center;
}
textarea{
    width:50%;
    height:20%;
	color: black;
}
</style>
