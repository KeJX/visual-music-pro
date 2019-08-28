<template>
  <div class="colorPicker" @mouseenter="mouseEnterEvent" @mouseleave="mouseLeaveEvent">
    <button class="main-btn">{{btnName}}</button>
    <transition name="colorPanel">
      <div v-show="isColorPickerShow" class="colorPanel">
        <div class="panel-item" v-for="(item,i) in ColorConfigs" :key="i" @click="colorChoose(i)">
          <img :src="`${publicPath}colorImg/${item.img}`" alt class="panel-item-img" />
          <span class="panel-item-text">{{item.name}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";
import { ColorConfigs} from "./config"
export default {
  name: "ColorPicker",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      btnName: "默认颜色",
      isColorPickerShow: false,
      ColorConfigs
    };
  },
  props: {
    color: []
  },
  methods: {
      colorChoose(i){
          this.btnName = ColorConfigs[i].name
          this.$emit("ColorPickerTrigger",ColorConfigs[i])
      },
    mouseEnterEvent() {
      this.isColorPickerShow = true;
    },
    mouseLeaveEvent() {
      this.isColorPickerShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.colorPanel-enter-active,
.colorPanel-leave-active {
  transition: opacity 0.5s;
}

.colorPanel-enter,
.colorPanel-leave-to {
  opacity: 0;
}
@import "~assets/scss/variable";
.colorPicker {
  position: relative;
  .main-btn {
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
        
        margin-top:5px;
      }
    }
  }
}
</style>