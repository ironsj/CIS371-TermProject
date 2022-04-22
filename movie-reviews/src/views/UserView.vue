<template>
	<div class="profile">
		<NavBar />
		<UserInfo />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserInfo from "@/components/UserInfo.vue"; // @ is an alias to /src
import NavBar from "@/components/NavBar.vue";

@Component({
	components: {
		UserInfo,
		NavBar,
	},
})
export default class HomeView extends Vue {}
</script>
