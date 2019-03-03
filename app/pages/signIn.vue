<template>
  <section>
    <div>認証中...</div>
  </section>
</template>

<script>
import auth from '@/plugins/auth'
import { mapActions } from 'vuex'

export default {
  async mounted() {
    let user = await auth()
    this.$store.dispatch('setUser', user)
    if (user) {
      this.$router.push('/recruitRegister')
    } else {
      this.$store.dispatch('callAuth')
    }
  }
}
</script>
