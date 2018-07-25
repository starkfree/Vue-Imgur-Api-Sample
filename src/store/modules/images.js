import api from '../../api/imgur';
import { router } from '../../main';

const state = {
	images: [],
	favorites: []
};

const getters = {
	allImages: state => state.images,
	allFavorites: state => state.favorites
};

const actions = { 
	async fetchImages({ rootState, commit }) {
		const response = await api.fetchImages( rootState.auth.token );
		commit( 'setImages', response.data.data );
	},
	async uploadImages({ rootState }, images ) {
		const { token } = rootState.auth;
		await api.uploadImages( images, token );
		
		router.push( '/' );
	},
	async fetchFavorites({ rootState, commit }) {
		const response = await api.fetchFavorites( rootState.auth.token );
		commit( 'setFavorites', response.data.data );
	}
};

const mutations = {
	setImages: (state, images) => {
		state.images = images;
	},
	setFavorites: (state, favorites) => {
		state.favorites = favorites
	}
};

export default {
	state: state,
	getters: getters,
	actions: actions,
	mutations: mutations
};