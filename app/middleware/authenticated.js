export default function({ store, route, redirect }) {
  if (!store.getters['firebase/isAuthenticated'] && route.name === 'recruitRegister') {
    redirect('/signIn')
  }
}
