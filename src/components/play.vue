<template>
  <mu-container></mu-container>
</template>
<script>

import { getSongUrl, getSongLyric, getSongDetail } from '../service/getData'

export default {
  name: 'play',
  data() {
    return {
      id: this.$route.query.id,
      song: [],
      lyric: '',
      detail: '',
    }
  },
  mounted() {
    getSongUrl(this.id).then(res => {
      this.song = res.data;
    });
    getSongLyric(this.id).then(res => {
      this.lyric = res.lrc.lyric;
    });
    getSongDetail(this.id).then(res => {
      this.detail = res.songs;
    });
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
