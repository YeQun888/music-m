<template>
  <mu-container>
    <mu-row>
      <mu-col span="12">
        <mu-flex
          justify-content="center"
          v-for="(song, index) in songs"
          :key="index"
          v-if="index < 1"
        >
          <div class="box-play">
            <div class="p-disc" @click="controlPlay()">
              <img src="../assets/image/needle-ip6.png" alt>
              <img :src="song.al.picUrl" alt>
              <img
                src="../assets/icon/pause.png"
                alt
                v-bind:class="[isActive ? activeClass : '', errorClass]"
              >
              <div v-for="(data, index1) in songUrl" :key="index1" v-if="index1 < 1">
                <audio :src="data.url" loop="loop" id="audio" autoplay></audio>
              </div>
            </div>
            <div class="p-lyrics">
              <h3>{{song.al.name}}</h3>
              <div class="lyric">
                <!-- <p
                  v-for="(lrc, index) in lrcObj"
                  :key="index"
                  v-if="currentTime == index"
                >{{lrc[1]}}</p>-->
                <p id="lyrics"></p>
              </div>
            </div>
          </div>
        </mu-flex>
        <mu-flex align-items="center" class="p-btn">
          <mu-flex justify-content="center" fill class="btn-op">
            <mu-button>打开</mu-button>
          </mu-flex>
          <mu-flex justify-content="center" fill class="btn-dw">
            <mu-button>下载</mu-button>
          </mu-flex>
        </mu-flex>
      </mu-col>
    </mu-row>
  </mu-container>
</template>
<script>

import { getSongUrl, getSongLyric, getSongDetail } from '../service/getData'

export default {
  name: 'play',
  data() {
    return {
      id: this.$route.query.id,
      songs: [],
      songUrl: [],
      lyric: '',
      isPlaying: false,
      activeClass: 'hidden',
      errorClass: 'show',
      isActive: true,
      lrcObj: {},
      currentTime: 0,
      intervalId: null, // 定时器ID
      playTime: 2000, // 定时器执行间隔
    }
  },
  created() {
    this.intervalId = setInterval(() => { // 定义定时器
      this.getLyricTime();
    }, this.playTime)
  },
  destroyed() {
    clearInterval(this.intervalId) // 清除定时器
  },
  mounted() {
    getSongUrl(this.id).then(res => {
      this.songUrl = res.data;
    });
    getSongLyric(this.id).then(res => {
      this.lyric = res.lrc.lyric;
      let lines = this.lyric.split('\n');
      let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
      let result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }
      lines[lines.length - 1].length === 0 && lines.pop();
      for (let data of lines) {
        let index = data.indexOf(']');
        let time = data.substring(0, index + 1);
        let value = data.substring(index + 1);
        let timeString = time.substring(1, time.length - 2);
        let timeArr = timeString.split(':');
        result.push([parseInt(timeArr[0], 10) * 60 + parseInt(timeArr[1]), value]);
      }
      result.sort(function (a, b) {
        return a[0] - b[0];
      });
      return this.lrcObj = result;
      // console.log(result);
    });
    getSongDetail(this.id).then(res => {
      this.songs = res.songs;
    });
  },
  methods: {
    controlPlay() {
      let audio = document.querySelector('#audio');
      if (!this.isPlaying) {
        audio.pause();
        this.isPlaying = true;
        this.isActive = false;
      } else {
        audio.play();
        this.isPlaying = false;
        this.isActive = true;
      }
    },
    getLyricTime() {
      let audio = document.querySelector('#audio');
      this.currentTime = audio.currentTime;
      for (var i = 0; i < this.lrcObj.length; i++) {
        if ((this.currentTime > this.lrcObj[i][0]) && (this.currentTime < this.lrcObj[i + 1][0])) {
          document.getElementById("lyrics").innerHTML = this.lrcObj[i][1];
        }
      }
    },

  },
  computed: {

  },
  watch: {

  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .box-play {
    .p-disc {
      margin-top: 70px;
      text-align: center;
      img:nth-of-type(1) {
        width: 96px;
        height: 136px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 45%;
      }
      img:nth-of-type(2) {
        width: 80%;
        height: 80%;
        border-radius: 50%;
        -webkit-animation: myRotate 16s linear infinite;
        animation: myRotate 16s linear infinite;
        @-webkit-keyframes myRotate {
          0% {
            -webkit-transform: rotate(0deg);
          }
          50% {
            -webkit-transform: rotate(180deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes myRotate {
          0% {
            -webkit-transform: rotate(0deg);
          }
          50% {
            -webkit-transform: rotate(180deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
      }
      img:nth-of-type(3) {
        position: absolute;
        left: 44%;
        top: 38%;
      }
      .show {
        opacity: 1;
      }
      .hidden {
        opacity: 0;
      }
    }
    .p-lyrics {
      text-align: center;
      h3 {
        color: #333;
        font-size: 18px;
      }
      .lyric {
        text-align: center;
        height: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        p {
          color: #d43c33;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
  .p-btn {
    position: fixed;
    bottom: 0;
    width: 95%;
    margin-bottom: 10px;
    .btn-op {
      .mu-raised-button {
        width: 90%;
        height: 40px;
        box-shadow: none;
        border-radius: 40px;
        color: #d43c33;
        background: #fafafa;
        border: 1px solid #d43c33;
      }
    }
    .btn-dw {
      .mu-raised-button {
        width: 90%;
        height: 40px;
        box-shadow: none;
        border-radius: 40px;
        color: #fff;
        background: #d43c33;
      }
    }
  }
}
</style>
