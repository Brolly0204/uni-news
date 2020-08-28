import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const __UNI_HISTORY__ = '__UNI_HISTORY__'
const store = new Vuex.Store({
	state: {
		historyLists: uni.getStorageSync(__UNI_HISTORY__) || []
	},
	mutations: {
		'SET_HISTORY_LISTS'(state, history) {
			state.historyLists = history
			uni.setStorageSync(__UNI_HISTORY__, history)
		},
		'CLEAR_HISTORY_LISTS'(state) {
			state.historyLists = []
			uni.removeStorageSync(__UNI_HISTORY__)
		}
	},
	actions: {
		set_history_lists({ state, commit }, history) {
			const list = state.historyLists
			list.push(history)
			commit('SET_HISTORY_LISTS', list)
		},
		clear_history_lists({ commit }) {
		  commit('CLEAR_HISTORY_LISTS')
		} 
	}
})

export default store
