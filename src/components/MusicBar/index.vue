<template>
  <div class="audiobar">
    <audio
      ref="audio"
      :src="`${publicPath}music/test.mp3`"
      @timeupdate="_updateTime"
      @canplay="_readyToPlay"
    ></audio>

   <div class="mini-container">
      <div class="audiobar-mini">
      <div class="progress-container">
        <div class="left-occupy"></div>
        <kjx-progress class="progress" :percent="percentage" @changePercent="changePercent" />
      </div>
      <img :src="`${publicPath}test/music.jpg`" class="music-img" @click="_toggleControl"/>
      <div class="music-info" @click="_toggleControl">
        <span class="music-name">{{ "白色羽毛"}}</span>
        <span class="singer-name">{{ "芮恩"}}</span>
      </div>
      <i class="control-btn" ref="controlBtn" :class="controlBtnClass" @click="tooggleAudioState"></i>
      <i class="iconfont icon-liebiao list-btn" @click="_toggleMusicList"></i>
    </div>
   </div>


     <transition name="list">
       <play-list v-show="isListShow" :isListShow="isListShow" :list="list" @toggleMusicList= "_toggleMusicList"></play-list>
    </transition>

    <transition name="control">
      <normal-control class="normal-container" v-show="isControlShow" @hideEvent="_toggleControl" />
    </transition>
   
   
  </div>
</template>
<script>
import kjxProgress from "@/base/Progress";
import NormalControl from "./MusicControl"
import PlayList from "./PlayList"
export default {
  components: {
    kjxProgress,
    NormalControl,
    PlayList
  },
  created(){},
  mounted() {
    // 获取audio
    this.audio = this.$refs.audio
    // 放入vuex中
    this.$store.state.audio = this.audio
    this.$store.state.startBtn = this.$refs.controlBtn

    // 更新list里面的内容的高度
    // this.$refs.list.refresh()
  },
  data() {
    return {
      // audio
      publicPath: process.env.BASE_URL,
      audio: null,
      isPlay: false,
      currentTime: 0,
      totalTime: 0,

      // LIST
      isListShow: false,
      list: [
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang",
        "daoxiang"
      ],

      // normal control
      isControlShow:false,
    };
  },
  computed: {
    controlBtnClass() {
      return {
        iconfont: true,
        "icon-zanting": !this.isPlay,
        "icon-bofang": this.isPlay
      };
    },
    percentage() {
      if (this.totalTime !== 0) return this.currentTime / this.totalTime;
      return 0;
    }
  },
  watch: {},
  methods: {
    tooggleAudioState() {
      // 更新isStart
      if(!this.$store.state.isStart){
        this.$store.commit("triggerStart")
      }
      if (this.isPlay) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlay = !this.isPlay;
    },
    changePercent(percent) {
      this.audio.currentTime = this.totalTime * percent;
    },
    _updateTime(e) {
      let target = e.target;
      this.currentTime = target.currentTime;
    },
    _readyToPlay(e) {
      let target = e.target;
      this.totalTime = target.duration;
    },
    _toggleMusicList() {
      this.isListShow = !this.isListShow;
    },
    _toggleControl(){
     
      this.isControlShow = !this.isControlShow
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/_variable.scss";
@import "~assets/scss/_mixin.scss";

.list-enter-active,
.list-leave-active {
  transition: opacity .5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}



.control-enter-active,
.control-leave-active {
  transition: opacity 0.5s;
}

.control-enter,
.control-leave-to {
  opacity: 0;
}

    

.mini-container{
  position: fixed;
  bottom: 0;
  width:100%;
  box-shadow: 0 0 15px #cecdcd;
  background: #fff;
}

.normal-container{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: #fff;
}

.audiobar {
  .audiobar-mini {
    position: relative;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: $bar_index;
    .progress-container {
      position: absolute;
      top: -2px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .progress {
        flex: 1;
      }
      .left-occupy,
      .right-occupy {
        width: 10px;
        height: 4px;
      }
      .left-occupy {
        background-color: $main-color;
      }
      .right-occupy {
        background-color: #c1bfbf;
      }
    }

    .music-img {
      display: inline-block;
      flex: 0 0 60px;
      height: 60px;
      object-fit: cover;
    }

    .music-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
      margin-left: 20px;
      .music-name {
        margin-bottom: 10px;
      }
      .singer-name {
        font-size: 14px;
      }
    }

    .control-btn,
    .list-btn {
      display: inline-block;
      flex: 0 0 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 30px;
      margin-right: 10px;
    }
    .control-btn {
      // margin-right: -120px;
    }
    .list-btn {
      font-size: 25px;
    }
  }
}
 
</style>

