import firebase from '@/plugins/firebase'

const provider = new firebase.auth.TwitterAuthProvider()

export const strict = false

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated: state => !!state.user,
  user: state => state.user
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
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

  async publishRecruit({ commit }, payload) {},

  async hogehoge() {
    const res = await this.$axios.$get(`${process.env.FIREBASE_ENDPOINT}/hoge`)
    return res
  }
}
