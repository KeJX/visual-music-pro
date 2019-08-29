<template>
  <div class="candy">
    <div ref="webgl"></div>
    <color-picker class="color-picker" @ColorPickerTrigger = "changeColor"></color-picker>
    <spectrogram class="spectrogram" :analyser="myAnalyser"/>
    <sharp-slider class="sharp-slider"></sharp-slider>
  </div>
</template>
<script>
var THREE = require("three");
import "@/assets/js/TweenMax.min.js";
import { mapState } from "vuex";
var analyser = require("web-audio-analyser");

import ColorPicker from "./ColorPicker";
import Spectrogram from "./Spectrogram"
import SharpSlider from "./SharpSlider"
export default {
  name: "Candy",
  components: {
    ColorPicker,
    Spectrogram,
    SharpSlider
  },
  computed: mapState(["isStart", "audio", "startBtn"]),
  created() {
    this.init();
  },
  mounted() {
    this.$refs.webgl.appendChild(this.three.renderer.domElement);
    requestAnimationFrame(this.render);
  },
  data() {
    return {
      myAnalyser: null,
      three: {},
      colors:{
        innerColor:0x00b49a,
        topColor:0x7c0065,
        bottomColor:0x0000ff,
        bgcColor:0x000000
      },
      calEle:{
        x:1,
        y:1,
        z:1
      },
      innerArray:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
      sharpNum:0.006,//0.002-0.08
      audioEnhanced: {
        getAvg: analyser => {
          var binCount = new Uint8Array(analyser.analyser.frequencyBinCount);
          analyser.frequencies(binCount);
          var sum = 0;
          binCount.forEach(function(item, i) {
            sum += item;
          });
          return sum / binCount.length;
        },
        getAvgFromTo: (analyser, fromNum, toNum) => {
          var binCount = new Uint8Array(analyser.analyser.frequencyBinCount);
          analyser.frequencies(binCount);
          var length = toNum - fromNum;
          var sum = 0;
          for (var i = 0; i < length; i++) {
            sum += binCount[i];
          }
          return sum / length;
        },
        datatransY: (analyser, height) => {
          //颜色加深算法
          var c = 0;
          var b = this.audioPreperd.getfinaldataZ(analyser);
          var a = (this.audioPreperd.getfinaldataY(analyser) * 6) / height;
          c = (a + (a * b) / (1 - b)) / 2;
          return c / 1.5;
        },

        datatransX: (analyser, width) => {
          //颜色加深算法
          var c = 0;
          var b = this.audioPreperd.getfinaldataZ(analyser);
          var a = (this.audioPreperd.getfinaldataX(analyser) * 6) / width;
          c = (a + (a * b) / (1 - b)) / 2;
          return c / 1.5;
        }
      },
      audioPreperd: {
        getfinaldataY: analyser => {
          var final = 0;
          var low =this.audioEnhanced.getAvgFromTo(analyser, 10, 30);
          var mid =this.audioEnhanced.getAvgFromTo(analyser, 118, 138);
          var hei =this.audioEnhanced.getAvgFromTo(analyser, 220, 240);
          final = 0.5 * low + 0.2 * mid + 0.3 * hei;
          return final;
        },

        getfinaldataX: analyser => {
          var final = 0;
          var low = this.audioEnhanced.getAvgFromTo(analyser, 10, 30);
          var mid = this.audioEnhanced.getAvgFromTo(analyser, 118, 138);
          var hei = this.audioEnhanced.getAvgFromTo(analyser, 220, 240);
          final = 0.2 * low + 0.5 * mid + 0.3 * hei;
          return final;
        },
        getfinaldataZ: analyser => {
          var final = 0;
          var mid = this.audioEnhanced.getAvgFromTo(analyser, 10, 40);
          final = mid / 300;
          return final;
        }
      }
    };
  },
  methods: {
    init() {
      var self = this.three;
      self.width = window.innerWidth;
      self.height = window.innerHeight;
      self.point = new THREE.Vector2(0.8, 0.5);

      self.scene = new THREE.Scene();
      self.clock = new THREE.Clock();
      self.camera = new THREE.PerspectiveCamera(
        100,
        self.width / self.height,
        0.1,
        10000
      );
      self.camera.position.set(0, 0, 300);

      self.hemisphereLight = new THREE.HemisphereLight(this.colors.topColor, this.colors.bottomColor, 0.6);

      self.scene.add(self.hemisphereLight);

      self.light = new THREE.DirectionalLight(this.colors.innerColor, 0.2);

      self.light.position.set(200, 300, 400);

      self.scene.add(this.light);

      var light2 = self.light.clone();
      light2.position.set(200, 300, 400);
      self.scene.add(light2);

      self.geometry = new THREE.IcosahedronGeometry(150, 5); //后面的是模型精度5
      for (var i = 0; i < self.geometry.vertices.length; i++) {
        var vector = self.geometry.vertices[i];
        vector.o = vector.clone();
      }
      var material = new THREE.MeshPhongMaterial({
        emissive: 0xf6c7f1,
        emissiveIntensity: 0.4,
        shininess: 0
      });
      var shape = new THREE.Mesh(self.geometry, material);
      self.shape = shape;
      self.scene.add(shape);

      self.renderer = new THREE.WebGLRenderer();

      self.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      self.renderer.setSize(self.width, self.height);
      // 背景色
      self.renderer.setClearColor(this.colors.bgcColor);

      // show visualization and hide loader
    },

    updateVertices(time) {
      var self = this.three;
      for (var i = 0; i < self.geometry.vertices.length; i++) {
        var vector = self.geometry.vertices[i];
        vector.copy(vector.o);
        var perlin = window.noise.simplex3(
          vector.x * this.sharpNum + time * 0.0002,
          vector.y * this.sharpNum + time * 0.0003,
          vector.z * this.sharpNum
        );
        var ratio = perlin * 0.4 * (self.point.y + 0.1) + 0.8;
        vector.multiplyScalar(ratio);
      }
      self.geometry.verticesNeedUpdate = true;
    },
    render(time) {
      var three = this.three
      this.updateVertices(time)
      three.renderer.setClearColor(this.colors.bgcColor,1.0)
      if(this.isStart){
     var avg =[0,0,0]
     var innerArray = this.innerArray
     for(var i =0;i<innerArray.length;i++){
       innerArray[i].shift()
       if(i===0){
         innerArray[i].push(this.audioPreperd.getfinaldataX(this.myAnalyser))
       }
       if(i===1){
        innerArray[i].push(this.audioPreperd.getfinaldataY(this.myAnalyser))
       }
       if(i===2){
        innerArray[i].push(this.audioPreperd.getfinaldataZ(this.myAnalyser)*300)
       }
     }
      // innerArray.shift()
      // innerArray.push(getfinaldataX(myAnalyser))
      innerArray.forEach((item,i)=>{
        item.forEach((num,j)=>{
          avg[i]+=num
        })
      })
      // innerArray.forEach(item=>{
      //   avg+=item
      // })
      // avg=avg/10
      avg[0] = avg[0]/innerArray[0].length
      avg[1] = avg[1]/innerArray[1].length
      avg[2] = avg[2]/innerArray[2].length
      var innerColor=this.colors.innerColor+this.calEle.x*0x010000*parseInt(avg[0])
      var topColor=this.colors.topColor+this.calEle.y*0x000100*parseInt(avg[1])
      var botColor=this.colors.bottomColor+this.calEle.z*0x000001*parseInt(avg[2])
   
      three.light.color.set(innerColor)
      three.hemisphereLight.color.set(topColor)
      three.hemisphereLight.groundColor.set(botColor)
   }
   else{
      var innerColor=this.colors.innerColor
      var topColor=this.colors.topColor
      var botColor=this.colors.bottomColor
   
      three.light.color.set(innerColor)
      three.hemisphereLight.color.set(topColor)
      three.hemisphereLight.groundColor.set(botColor)
   }
      three.renderer.render(three.scene, three.camera)
      requestAnimationFrame(this.render);
    },
    renderWithMusic() {
      var self = this
      var array = new Uint8Array(this.myAnalyser.analyser.frequencyBinCount);
      this.myAnalyser.frequencies(array);
      TweenMax.to(this.three.point, 0.8, {
        // y: (this.audioEnhanced.getAvg(this.myAnalyser) * 10) / this.three.height,
        // x: (this.audioEnhanced.getAvg(this.myAnalyser) * 10) / this.three.width,
        x: self.audioEnhanced.datatransX(this.myAnalyser,self.three.width),
        y: self.audioEnhanced.datatransY(this.myAnalyser,self.three.height),
        ease: Power4.easeOut
      });
      requestAnimationFrame(this.renderWithMusic);
    },
  changeColor(config){
    this.colors ={...this.colors,...config.colors}
    this.calEle = config.calEle
  },
  changeSharpNum(){

  }
  },

  watch: {
    isStart(newVal) {
      if (newVal) {
        this.myAnalyser = analyser(this.audio);
        requestAnimationFrame(this.renderWithMusic);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.candy {
  position: relative;
  .color-picker {
    position: absolute;
    right: 30px;
    top: 30px;
    z-index:100;
  }

  .spectrogram{
    position:absolute;
    left: 0px;
    top:0;
    z-index:90;
    // transform: rotateZ(90deg);
  }

  .sharp-slider{
    position:absolute;
    top:10px;
    left:10px;
    z-index:100;
  }
}
</style>