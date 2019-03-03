import firebase from '@/plugins/firebase'

function auth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(payload => {
      resolve(payload || false)
    })
  })
}
export default auth
