<template>
  <div class="kjxprogress-container" 
  ref="progress" 
  @click="progressClick"
   @mousedown="progressTouchStart"
           @mousemove="progressTouchMove"
           @mouseup="progressTouchEnd">
    <div class="kjxprogress-underbar"></div>
    <div class="kjxprogress-bar" @click="progressClick" ref="progressBar"
            @touchstart="progressTouchStart"
           @touchmove="progressTouchMove"
           @touchend="progressTouchEnd"
           >
      <div class="occupy-left"></div>
      <div class="ovvupy-right"></div>
      <div class="kjxprogress-control" ref="progressControl"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "kjxProgress",

  mounted() {
    this.progressWidth =parseFloat(this.$refs.progress.currentStyle?this.$refs.progress.currentStyle['width']:document.defaultView.getComputedStyle(this.$refs.progress,false)['width']) 
    // this.btnWidth = this.$refs.progressControl.offsetWidth;
    this.btnWidth =parseFloat(this.$refs.progressControl.currentStyle?this.$refs.progressControl.currentStyle['width']:document.defaultView.getComputedStyle(this.$refs.progressControl,false)['width'])

    this._offset(this.progressWidth * this.percent)
  },

  props:{
      percent:{
          type:Number,
          default:0
      }
  },
  data() {
    return {
      progressWidth: 0,
      btnWidth:0,
      touch:{},
      isTouchMove:false
    };
  },

  methods: {
    progressClick(e) {
      const rect = this.$refs.progress.getBoundingClientRect();
      // 距离最左边的距离
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth)
       this._triggerPercent()
    },
    progressTouchStart(e){
        this.isTouchMove = true
        this.touch.startX = e.touches||e.clientX
        this.touch.left = this.$refs.progressBar.clientWidth
    },
    progressTouchMove(e){
       if(this.isTouchMove){
          let delta = (e.touches ?e.touches[0].clientX:e.clientX)- this.touch.startX
        let offsetWidth = this.touch.left + delta
        this._offset(offsetWidth)
       }
    },
     progressTouchEnd() {
         this._triggerPercent()
         this.isTouchMove = false
      },

    _triggerPercent() {
     let percent = this.$refs.progressBar.clientWidth / parseFloat(this.progressWidth)
     this.$emit('changePercent',percent)
    },
    _offset(offsetX) {
        offsetX = offsetX>this.progressWidth?(this.progressWidth):offsetX
        offsetX = offsetX<0?0:offsetX
          this.$refs.progressBar.style.width = (offsetX)+ "px"
    }
  },

  watch:{
      percent(newVal,oldVal){
          if(!this.isTouchMove){
              this.progressWidth =this.$refs.progress.clientWidth
              this._offset(this.progressWidth * newVal)
          }
      }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/variable";
.kjxprogress-container {
  width: 100%;
  .kjxprogress-underbar {
    position:absolute;
    width: 100%;
    background-color: #c1bfbf;
    height: 6px;
    z-index: 99;
    top:0;
  }
  .kjxprogress-bar {
    width:100%;
    position: absolute;
    top: 0;
    // min-width: 1px;
    background-color: $main-color;
    height: 6px;
    z-index:100;
    .kjxprogress-control {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $main-color;
      right: 0;
      top: 50%;
      margin-top: -5px;
    }
  }
}
</style>