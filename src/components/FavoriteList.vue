<template>
	<div>
		<div v-if="isLoggedIn" class="image-container">
			<img v-for="image in allFavorites" :src="getImageURL( image )" :key="getImageID( image )" /> 
		</div>
		<h2 v-else>Log in to get started</h2>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'FavoriteList',
	methods: {
		...mapActions( ['fetchFavorites'] ),
		getImageURL( image ) {
			if( image.is_album ) {
				return image.images[0].link;
			} else {
				return image.link;
			}
		},
		getImageID( image ) {
			if( image.is_album ) {
				return image.images[0].id;
			} else {
				return image.id;
			}
		}
	},
	created( ) {
		this.fetchFavorites( );
	},
	computed: mapGetters( ['allFavorites', 'isLoggedIn'] )
};
	
</script>

<style scoped>
	.image-container {
		column-count: 3;
		column-gap: 0;
	}
	
	.image-container img {
		max-width: 100%;
		padding: 5px;
	}
</style>