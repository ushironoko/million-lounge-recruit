<template>
  <div class="column">
    <div class="card" style="max-width: 980px;">
      <div class="card-content">
        <div v-if="myRecruit.length !== 0" class="content has-text-centered">
          <b-table :data="myRecruit[0].loungeData">
            <template v-slot="props">
              <b-table-column field="name" label="ラウンジ名">
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="masterName" label="ラウマス">
                {{ props.row.masterName }}
              </b-table-column>
              <b-table-column field="userCount" label="人数">
                {{ props.row.userCount }}
              </b-table-column>
              <b-table-column field="comment" label="コメント">
                {{ props.row.comment }}
              </b-table-column>
              <b-table-column
                v-if="myRecruit[0].isIdShow"
                field="viewerId"
                label="ID"
              >
                <span v-if="myRecruit[0].isIdShow">{{
                  props.row.viewerId
                }}</span>
              </b-table-column>
            </template>
          </b-table>

          <b-table
            class="ranking-table"
            v-for="log in myRecruit[0].loungeRankingLog"
            :key="log.eventId"
            :data="log"
            :paginated="true"
            per-page="5"
            :pagination-simple="true"
            default-sort-direction="desc"
            default-sort="summaryTime"
          >
            <template v-slot="props">
              <b-table-column
                field="rank"
                label="順位"
                width="10"
                sortable
                numeric
              >
                {{ props.row.rank }}
              </b-table-column>
              <b-table-column
                field="eventName"
                label="イベント"
                width="130"
                sortable
              >
                {{ props.row.eventName }}
              </b-table-column>
              <b-table-column
                field="score"
                label="累計スコア"
                width="30"
                sortable
                numeric
              >
                {{ props.row.score }}
              </b-table-column>
              <b-table-column
                field="summaryTime"
                label="集計日"
                width="10"
                sortable
              >
                {{ props.row.summaryTime }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted() {
    const uid = this.$route.params.recruit
    this.$store.dispatch('firebase/fetchMyRecruit', uid)
  },
  computed: {
    ...mapGetters({
      myRecruit: 'firebase/myRecruit'
    })
  }
}
</script>
