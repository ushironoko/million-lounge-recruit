export default function({ store, route, redirect }) {
  if (!store.getters['firebase/isAuthenticated'] && /user/.test(route.name)) {
    redirect('/signIn')
  }
}
