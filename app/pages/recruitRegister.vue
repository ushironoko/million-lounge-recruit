<template>
  <section>
    <div>
      <recruit-card :title="title" />
    </div>
  </section>
</template>

<script>
import RecruitCard from '~/components/RecruitCard'
export default {
  computed: {
    title: () => {
      return '新規求人'
    }
  },
  components: {
    RecruitCard
  }
}
</script>
