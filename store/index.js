//导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		show: true,
		userInfo: null,
		token: null
	},
	mutations: {
		getshow(state, n) {
			state.show = n
		},
		OBTAIN_USER_INFO(state, user) {
			state.userInfo = user
		},
		OBTAIN_TOKEN(state, token) {
			state.token = token
		},
	},
	actions: {
		getshow(context, args) {
			context.commit('getshow', args);
		}
	}
})
export default store
