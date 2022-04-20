<template>
  <div class="nav-bar">
    <form class="search-container">
      <input id="search-bar" type="text" placeholder="Search for Movie"/>
      <button id="search-button" type="submit">Search</button>
    </form>
    <h1 id="title">Movie Review WebApp Thing</h1>
    <button v-if="!signedIn" @click="login">Login/Register</button>
    <div v-else>
      <img :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="32">
      <p>Welcome {{userInfo}}!</p>
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
  @Prop() private msg!: string;
  userPhotoURL = "";
  auth: Auth | null = null;
  userInfo = "";
  user: User | null = null;
  signedIn = false;

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
  background-color: black;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
}

.nav-bar h1{
  color: wheat;
}

.search-container {
  display:flex;
  flex-direction:row;
  
  /* This bit draws the box around it */
  border:1px solid grey;

  /* I've used padding so you can see the edges of the elements. */
  padding:2px;

  
}

#search-bar {
  /* Tell the input to use all the available space */
  /* And hide the input's outline, so the form looks like the outline */
  border:none;
}

#search-bar :focus{
  outline:none
}

#search-button {
  /* Just a little styling to make it pretty */
  border:1px white;
  background:white;
  color:black;
}
</style>
