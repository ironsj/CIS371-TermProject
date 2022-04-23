<template>
	<div class="userInfo">
		<p :name="name">Name: {{ name }}</p>
		<input type="text" v-model="newName" />
		<button @click="editName">Edit Name</button>
		<img
			alt="Your Photo"
			:src="myPhotoUrl"
			v-if="myPhotoUrl.length > 0"
			width="256"
		/>
		<p :screenName="screenName">Screen Name: {{ screenName }}</p>
		<input type="text" v-model="newScreenName" />
		<button @click="editScreenName">Edit Screen Name</button>
		<p :dob="dob">Date of Birth: {{ dob }}</p>
		<input type="date" v-model="newDOB" />
		<button @click="editDOB">Edit DOB</button>
		<p>Movies Reviewed: (Get Movie List from Firestore)</p>
		<p>Average Movie Rating Given: 0.0</p>
		<p>Highest rated Movie by You: (insert movie here)</p>
		<p>Lowest rated Movie by You: (insert movie here)</p>
	</div>
</template>

<script lang="ts">
import { firebaseConfig } from "../myconfig";
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
import {
	getAuth,
	onAuthStateChanged,
	User,
	Auth,
	signOut,
	deleteUser,
} from "firebase/auth";

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
	myPhotoUrl = "";
	auth: Auth | null = null;
	user: User | null = null;

	mounted(): void {
		this.apiKey = process.env.MOVIE_DATABASE_API_KEY;
		this.getUserInfo();
	}

	async getUserInfo() {
		this.auth = getAuth();
		this.user = this.auth.currentUser;
		onAuthStateChanged(this.auth, async (user: User | null) => {
			if (user) {
				const uid = user.uid;
				console.log(uid);
				this.myPhotoUrl = user?.photoURL ?? "";
				console.log(this.myPhotoUrl);
				const userDoc = doc(db, "users", `${uid}`);
				const userSnap = await getDoc(userDoc);
				if (userSnap.exists()) {
					this.name = userSnap.data().name;
					this.dob = userSnap.data().DOB;
					this.screenName = userSnap.data().screenName;
				} else {
					const c: CollectionReference = collection(db, "users");
					const d: DocumentReference = doc(c, `${uid}`);
					setDoc(d, { DOB: "", name: "", screenName: "" });
				}
			}
		});
	}

	editName(): void {
		const auth = getAuth();
		if (auth != null) {
			if (auth.currentUser != null) {
				const uid = auth.currentUser.uid;
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, `${uid}`);
				updateDoc(d, { name: this.newName });
			}
		}
		this.getUserInfo();
	}

	editScreenName(): void {
		const auth = getAuth();
		if (auth != null) {
			if (auth.currentUser != null) {
				const uid = auth.currentUser.uid;
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, `${uid}`);
				updateDoc(d, { screenName: this.newScreenName });
			}
		}
		this.getUserInfo();
	}

	editDOB(): void {
		const auth = getAuth();
		if (auth != null) {
			if (auth.currentUser != null) {
				const uid = auth.currentUser.uid;
				const c: CollectionReference = collection(db, "users");
				const d: DocumentReference = doc(c, `${uid}`);
				updateDoc(d, { DOB: this.newDOB });
			}
		}
		this.getUserInfo();
	}
}
</script>

<style></style>
