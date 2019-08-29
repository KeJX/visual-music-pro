<template>
  <div class="colorPicker" >
    <dropdown>
      <button slot="dropdown-trigger" class="main-btn">{{btnName}}</button>
      <div  slot="dropdown-layer"  class="colorPanel">
        <div class="panel-item" :class="{'item-active':activeIndex== i }"  v-for="(item,i) in ColorConfigs" :key="i" @click="colorChoose(i)">
          <img :src="`${publicPath}colorImg/${item.img}`"  class="panel-item-img" />
          <span class="panel-item-text">{{item.name}}</span>
        </div>
        <div class="panel-item" @click="randomColor">
          <img :src="`${publicPath}test/music.jpg`" class="panel-item-img" />
          <span class="panel-item-text">试试手气1</span>
        </div>
        <div class="panel-item" @click="randomColorByCondition">
          <img :src="`${publicPath}test/music.jpg`" class="panel-item-img" />
          <span class="panel-item-text">试试手气2</span>
        </div>
      </div>
    </dropdown>
  </div>
</template>
<script>
import { ColorConfigs} from "./config"
import Dropdown from "@/base/Dropdown"
export default {
  name: "ColorPicker",
  components:{
    Dropdown
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      btnName: "颜色",
      isColorPickerShow: false,
      ColorConfigs,
      activeIndex:0
    };
  },
  props: {
    color: []
  },
  methods: {
      colorChoose(i){
          // this.btnName = ColorConfigs[i].name
          this.$emit("ColorPickerTrigger",ColorConfigs[i])
          this.activeIndex = i
      },
      randomColor(){
        function getRandomInt(max) {
             return Math.floor(Math.random() * Math.floor(max));
          }
          var eleArr=[-1,0,1]
        let color = {
           colors:{
            innerColor:parseInt(getRandomInt(256),16)*256*256+parseInt(getRandomInt(256),16)*256+parseInt(getRandomInt(256),16),//0-20
            topColor:parseInt(getRandomInt(256),16)*256*256+parseInt(getRandomInt(256),16)*256+parseInt(getRandomInt(256),16),//236-255
            bottomColor:parseInt(getRandomInt(256),16)*256*256+parseInt(getRandomInt(256),16)*256+parseInt(getRandomInt(256),16)//0 255
        },
        calEle:{
            x:eleArr[getRandomInt(3)],
            y:eleArr[getRandomInt(3)],
            z:eleArr[getRandomInt(3)]
        },
        }
         this.activeIndex = -1
        this.$emit("ColorPickerTrigger",color)
      },
       randomColorByCondition(){
         function getRandomInt(max) {
             return Math.floor(Math.random() * Math.floor(max));
          }
          var eleArr=[-1,0,1]
        let color = {
           colors:{
            innerColor:
            getRandomInt(2) == 0 ? parseInt(getRandomInt(21),16)*256*256 : (235 + parseInt(getRandomInt(20),16))*256*256
            +parseInt(getRandomInt(129),16)*256
            +parseInt(getRandomInt(129),16),

            topColor:
            parseInt(getRandomInt(129),16)*256*256
            +getRandomInt(2) == 0? parseInt(getRandomInt(256),16)*256 : (235 + parseInt(getRandomInt(20),16))*256
            +parseInt(getRandomInt(129),16),
            bottomColor:
            parseInt(getRandomInt(129),16)*256*256
            +parseInt(getRandomInt(129),16)*256
            +getRandomInt(2) == 0? parseInt(getRandomInt(256),16) : (235 + parseInt(getRandomInt(20),16))
        },
        calEle:{
            x:eleArr[getRandomInt(3)],
            y:eleArr[getRandomInt(3)],
            z:eleArr[getRandomInt(3)]
        },
        }
         this.activeIndex = -1
       
        this.$emit("ColorPickerTrigger",color)
       },
  
  }
};
</script>
<style lang="scss" scoped>

@import "~assets/scss/variable";
.colorPicker {
  position: relative;
  .main-btn {
    width:100px;
    height:40px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: $main-color;
    color: white;
  }

  .colorPanel {
    width:360px;
    box-shadow: 0 0 10px #8e8e8e;
    background: #fff;
    padding: 35px;
    position: absolute;
    top: 50px;
    right: 0px;
    border-radius: 20px;
    display: flex;
    flex-flow:row wrap;
    justify-content: space-around;
    align-items: center;
    align-content: flex-start;
    .panel-item {
      flex: 0 0 33%;
      padding:5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      &.item-active{
         .panel-item-text{
           background-color: $main-color;
           color:#fff;
         }
      }
        &:hover{
            transition: all .5s;
            transform: scale(1.1);
            box-shadow: 0 0 5px #8e8e8e;
            border-radius:10px;
        }
      font-size: 14px;
      .panel-item-img {
        border-radius: 10px;
        width: 78px;
        height: 78px;
        object-fit: contain;
      }
      .panel-item-text {
        display: inline-block;
        min-width:32px;
        border-radius:5px;
        margin-top:5px;
        text-align: center;
      }
    }
  }
}
</style>