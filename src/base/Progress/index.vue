<template>
  <div class="kjxprogress-container" ref="progress" @click="progressClick">
    <div class="kjxprogress-underbar"></div>
    <div class="kjxprogress-bar" @click="progressClick" ref="progressBar"
            @touchstart="progressTouchStart"
           @touchmove="progressTouchMove"
           @touchend="progressTouchEnd">
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
    this.progressWidth = this.$refs.progress.clientWidth;
    this.btnWidth = this.$refs.progressControl.offsetWidth;
    this._offset(0)
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
      console.log("click");
      const rect = this.$refs.progress.getBoundingClientRect();
      // 距离最左边的距离
      const offsetWidth = e.pageX - rect.left;
      console.log(offsetWidth);
      this._offset(offsetWidth)
       this._triggerPercent()
    },
    progressTouchStart(e){
        this.isTouchMove = true
        this.touch.startX = e.touches[0].clientX
        this.touch.left = this.$refs.progressBar.clientWidth
    },
    progressTouchMove(e){
        let delta = e.touches[0].clientX - this.touch.startX
        let offsetWidth = this.touch.left + delta
        this._offset(offsetWidth)
    },
     progressTouchEnd() {
         this._triggerPercent()
         this.isTouchMove = false
      },
    _triggerPercent() {

     let percent = this.$refs.progressBar.clientWidth / this.progressWidth
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
    width: 100%;
    background-color: #c1bfbf;
    height: 4px;
  }
  .kjxprogress-bar {
    position: absolute;
    top: 0;
    // min-width: 1px;
    background-color: $main-color;
    height: 4px;
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