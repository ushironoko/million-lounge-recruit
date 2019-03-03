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
            <b-input v-model="name"></b-input>
          </b-field>
          <button class="button is-primary is-medium" @click="fetchSearchLounge">
            ラウンジを検索する
          </button>
          <div v-if="searchLounge.length > 0">
            <b-table :data="searchLounge" :columns="searchColumns"
                      :selected.sync="selected" focusable></b-table>

            <b-field>
              <button class="button is-primary is-medium" @click="fetchLoungeData">
                選択したラウンジ情報を取得
              </button>
            </b-field>

          <div v-if="loungeData.length > 0">
            <b-table :data="loungeData" :columns="loungeDataColumns"></b-table>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: '',
      searchColumns: [
        {
          field: 'name',
          label: 'ラウンジ名',
          width: '70'
        }
      ],
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
      selected:{}
    }
  },
  methods: {
    fetchSearchLounge() {
      this.$store
        .dispatch('searchLounge', this.name)
        .then(res => {
          this.$toast.open({
            message: 'ラウンジが見つかりました',
            type: 'is-success'
          })
        })
        .catch(error => {
          this.$toast.open({
            duration: 5000,
            message: `${error}`,
            type: 'is-danger'
          })
        })
    },
    fetchLoungeData() {
            this.$store
        .dispatch('fetchLoungeData', this.selected.id)
        .then(res => {
          this.$toast.open({
            message: 'ラウンジが見つかりました',
            type: 'is-success'
          })
        })
        .catch(error => {
          this.$toast.open({
            duration: 5000,
            message: `${error}`,
            type: 'is-danger'
          })
        })
    }
  },
  computed: {
    selectedData() {
      if(this.loungeData.length > 0){
        this.selected = this.loungeData
      }
      return []
    },
    ...mapGetters(['searchLounge','loungeData'])
  }
}
</script>
