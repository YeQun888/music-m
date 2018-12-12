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
    <div class="rec-music" v-if="active2 === 0">
      <div class="s-list">
        <p>推荐歌单</p>
      </div>
      <mu-row gutter>
        <mu-col span="4">
          <div class="grid-cell">
            <img src="../assets/image/img-0.jpg" alt>
            <span class="u-earp remd_lnum">227.2万</span>
            <p>暖冬治愈｜把孤独慢慢变成诗</p>
          </div>
        </mu-col>
        <mu-col span="4">
          <div class="grid-cell">
            <img src="../assets/image/img-0.jpg" alt>
            <span class="u-earp remd_lnum">227.2万</span>
            <p>暖冬治愈｜把孤独慢慢变成诗</p>
          </div>
        </mu-col>
        <mu-col span="4">
          <div class="grid-cell">
            <img src="../assets/image/img-0.jpg" alt>
            <span class="u-earp remd_lnum">227.2万</span>
            <p>暖冬治愈｜把孤独慢慢变成诗</p>
          </div>
        </mu-col>
        <mu-col span="4">
          <div class="grid-cell">
            <img src="../assets/image/img-0.jpg" alt>
            <span class="u-earp remd_lnum">227.2万</span>
            <p>暖冬治愈｜把孤独慢慢变成诗</p>
          </div>
        </mu-col>
        <mu-col span="4">
          <div class="grid-cell">
            <img src="../assets/image/img-0.jpg" alt>
            <span class="u-earp remd_lnum">227.2万</span>
            <p>暖冬治愈｜把孤独慢慢变成诗</p>
          </div>
        </mu-col>
        <mu-col span="4">
          <div class="grid-cell">
            <img src="../assets/image/img-0.jpg" alt>
            <span class="u-earp remd_lnum">227.2万</span>
            <p>暖冬治愈｜把孤独慢慢变成诗</p>
          </div>
        </mu-col>
      </mu-row>
      <div class="s-list">
        <p>最新音乐</p>
      </div>
      <mu-list textline="two-line">
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>爱的力量</mu-list-item-title>
            <mu-list-item-sub-title>王心凌-爱的力量</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <img src="../assets/icon/icon-next.png" alt>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
    <div class="demo-text" v-if="active2 === 1">
      <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
    </div>
    <div class="demo-text" v-if="active2 === 2">
      <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
    </div>
  </mu-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active2: 0
    };
  }
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
    }
    .mu-list {
      border-bottom: 0 solid rgba(0, 0, 0, 0.1);
      .mu-item-title {
        font-size: 18px;
      }
      .mu-item-sub-title {
        font-size: 12px;
        color: #888;
      }
      .mu-item-action {
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
}
</style>
