<template>
  <mu-container>
    <mu-appbar style="width: 100%;" color="primary">
      <div flat slot="left" class="logo">
        <img src="../assets/icon/logo.png" alt>
        <span>网易云音乐</span>
      </div>
      <div flat slot="right" class="download">下载App</div>
    </mu-appbar>

    <mu-tabs :value.sync="active2" color="white" indicator-color="#d43c33" full-width>
      <mu-tab>推荐音乐</mu-tab>
      <mu-tab>热歌榜</mu-tab>
      <mu-tab>搜索</mu-tab>
    </mu-tabs>
    <!-- 推荐音乐 -->
    <div class="rec-music" v-if="active2 === 0">
      <div class="s-list">
        <p>推荐歌单</p>
      </div>
      <mu-row gutter>
        <mu-col span="4" v-for="(item,index) in songList" :key="item.id" v-if="index < 6">
          <div class="grid-cell" @click="goSongDetails(item)">
            <img :src="item.picUrl" alt>
            <span class="u-earp remd_lnum">{{item.trackCount}}万</span>
            <p>{{item.name}}</p>
          </div>
        </mu-col>
      </mu-row>
      <div class="s-list">
        <p>最新音乐</p>
      </div>
      <mu-list textline="two-line">
        <mu-list-item avatar :ripple="false" button v-for="item in newSong" :key="item.id">
          <mu-list-item-content
            v-for="(artist,index1) in item.song.artists"
            :key="artist.id"
            v-if="index1 < 1"
          >
            <mu-list-item-title>{{item.song.name}}</mu-list-item-title>
            <mu-list-item-sub-title>
              <span>
                <img src="../assets/icon/SQ.png" alt>
              </span>
              {{artist.name}}-{{item.song.name}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <img src="../assets/icon/play-circle.png" alt>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <mu-flex justify-content="center" class="footer">
        <mu-flex justify-content="center">
          <div>
            <div class="company-logo">
              <img src="../assets/icon/login_logo.png" alt>
              <p>网易云音乐</p>
            </div>
            <div class="op-button">打开APP，发现更多好音乐 ></div>
            <p class="copyright">网易公司版权所有©1997-2018 杭州乐读科技有限公司运营</p>
          </div>
        </mu-flex>
      </mu-flex>
    </div>
    <!-- 热歌榜 -->
    <div class="hot-music" v-if="active2 === 1">
      <div class="hot-bg">
        <div class="hot-info">
          <p>云音乐</p>
          <p>热歌榜</p>
          <p>更新日期:12月19日</p>
        </div>
      </div>
      <mu-list textline="two-line" class="hot-song-list">
        <mu-list-item
          avatar
          :ripple="false"
          button
          v-for="(track,index) in tracks"
          :key="track.id"
          class="list-box"
          v-if="index < 10"
        >
          <mu-list-item-action class="list-number">{{index + 1}}</mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title class="track-name">{{track.name}}</mu-list-item-title>
            <mu-list-item-sub-title
              v-for="(ar, index) in track.ar"
              :key="ar.id"
              v-if="index < 1"
            >{{ar.name}}-{{track.al.name}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action class="play">
            <img src="../assets/icon/play-circle.png" alt>
          </mu-list-item-action>
        </mu-list-item>
        <p>查看完整榜单 ></p>
      </mu-list>
    </div>
    <!-- 搜索 -->
    <div class="search" v-if="active2 === 2">
      <form action="searchForm" class="form">
        <div class="s-input">
          <i></i>
          <input type="text" placeholder="搜索歌曲/歌手/专辑" v-model="keywords" @click="show()">
          <div class="icon-delete" v-if="keywords !== ''" @click="deleteKeys()">
            <i></i>
          </div>
        </div>
      </form>

      <div class="m-recom" v-if="keywords !== '' && !key">
        <mu-list textline="two-line">
          <mu-list-item avatar button :ripple="false" id="mu-item">
            <mu-list-item-content>
              <mu-list-item-title id="m-keywords">搜索"{{keywords}}"</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item
            avatar
            button
            :ripple="false"
            v-for="(suggest, index) in suggests"
            :key="index"
            id="mu-item"
          >
            <mu-list-item-action>
              <img src="../assets/icon/search.png" alt style="width:12px;height:12px;">
            </mu-list-item-action>
            <mu-list-item-content @click="showResult(suggest)">
              <mu-list-item-title>{{suggest.name}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </div>

      <div class="m-searchresult" v-if="key && keywords !== ''">
        <mu-list textline="two-line">
          <mu-sub-header inset>最佳匹配</mu-sub-header>
          <mu-list-item
            avatar
            button
            :ripple="false"
            id="mu-item"
            v-for="(song, index) in searchResultList"
            :key="index"
          >
            <mu-list-item-content>
              <mu-list-item-title class="m-title">{{song.name}}</mu-list-item-title>
              <mu-list-item-sub-title
                class="m-name"
                v-for="(artist, index) in song.artists"
                :key="index"
                v-if="index < 1"
              >
                <span>
                  <img src="../assets/icon/SQ.png" alt>
                </span>
                {{artist.name}}-{{song.name}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action class="m_play">
              <img src="../assets/icon/play-circle.png" alt>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>

      <div class="m-default" v-if="keywords == ''">
        <div class="m-hotlist">
          <h3>热门搜索</h3>
          <mu-button round v-for="hotSong in hotSongs" :key="hotSong.id">{{hotSong.first}}</mu-button>
        </div>
        <mu-list textline="two-line">
          <mu-list-item
            avatar
            button
            :ripple="false"
            v-for="(historySong, index) in searchHistory"
            :key="index"
            id="mu-item"
          >
            <mu-list-item-action>
              <img src="../assets/icon/time-circle.png" alt>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{historySong.name}}</mu-list-item-title>
            </mu-list-item-content>
            <mu-list-item-action @click="deleteHistory(index)">
              <img src="../assets/icon/close-circle.png" alt>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </mu-container>
</template>

<script>
import { getPersonalized, getNewsong, getHotList, getSearch, getHotSearch, getSuggest, getMultimatch } from '../service/getData'
import { getStore, setStore } from '../config/mUtils'

// 节流函数
const delay = (function () {
  let time = 0;
  return function (callback, ms) {
    clearTimeout(time);
    time = setTimeout(callback, ms);
  };
})();

export default {
  name: 'home',
  data() {
    return {
      active2: 0,
      songList: [],
      newSong: [],
      idx: 1,
      tracks: [],
      keywords: '',
      search: [],
      hotSongs: [],
      suggests: [],
      searchHistory: [],//搜索历史纪录
      searchResultList: [],//搜索结果列表
      key: '',
    }
  },
  mounted() {
    getPersonalized().then(res => {
      this.songList = res.result;
    });
    getNewsong().then(res => {
      this.newSong = res.result;
    });
    getHotList(this.idx).then(res => {
      this.tracks = res.playlist.tracks;
    });
    getHotSearch().then(res => {
      this.hotSongs = res.result.hots;
    });
  },

  methods: {
    async fetchData(val) {
      getSearch(this.keywords).then(res => {
        this.search = res.result.songs;
      });
      getSuggest(this.keywords).then(res => {
        this.suggests = res.result.songs;
      });
    },
    deleteKeys() {
      this.keywords = '';
      this.key = false;
    },
    showResult(suggest) {
      this.keywords = this.key = suggest.name;
      getSearch(this.key).then(res => {
        this.searchResultList = res.result.songs;
      });
      this.searchHistory.unshift(suggest);
    },
    show() {
      this.keywords != '';
      this.key = false;
    },
    deleteHistory(index) {
      this.searchHistory.splice(index, 1);
    },
    //进入歌单详细页面
    goSongDetails(item) {
      this.$router.push({ path: '/songDetails', query: { id: item.id } });
    },
  },
  watch: {
    keywords() {
      delay(() => {
        this.fetchData();
      }, 300);
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  header {
    height: 64px;
    background: #d43c33;
    padding-left: 10px;
    padding-right: 10px;
    .logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
      span {
        font-size: 20px;
        margin-left: 4px;
      }
    }
    .download {
      border: 1px solid #fff;
      border-radius: 20px;
      width: 80px;
      height: 30px;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .mu-tabs {
    color: #333;
    font-size: 15px;
    .mu-tab-active {
      color: #d43c33;
    }
  }

  .rec-music {
    .s-list {
      p {
        font-size: 17px;
        padding-left: 10px;
        color: #333;
      }
      ::after {
        content: " ";
        position: absolute;
        left: 0;
        margin-top: 5px;
        width: 2px;
        height: 16px;
        background-color: #d43c33;
      }
    }
    .grid-cell {
      img {
        width: 100%;
        height: auto;
      }
      .u-earp {
        background-image: url("../assets/icon/icon-headset.png");
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position-x: -6px;
        font-size: 12px;
        padding-left: 20px;
        background-position: 0;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
      }
      .remd_lnum {
        position: absolute;
        right: 10px;
        top: 4px;
        color: #fff;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
      }
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 12px;
        text-align: center;
      }
    }
    .mu-list {
      li {
        border-bottom: 1px solid #e5e5e5;
        .mu-item-title {
          font-size: 18px;
        }
        .mu-item-sub-title {
          font-size: 12px;
          color: #888;
          span {
            img {
              width: 12px;
              height: 8px;
            }
          }
        }
        .mu-item-action {
          img {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
    .footer {
      width: 100%;
      text-align: center;
      margin-top: 20px;
      .company-logo {
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        justify-content: center;
        line-height: 10px;
        img {
          width: 42px;
          height: 42px;
        }
        p {
          font-size: 30px;
          margin-left: 8px;
        }
      }
      .op-button {
        line-height: 38px;
        border: 1px solid #d43c33;
        border-radius: 38px;
        font-size: 16px;
        color: #d43c33;
      }
      .copyright {
        color: #888;
        font-size: 12px;
        line-height: 16px;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
      }
    }
  }
  //热歌榜
  .hot-music {
    .hot-bg {
      background-image: url("../assets/image/bg-hot.png");
      background-repeat: no-repeat;
      width: 100%;
      .hot-info {
        padding: 15px;
        p {
          color: #fff;
          margin-top: 0;
          margin-bottom: 0;
          &:nth-of-type(1) {
            font-size: 18px;
            font-style: italic;
          }
          &:nth-of-type(2) {
            font-size: 40px;
          }
          &:nth-of-type(3) {
            font-size: 12px;
          }
        }
      }
    }
    .hot-song-list {
      .list-box {
        border-bottom: 1px solid #e5e5e5;
        .list-number {
          font-size: 18px;
          color: #d43c33;
        }
        .track-name {
          font-size: 18px;
        }
        .play {
          img {
            width: 22px;
            height: 22px;
          }
        }
      }
      p {
        text-align: center;
        color: #999;
        padding-right: 14px;
      }
    }
  }
  // 搜索
  .search {
    .form {
      padding: 15px 10px;
      border-bottom: 1px solid #e5e5e5;
      .s-input {
        width: 100%;
        height: 30px;
        background: #ebecec;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 0 30px;
        border-radius: 30px;
        position: relative;
        input {
          border: 0;
          outline: none;
          width: 100%;
          height: 30px;
          line-height: 18px;
          background: transparent;
          font-size: 14px;
          color: #333;
        }
        i {
          width: 12px;
          height: 12px;
          background: url("../assets/icon/search.png");
          background-repeat: no-repeat;
          background-size: 12px 12px;
          position: absolute;
          left: 0;
          top: 9px;
          margin: 0 8px;
          vertical-align: middle;
        }
        .icon-delete {
          i {
            width: 12px;
            height: 12px;
            background: url("../assets/icon/close-circle.png");
            background-repeat: no-repeat;
            background-size: 12px 12px;
            position: absolute;
            right: 0;
            top: 9px;
            margin: 0 8px;
            vertical-align: middle;
            left: 320px;
          }
        }
      }
    }

    //搜索匹配建议
    .m-recom {
      .mu-item-action {
        min-width: 26px;
        .mu-list-two-line,
        .mu-item {
          height: 0;
        }
      }
      #m-keywords {
        font-size: 16px;
        color: #507daf;
      }
      #mu-item {
        border-bottom: 1px solid #e5e5e5;
      }
    }

    //热搜列表
    .m-default {
      .m-hotlist {
        padding: 15px 10px 0;
        h3 {
          font-size: 12px;
          line-height: 12px;
          color: #666;
        }
        .mu-raised-button {
          box-shadow: none;
          border: 1px solid #e5e5e5;
          background: #fafafa;
          margin-right: 8px;
          margin-bottom: 8px;
          .mu-button-wrapper {
            color: #333;
            font-size: 14px;
          }
        }
      }
      .mu-item-action {
        min-width: 26px;
      }
      #mu-item {
        border-bottom: 1px solid #e4e4e4;
      }
    }
    //搜索结果列表展示
    .m-searchresult {
      .mu-sub-header.inset {
        padding-left: 16px;
        border-bottom: 1px solid #e4e4e4;
      }
      #mu-item {
        border-bottom: 1px solid #e4e4e4;
        .m-title {
          font-size: 18px;
          color: #333;
        }
        .m-name {
          font-size: 12px;
          color: #888;
          span {
            img {
              width: 12px;
              height: 8px;
            }
          }
        }
        .m_play {
          img {
            width: 22px;
            heigth: 22px;
          }
        }
      }
    }
  }
}
</style>
