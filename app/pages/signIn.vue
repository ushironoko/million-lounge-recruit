<template>
  <section>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </section>
</template>

<script>
import auth from '@/plugins/auth'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: true,
      isFullPage: true
    }
  },
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
