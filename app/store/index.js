import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

const provider = new firebase.auth.TwitterAuthProvider()

export const strict = false

export const state = () => ({
  user: null,
  loungeData: [],
  loungeRankingLog: []
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loungeData: state => state.loungeData,
  loungeRankingLog: state => state.loungeRankingLog,
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setLoungeData(state, loungeData) {
    state.loungeData = []
    state.loungeData.push(loungeData)
  },

  setLoungeRankingLog(state, loungeRankingLog) {
    loungeRankingLog.map(item => {
      item.summaryTime = dayjs(`${item.summaryTime}`).format('YYYY-MM-DD HH:mm:ss')
    })

    state.loungeRankingLog = []
    state.loungeRankingLog.push(loungeRankingLog)
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

  async fetchLoungeData({ commit }, id) {
    const res = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/lounges/${id}`
    )
    if (res.length === 0) throw new Error()
    commit('setLoungeData', res)
  },

  async fetchLoungeRankingLog({ commit }, id) {
    const res = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/lounges/${id}/eventHistory`
    )
    if (res.length === 0) throw new Error()
    commit('setLoungeRankingLog', res)
  },

  async hogehoge() {
    const res = await this.$axios.$get(`${process.env.FIREBASE_ENDPOINT}/hoge`)
    return res
  }
}
