<template>
    <div class="music-control" >
        <div class="top">
            <i class="hide-btn iconfont icon-xiala2" @click="hideEvent"></i>
            <div class="song-info">
                <span class="song-name">{{musicInfo.songName}}</span>
                <span class="singer-name">{{musicInfo.singerName}}</span>
            </div>
        </div>
        <div class="middle">
            <img :src="`${publicPath}test/music.jpg`" class="song-img" alt="">
        </div>
        <div class="bottom">
            <kjx-progress class="control-progress"></kjx-progress>
            <div class="control-btn-group ">
                <i class="mode-btn iconfont icon-xunhuan"></i>
                <div class="center-btn-group">
                    <i class=" prev-btn iconfont icon-kuaitui"></i>
                    <i class="iconfont play-btn icon-zanting"></i>
                    <i class="iconfont next-btn icon-kuaijin"></i>
                </div>
                <i class="like-btn iconfont icon-xiai"></i>
            </div>
        </div>
    </div>
</template>
<script>
import kjxProgress from "@/base/Progress"
export default {
    name:"MusicControl",
    components:{
        kjxProgress
    },
    data(){
        return{
            publicPath: process.env.BASE_URL,
        }
    },
    props:{
       musicInfo:{
           type:Object,
           default:{
               songName:"songName",
               singerName:"singerName"
           }
       },
       currentState:{
           type:Object,
           default:{
               currentTime:0,
               totalTime:0
           }
       }
    },
    methods:{
        hideEvent(){
            this.$emit("hideEvent")
        }
    }
}
</script>
<style lang="scss" scoped>
   @import "~assets/scss/mixin";
   @import "~assets/scss/variable";
    .music-control{
        position:relative;
        z-index:$control_index;
        .top{
            position: relative;
            height:60px;
            text-align: center;
            .hide-btn{
                position: absolute;
                left: 0;
                width:60px;
                height:60px;
                line-height: 60px;
                font-size: 30PX;
            }

            .song-info{
                height:100%;
                @include flexCenter(column);
                justify-content: space-around;
                .song-name{
                    margin-top: 10px;
                }
                .singer-name{
                    font-size: 12px;
                }
            }
        }

        .middle{
            height:70%;
            @include flexCenter(row);
            justify-content: center;
            .song-img{
                width:280px;
                height:280px;
                object-fit: cover;
                border-radius: 10%;
                box-shadow: 0 0 10px black;
            }
        }

        .bottom{
            position: fixed;
            width:100%;
            height:120px;
            bottom: 0;

            .control-progress{
                width:80%;
                margin: 0 auto;
            }

            .control-btn-group{
                position:fixed;
                bottom:40px;
                width:100%;
                @include flexCenter(row);
                justify-content: space-around;
                padding:0 50px;

                .iconfont{
                    font-size: 30px;
                }

                .center-btn-group{
                    margin:0 40px;
                    flex:1;
                    @include flexCenter(row);
                    justify-content: center;
                    .play-btn{
                    
                        margin: 0 30px;
                    }
                   
                }
            }
        }
    }
</style>