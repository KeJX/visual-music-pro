<template>
    <div class="list-container" >
        <div class="layer" @click="_toggleMusicList"></div>
        <transition name="playlist">
            <div class="music-list" v-show="isListShow">
            <kjx-cell class="play-order van-hairline--bottom" :value="'顺序播放(20)'">
          <i class="iconfont icon-xunhuan" slot="left-icon"></i>
          <i class="iconfont icon-shanchu1" slot="right-icon"></i>
        </kjx-cell>
        <kjx-scroll id="list-scroll" ref="list">
          <div class="content">
            <kjx-cell
              class="list-item van-hairline--bottom"
              v-for="(item,i) in list"
              :key="i"
              :value="item"
            >
              <i class="iconfont icon-shengyin left-icon" slot="left-icon"></i>
              <i class="iconfont icon-shanchu" slot="right-icon"></i>
            </kjx-cell>
          </div>
        </kjx-scroll>
        <kjx-cell :value="`关闭`" class="close-btn van-hairline--top" @click="_toggleMusicList"></kjx-cell>
        </div>
        </transition>
    </div>
</template>

<script>
import kjxScroll from "@/base/Scroll";
import kjxCell from "@/base/Cell";
export default {
    name:"PlayList",
    props:{
     
        list:{
            default:[],
            type:Array
        },
        isListShow:{
            default:false,
            type:Boolean
        }
    },
    components:{
         kjxScroll,
        kjxCell,
    },
    methods: {
        _toggleMusicList(){
            if(this.isListShow)
            this.$emit("toggleMusicList")
        }
    },
    watch:{
        list(){
            this.$refs.list.refresh()
        }
    }

}
</script>
<style lang="scss" scoped>
@import "~assets/scss/_variable.scss";
@import "~assets/scss/_mixin.scss";
.playlist-enter-active,
.playlist-leave-active {
  transition: transform .5s;
}

.playlist-enter,
.playlist-leave-to {
  transform: translateY($player-list-height);
}
.playlist-enter-to,
.playlist-leave {
  transform: translateY(0);
}

.list-container{
    position: fixed;
    // width: 100%;
    bottom: 0;
    top:0;
    left: 0;
    right:0;
    .layer{
        bottom: 0;
        top:0;
        left: 0;
        right:0;
        background-color: rgba(139, 139, 139, 0.26);
        position: fixed;
        z-index: $list_layer_index;
    }

     .music-list {
         width:100%;
         z-index: $list_index;
         height: $player-list-height;
         position: absolute;
         bottom:0;
         background-color: #fff;
         border-radius: 20px 20px 0px 0px;
         font-size: 14px;
     
    

    .play-order {
      padding: 0 16px;
      font-size: 16px;
      height: $player-list-info-height;
      .iconfont {
        font-size: 20px;
      }

      .list-info {
        flex: 1 0 50px;
        text-indent: 30px;
      }
    }

    #list-scroll {
      height: $player-list-height - $player-list-info-height - $player-list-close-btn-height;
      overflow: hidden;
      padding: 0 20px;
      .list-item {
        @include flexCenter(row);
        height: $player-list-item-height;

        .iconfont {
          color: $main-color;
        }
        .icon-shengyin {
          margin-right: 10px;
        }
      }
    }

    .close-btn {
      height: $player-list-close-btn-height;
      position: absolute;
      width: 100%;
      text-align: center;
    }
  }
}



</style>