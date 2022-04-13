<template>
  <div class="nav-bar">
    <form class="search-container">
      <input id="search-bar" type="text" placeholder="Search for Movie"/>
      <button id="search-button" type="submit">Search</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar{
  background-color: black;
  
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
