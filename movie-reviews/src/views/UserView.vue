<template>
	<div class="home">
		<h1>{{ userName }}</h1>
		<img
			alt="Your Photo"
			:src="myPhotoURL"
			v-if="myPhotoURL.length > 0"
			width="256"
		/>
		<UserInfo />
	</div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import UserInfo from "@/components/UserInfo.vue"; // @ is an alias to /src

@Component({
	components: {
		UserInfo,
	},
})
export default class HomeView extends Vue {
	@Prop() private userName!: String;
}
</script>
