<template>
	<div class="profile">
		<NavBar />
		<UserInfo />
		<br>
		<center> 
			<table>
				<tr>
					<td>Movie Title</td>
					<td>Review</td>
					<td>Review Date</td>
				</tr>
                <tr v-for="(r, pos) in userReviews" :key="pos">
				<td>{{r.name}}</td>
                <td>{{r.review}}</td>
				<td>{{r.date}}</td>
				</tr>
		</table>
		</center>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserInfo from "@/components/UserInfo.vue"; // @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import {
	getAuth,
	onAuthStateChanged,
	User,
	Auth,
	signOut,
	deleteUser,
} from "firebase/auth";
import { firebaseConfig } from "@/myconfig";
import { initializeApp } from "firebase/app";
import {
        DocumentReference, 
        doc, getDoc,  updateDoc,
        getFirestore, setDoc,  
        CollectionReference, getDocs,
        collection,deleteDoc, Timestamp, QuerySnapshot, QueryDocumentSnapshot,
      } from "firebase/firestore";

type userRev = {
    review: string;
    date: string;
	name: string;
};

@Component({
	components: {
		UserInfo,
		NavBar,
	},
})
export default class HomeView extends Vue {
	userReviews: Array<userRev> = [];

	mounted(): void {
		this.getReviews();
	}
	getReviews(): void{
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
		const auth = getAuth();
        const uid = auth.currentUser!.uid;
        const reviews = collection(db, uid);
            getDocs(reviews).then((reviewQuery: QuerySnapshot) => {
                reviewQuery.forEach((movieReview:QueryDocumentSnapshot) => {
                    const revData = movieReview.data();
                    console.log(revData.newData);
                    this.userReviews.push({
                        date: new Date(revData.date.seconds * 1000 + revData.date.nanoseconds / 1000000).toLocaleString(),
                        review: revData.newData,
						name: movieReview.id,
                    })
            });
        });
    }
}
</script>
<style>
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
</style>