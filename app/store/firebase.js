import firebase from '@/plugins/firebase'

const provider = new firebase.auth.TwitterAuthProvider()

export const strict = false

export const state = () => ({
  user: null,
  myRecruit: {}
})

export const getters = {
  isAuthenticated: state => !!state.user,
  user: state => state.user,
  myRecruit: state => state.myRecruit
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setMyRecruit(state, payload) {
    state.myRecruit = payload
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

  async publishRecruit({ state }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(async idToken => {
          await this.$axios
            .$put(
              `/recruits/${state.user.uid}/recruit.json?auth=${idToken}`,
              payload
            )
            .then(() => resolve())
        })
        .catch(function(error) {
          reject()
        })
    })
  },

  async fetchMyRecruit({ commit }, uid) {
    const res = await this.$axios.$get(`/recruits/${uid}/recruit.json`)
    commit('setMyRecruit', res)
  }
}
