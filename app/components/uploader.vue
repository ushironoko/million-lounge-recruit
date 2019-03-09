<template>
  <section>
    <b-field>
      <b-upload
        v-model="dropFiles"
        multiple
        drag-drop
        @input="handleFileUpload"
        v-if="dropFiles.length === 0"
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"> </b-icon>
            </p>
            <p>PR画像をアップロードする</p>
          </div>
        </section>
      </b-upload>
      <div v-else>
        <span id="imgView"></span>
      </div>
    </b-field>

    <div class="tags">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dropFiles: []
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    handleFileUpload() {
      const img = new Image()
      const reader = new FileReader()
      reader.onload = function() {
        img.src = reader.result
        const el = document.getElementById('imgView')
        el.appendChild(img)
      }
      reader.readAsDataURL(this.dropFiles[0])
    }
  },
  watch: {
    dropFiles() {
      const payload = this.dropFiles[0] || []
      this.$store.dispatch('updatePRImage', payload)
    }
  }
}
</script>
