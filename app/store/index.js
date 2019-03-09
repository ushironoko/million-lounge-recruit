import dayjs from 'dayjs'

export const strict = false

export const state = () => ({
  loungeData: [],
  loungeRankingLog: [],
  prImage: []
})

export const getters = {
  loungeData: state => state.loungeData,
  loungeRankingLog: state => state.loungeRankingLog,
  prImage: state => state.prImage
}

export const mutations = {
  setLoungeData(state, loungeData) {
    state.loungeData = []
    state.loungeData.push(loungeData)
  },

  setLoungeRankingLog(state, loungeRankingLog) {
    loungeRankingLog.map(item => {
      item.summaryTime = dayjs(`${item.summaryTime}`).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    })

    state.loungeRankingLog = []
    state.loungeRankingLog.push(loungeRankingLog)
  },

  setPRImage(state, prImage) {
    state.prImage = prImage
  }
}

export const actions = {
  async fetchLoungeData({ commit }, id) {
    const res = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/lounges/${id}`
    )
    commit('setLoungeData', res)
  },

  async fetchLoungeRankingLog({ commit }, id) {
    const res = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/lounges/${id}/eventHistory`
    )
    commit('setLoungeRankingLog', res)
  },

  async updatePRImage({ commit }, payload) {
    commit('setPRImage', payload)
  }
}
