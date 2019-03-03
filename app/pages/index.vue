<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Free" icon="github-circle">
        <button class="button is-primary is-medium" @click="hoge">hoge?</button>
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',
  methods: {
    async hoge() {
      const res = await this.$store.dispatch('hogehoge')
      alert(res)
    }
  },
  components: {
    Card
  }
}
</script>
