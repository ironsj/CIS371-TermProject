<template>
	<div class="review">
        <p>Profile Image</p>
        <p>Name: {{name}}</p>
        <p>Date: {{date}}</p>
        <p>Rating</p>
        <p>Review: {{review}}</p>
	</div>
</template>

<script lang="ts">
import { firebaseConfig } from "@/myconfig";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
    getFirestore,
    Firestore,
    getDocs,
    QuerySnapshot,
    DocumentReference,
    setDoc,
    updateDoc,
    doc,
    CollectionReference,
    collection,
    QueryDocumentSnapshot,
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
export default class Review extends Vue {
    @Prop() title!: string;
    auth: Auth | null = null;
	user: User | null = null;
    myPhotoUrl = "";
    name = "";
    review = "";
    date = "";

    mounted(): void{
        // Get all docs under cities (sub)collection
        console.log(this.title)
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const reviews = collection(db, "Movies", this.title, "Reviews");
        getDocs(reviews).then((reviewQuery: QuerySnapshot) => {
            reviewQuery.forEach((movieReview:QueryDocumentSnapshot) => {
                const revData = movieReview.data();
                console.log(revData.newData);
                this.date = new Date(revData.date.seconds * 1000 + revData.date.nanoseconds / 1000000).toLocaleString();
                console.log(revData.date)
                this.review = revData.newData;
                this.name = revData.userName;
            });
        });

    }

}
</script>

<style>
.review{
    color:white;
}
</style>
