<template>
	<div class="userInfo">
		<p>Name: Henry Hank</p>
		<input type="text" :value="newName" />
		<button @click="editname">Edit Name</button>
		<img
			alt="Your Photo"
			:src="myPhotoURL"
			v-if="myPhotoURL.length > 0"
			width="256"
		/>
		<p>User Name: Henry1234</p>
		<input type="text" :value="newScreenName" />
		<button @click="editScreenName">Edit Screen Name</button>
		<p>DOB: 3/7/1990</p>
		<input type="date" :value="newDOB" />
		<button @click="editDOB">Edit Name</button>
		<p>Movies Reviewed: (Get Movie List from Firestore)</p>
		<p>Average Movie Rating Given: 0.0</p>
		<p>Highest rated Movie by You: (insert movie here)</p>
		<p>Lowest rated Movie by You: (insert movie here)</p>
	</div>
</template>

<script lang="ts">
import { firebaseConfig } from "@/myconfig";
import { Component, Vue } from "vue-property-decorator";
import {
	getFirestore,
	Firestore,
	getDoc,
	deleteDoc,
	DocumentReference,
	setDoc,
	updateDoc,
	doc,
	CollectionReference,
	collection,
} from "firebase/firestore";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

type Movie = {
	movieName: string;
};

@Component
export default class UserInfo extends Vue {
	apiKey = "";
	name = "";
	screenName = "";
	dob = "";
	reviews: Array<Movie> = [];
	newScreenName = "";
	newName = "";
	newDOB = "";

	mounted(): void {
		this.apiKey = process.env.MOVIE_DATABASE_API_KEY;
		this.getUserInfo();
	}

	async getUserInfo() {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user != null) {
			const uid = user.uid;
			const userDoc = doc(db, "users", `${uid}`);
			const userSnap = await getDoc(userDoc);
			if (userSnap.exists()) {
				this.name = userSnap.data().name;
				this.dob = userSnap.data().DOB;
				this.screenName = userSnap.data().screenName;
			} else {
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, uid);
				setDoc(d, { DOB: "", name: "", screenName: "" });
			}
		}
	}

	editName(): void {
		const auth = getAuth();
		if (auth != null) {
			if (auth.currentUser != null) {
				const uid = auth.currentUser.uid;
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, uid);
				updateDoc(d, { name: this.newName });
			}
		}
	}

	editScreenName(): void {
		const auth = getAuth();
		if (auth != null) {
			if (auth.currentUser != null) {
				const uid = auth.currentUser.uid;
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, uid);
				updateDoc(d, { screenName: this.newScreenName });
			}
		}
	}

	editDOB(): void {
		const auth = getAuth();
		if (auth != null) {
			if (auth.currentUser != null) {
				const uid = auth.currentUser.uid;
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, uid);
				updateDoc(d, { DOB: this.newDOB });
			}
		}
	}
}
</script>

<style></style>
