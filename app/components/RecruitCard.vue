<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <b-field label="ラウンジ名">
            <b-autocomplete
              :data="data"
              placeholder="ラウンジ名"
              field="name"
              :loading="isFetching"
              @typing="searchLoungeAsync"
              @select="option => (selected = option)"
              size="is-small"
            >
              <template v-slot="props">
                <div>
                  {{ props.option.name }}
                </div>
              </template>
            </b-autocomplete>
          </b-field>

          <b-field>
            <button
              class="button is-primary is-mobile"
              @click="fetchLoungeData"
            >
              選択したラウンジで求人を作る
            </button>
          </b-field>

          <div v-if="loungeData.length > 0">
            <b-table :data="loungeData" :columns="loungeDataColumns"></b-table>
            <b-table v-for="log in loungeRankingLog" :key="log.eventId" :data="log" :columns="loungeRankingLogColumns"></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      loungeDataColumns: [
        {
          field: 'name',
          label: 'ラウンジ名',
          width: '50'
        },
        {
          field: 'viewerId',
          label: 'id',
          width: '30'
        },
        {
          field: 'comment',
          label: 'コメント',
          width: '100'
        },
        {
          field: 'masterName',
          label: 'ラウンジマスター',
          width: '40'
        }
      ],
      loungeRankingLogColumns: [
        {
          field: 'eventName',
          label: 'イベント名',
          width: '70'
        },
        {
          field: 'summaryTime',
          label: '集計日時',
          width: '30'
        },
        {
          field: 'rank',
          label: '最終順位',
          width: '30'
        },
        {
          field: 'score',
          label: '最終累計スコア',
          width: '70'
        }
      ],
    }
  },
  methods: {
    searchLoungeAsync: debounce(async function(name) {
      if (!name.length) {
        this.data = []
        return
      }
      this.isFetching = true
      this.$axios
        .get(`https://api.matsurihi.me/mltd/v1/lounges/search?name=${name}`)
        .then(({ data }) => {
          this.data = []
          data.forEach(item => this.data.push(item))
        })
        .catch(error => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 700),

    fetchLoungeData() {
      try {
        this.$store
          .dispatch('fetchLoungeData', this.selected.id)
          .then(() => {
            this.$toast.open({
              duration: 3000,
              message: 'ラウンジ詳細がみつかりました',
              type: 'is-success'
            })
          })
          .catch(error => {
            this.$toast.open({
              duration: 3000,
              message: `${error}`,
              type: 'is-danger'
            })
          })

        this.$store
          .dispatch('fetchLoungeRankingLog', this.selected.id)
          .then(() => {
            this.$toast.open({
              duration: 3000,
              message: 'ラウンジ成績がみつかりました',
              type: 'is-success'
            })
          })
          .catch(error => {
            this.$toast.open({
              duration: 3000,
              message: `${error}`,
              type: 'is-danger'
            })
          })

      } catch {
        this.$toast.open({
          duration: 3000,
          message: `検索できませんでした`,
          type: 'is-danger'
        })
      }
    }
  },
  computed: {
    ...mapGetters(['loungeData','loungeRankingLog'])
  }
}
</script>
