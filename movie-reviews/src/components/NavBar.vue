<template>
  <div class="nav-bar">
    <div class="search_nav">
      <Burger @toggle-menu="menuActive = !menuActive" :active="menuActive"/>
      <nav v-show="menuActive">
        <router-link to="/">Home</router-link> |
        <router-link to="/user" v-if="user">Profile</router-link>
      </nav>
      <form class="search-container">
        <input id="search-bar" type="text" placeholder="Search for Movie" v-model="searched"/>
        <button id="search-button" type="submit" @click="searchMovie"><img :src="require('../assets/search.png')"></button>
      </form>
    </div>
    <h1 id="title">Movie Review WebApp Thing</h1>
    <button v-if="!signedIn" @click="login">Login/Register</button>
    <div id="profile" v-else>
      <div @click="goToProfilePage">
        <img :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="32">
        <p>Welcome {{userInfo}}!</p>
      </div>
      <button @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Burger from '@/components/HamburgerMenu.vue'
import {
  getAuth,
  onAuthStateChanged,
  User,
  Auth,
  signOut,
  deleteUser,
} from "firebase/auth";
import { component } from 'vue/types/umd';

@Component({
  components:{
    Burger
  },
})
export default class NavBar extends Vue {
  searched = "";
  userPhotoURL = "";
  menuActive = false;
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
      signOut(this.auth).then(() =>{
        this.$router.replace({ path: "/"}).catch(()=>{console.log("home")});
      }
      );
      this.signedIn = false;
    } 
  }
  searchMovie(): void {
    this.$router.push({
      name: 'movie',
      params: {
        search: this.searched
      }});
  }

  goToProfilePage():void{
    this.$router.replace({ name: "user"}).catch(()=>{console.log("profile")});
    console.log("Already there!") 
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
  padding-left: 3px;
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

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}

#profile{
  cursor: pointer;
}

.search_nav{
  display: flex;
  gap: 10px;
}
</style>