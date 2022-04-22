<template>
	<div class="userInfo">
		<p>User Name: Henry1234</p>
		<button @click="editScreenName">Edit Name</button>
		<input type="text" :value="newScreenName" enabled="false" />
		<p>DOB: 3/7/1990</p>
		<button @click="editDOB">Edit Name</button>
		<input type="text" :value="newDOB" enabled="false" />
		<p>Movies Reviewed: (Get Movie List from Firestore)</p>
		<p>Average Movie Rating Given: 0.0</p>
		<p>Highest rated Movie by You: (insert movie here)</p>
		<p>Lowest rated Movie by You: (insert movie here)</p>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
	getFirestore,
	Firestore,
	getDocs,
	deleteDoc,
	DocumentReference,
	setDoc,
	doc,
	CollectionReference,
	collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const app: FirebaseApp = initializeApp(firebaseConfig);
// const db: Firestore = getFirestore(app);
type UserData = {
	name: string;
	screenName: string;
	dob: string;
};

type Movie = {
	movieName: string;
};

@Component
export default class UserInfo extends Vue {
	reviews: Array<Movie> = [];
	newScreenName: string = "";
	newUserName: string = "";
	newDOB: string = "";

	mounted(): void {
		// this.apiKey = process.env.MOVIE_DATABASE_API_KEY
	}

	editUserName(): void {
		// Enable text entry
		// Receive text entry
		// send changes to firestore
	}
}
</script>

<style></style>
