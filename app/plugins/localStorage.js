
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'twitter',
      paths: ['firebase.user']
    })(store)
  })
}
