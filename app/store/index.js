import firebase from '@/plugins/firebase'

const provider = new firebase.auth.TwitterAuthProvider()

export const strict = false

export const state = () => ({
  user: null,
  searchLounge: {},
  loungeData: []
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  searchLounge: state => state.searchLounge,
  loungeData: state => state.loungeData
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setSearchResult(state, searchLounge) {
    state.searchLounge = searchLounge
  },
  setLoungeData(state, loungeData) {
    state.loungeData.push(loungeData)
  }
}

export const actions = {
  callAuth() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  },
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
  async searchLounge({ commit }, name) {
    const res = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/lounges/search?name=${name}`
    )
    if (res.length === 0) throw new Error()
    commit('setSearchResult', res)
  },
  async fetchLoungeData({ commit }, id) {
    const res = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/lounges/${id}`
    )
    if (res.length === 0) throw new Error()
    commit('setLoungeData', res)
  },
  async hogehoge() {
    const res = await this.$axios.$get(
      `${process.env.FIREBASE_ENDPOINT}/hoge`
    )
    return res
  }
}
