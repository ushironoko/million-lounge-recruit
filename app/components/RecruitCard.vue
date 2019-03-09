<template>
  <div class="column">
    <div class="card" style="max-width: 980px;">
      <header class="card-header">
        <b-field style="padding: 10px;">
          <b-autocomplete
            :data="data"
            placeholder="ラウンジを検索"
            field="name"
            :loading="isFetching"
            @typing="searchLoungeAsync"
            @select="option => (selected = option)"
            style="min-width: 250px;"
          >
            <template v-slot="props">
              <div>
                {{ props.option.name }}
              </div>
            </template>
          </b-autocomplete>

          <button class="button is-primary is-mobile" @click="fetchLoungeData">
            <b-icon icon="magnify" size="is-small"> </b-icon>
          </button>
        </b-field>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <div v-if="loungeData.length > 0">
            <div style="padding-bottom: 10px;">
              <button
                class="button is-primary is-mobile"
                @click="registerRecruitOnFirebase"
              >
                このラウンジの求人ページを作る
              </button>
            </div>

            <uploader @onFileName="fileName" />

            <div style="padding: 10px;">
              <b-switch v-model="isId">
                IDの表示
              </b-switch>
            </div>

            <b-table :data="loungeData">
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
                <b-table-column v-if="isId" field="viewerId" label="ID">
                  <span v-if="isId">{{ props.row.viewerId }}</span>
                </b-table-column>
              </template>
            </b-table>

            <b-table
              class="ranking-table"
              v-for="log in loungeRankingLog"
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
  </div>
</template>

<script>
import Uploader from '@/components/uploader'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      isId: false,
      fileName: ''
    }
  },
  methods: {
    onFineName(filename) {
      this.fileName = filename
    },
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
    }, 300),
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
    },
    registerRecruitOnFirebase() {
      const cloneData = cloneDeep(this.loungeData)
      const cloneRankingLog = cloneDeep(this.loungeRankingLog)
      const cloneUser = cloneDeep(this.user)

      const post = {
        lounge_data: cloneData,
        lounge_rankingLog: cloneRankingLog,
        pr_image_name: this.prImage.name ? `${cloneUser.uid}_${this.prImage.name}` : null,
        is_id_show: this.isId,
        create_user: cloneUser.uid,
        create_at: new Date()
      }
      console.log(post)
    }
  },
  computed: {
    ...mapGetters({
      loungeData: 'loungeData',
      loungeRankingLog: 'loungeRankingLog',
      user: 'firebase/user',
      prImage: 'prImage'
    })
  },
  components: {
    Uploader
  }
}
</script>

<style scoped>
.ranking-table {
  margin-top: 20px;
}
</style>
