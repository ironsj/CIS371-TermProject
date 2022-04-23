<template>
	<div class="review">
        <div id="user">
            <img :src="profilePic" v-if="profilePic.length > 0" width="32" />
            <p>{{name}}</p>
        </div>
        <div id="rating">
            <p>"{{review}}"</p>
            <p>Rating</p>
        </div>
        <p id="date">Date: {{date}}</p>
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
    @Prop() date!: string;
    @Prop() profilePic!: string;
    @Prop() review!: string;
    @Prop() name!: string;

    mounted(): void{
        // Get all docs under cities (sub)collection
        console.log(this.title)
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        

    }

}
</script>

<style>
.review{
    font-family: 'Franklin Gothic FS Book','Helvetica Neue',Helvetica,Arial,sans-serif;
    color:white;
    background: rgb(30, 30, 30);
    width: 70%;
    height: auto;
    padding: 5px;
    position:relative;
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    border:1px solid wheat;
}

#user{
    position: absolute;
    left: 0px;
    top: 0px;
}

#rating{
    width: 60%;
    padding: 40px;
    overflow-wrap: break-word;
}

#date{
    position: absolute;
    right: 0px; 
    bottom: 0px;
}
</style>
