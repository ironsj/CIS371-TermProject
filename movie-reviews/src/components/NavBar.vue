<template>
  <div class="nav-bar">
    <form class="search-container">
      <input id="search-bar" type="text" placeholder="Search for Movie"/>
      <button id="search-button" type="submit"><img :src="require('../assets/search.png')"></button>
    </form>
    <h1 id="title">Movie Review WebApp Thing</h1>
    <button v-if="!signedIn" @click="login">Login/Register</button>
    <div id="profile" v-else>
      <div>
        <img :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="32">
        <p>Welcome {{userInfo}}!</p>
      </div>
      <button @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  getAuth,
  onAuthStateChanged,
  User,
  Auth,
  signOut,
  deleteUser,
} from "firebase/auth";

@Component
export default class NavBar extends Vue {
  userPhotoURL = "";
  auth: Auth | null = null;
  userInfo = "";
  user: User | null = null;
  signedIn = false;
  source = '../assets/search.jpg'

  mounted(): void{
    this.auth = getAuth();
    this.user = this.auth.currentUser
    onAuthStateChanged(this.auth, (user: User | null) => {
      console.log(user?.photoURL);
      this.userPhotoURL = user?.photoURL ?? "";
      console.log("Auth changed", user);
      if (user) {
        this.userPhotoURL = user.photoURL ?? "";
        this.userInfo = `${user.displayName}`;
        this.signedIn = true;
      }
    });
  }

  login():void{
    this.$router.push({ path: "/login" });
  }

  logout():void{
    if (this.auth){
      signOut(this.auth);
      this.signedIn = false;
    } 

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar{
  background-color: rgb(18, 18, 18);
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  padding:10px;
  color: white;
}

.nav-bar h1{
  color: wheat;
  font-family: Brandon Text,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
}

.search-container {
  display:flex;
  flex-direction:row;
  align-items: center;
  background-color: white;
  border-radius: 0.25rem;
}

#search-bar {
  border:0;
  height: 100%;
  width: 100%;
  height: 30px;
  outline:0;
  background: none;
}


.search-container img{
  height: 100%;
  width: 100%;
  object-fit: contain;
}

#search-button {
  border: none;
  height: 30px;
  background: none;
  cursor: pointer;
}

#profile{
  display: flex;
  align-items: center;
  font-size: 75%;
  font-family: Brandon Text,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
}
</style>
