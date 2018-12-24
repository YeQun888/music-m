<template>
  <mu-container class="detailsPage">
    <div class="header">
      <mu-row class="h-bg">
        <mu-col span="4" class="h-left">
          <mu-flex class="l-img" justify-content="center">
            <img :src="playlist.coverImgUrl" alt>
            <span class="l_icon">歌单</span>
            <i class="l-earp l-remd">{{playlist.trackCount}}万</i>
          </mu-flex>
        </mu-col>
        <mu-col span="8" class="h-right">
          <div class="r-title">
            <h3>{{playlist.name}}</h3>
            <div class="r-avatar">
              <img :src="playlist.creator.avatarUrl">
              <p>{{playlist.creator.nickname}}</p>
            </div>
          </div>
        </mu-col>
      </mu-row>
    </div>

    <div class="content">
      <div class="c-tag">
        标签:
        <span v-for="tag in playlist.tags" :key="tag.id">
          <mu-button>{{tag}}</mu-button>
        </span>
      </div>
      <div class="int">
        简介:
        <span>{{playlist.description}}</span>
      </div>
      <div class="lists">
        <p>歌曲列表</p>
      </div>
      <mu-list textline="two-line" class="s-lists">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-for="(track,index) in playlist.tracks"
          :key="track.id"
          id="mu-item"
        >
          <mu-list-item-action avatar>{{index+1}}</mu-list-item-action>
          <mu-list-item-content v-for="(ar,index1) in track.ar" :key="ar.id" v-if="index1 < 1">
            <mu-list-item-title>{{track.al.name}}</mu-list-item-title>
            <mu-list-item-sub-title>{{ar.name}}-{{track.name}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action class="p-icon">
            <img src="../assets/icon/play-circle.png" alt>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
    <div class="footer">
      <mu-flex justify-content="center" class="f-center">
        <mu-button color="#d33a31" class="f-button">
          <img src="../assets/icon/f-logo.png">收藏歌单
        </mu-button>
      </mu-flex>
    </div>
  </mu-container>
</template>
<script>
import { getDetail } from '../service/getData'

export default {
  name: 'login',
  data() {
    return {
      id: this.$route.query.id,
      playlist: '',
      refreshing: false,
      loading: false,
    }
  },
  mounted() {
    getDetail(this.id).then(res => {
      this.playlist = res.playlist;
    });
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
      }, 2000)
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000)
    },
  },
}
</script>
<style lang="scss" scoped>
.detailsPage {
  padding: 0;
  .header {
    padding: 30px 10px 30px 15px;
    width: 100%;
    height: 200px;
    background-image: url("../assets/image/bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 200px;
    .h-left {
      .l-img {
        img {
          width: 126px;
          height: 126px;
        }
        span {
          position: absolute;
          z-index: 2;
          top: 10px;
          left: 0;
          padding: 0 8px;
          height: 16px;
          color: #fff;
          font-size: 8px;
          text-align: center;
          line-height: 16px;
          background-color: rgba(217, 48, 48, 0.8);
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .l-earp {
          background-image: url("../assets/icon/icon-headset.png");
          background-repeat: no-repeat;
          background-size: 16px 16px;
          background-position-x: 6px;
          font-size: 12px;
          padding-left: 20px;
          background-position: 0;
          text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
          right: 20px;
        }
        .l-remd {
          position: absolute;
          right: 2px;
          top: 0;
          color: #fff;
          text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
        }
      }
    }
    .h-right {
      padding-left: 16px;
      .r-title {
        h3 {
          margin-top: 0;
          color: #fefefe;
          font-size: 16px;
        }
        .r-avatar {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          p {
            color: hsla(0, 0%, 100%, 0.7);
          }
        }
      }
    }
  }
  .content {
    height: auto;
    .c-tag {
      margin: 10px 10px 0 15px;
      color: #666;
      span {
        margin-left: 10px;
        .mu-raised-button {
          height: 22px;
          box-shadow: none;
          border: 1px solid #e5e5e5;
          background: #fafafa;
          box-sizing: border-box;
          border-radius: 12px;
          color: #666;
        }
      }
    }
    .int {
      margin: 10px 10px 0 15px;
      color: #666;
      .mu-paper {
        background-color: #fafafa;
      }
      .mu-elevation-2 {
        box-shadow: none;
      }
    }
    .lists {
      padding: 0 10px 0 15px;
      background: #eeeff0;
      p {
        color: #666;
      }
    }
    .s-lists {
      .mu-item-action {
        min-width: 36px;
      }
      #mu-item {
        border-bottom: 1px solid #e5e5e5;
        .mu-item .has-avatar {
          height: 48px;
        }
      }
      .p-icon {
        img {
          width: 22px;
          height: 22px;
        }
      }
      .mu-item {
        height: 48px;
      }
    }
  }
  .footer {
    width: 100%;
    height: 54px;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 1;
    .f-center {
      margin-top: 7px;
      .f-button {
        width: 80%;
        height: 40px;
        border-radius: 50px;
        box-shadow: none;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
}
</style>
