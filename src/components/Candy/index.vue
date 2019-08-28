<template>
  <div ref="webgl"></div>
</template>
<script>
var THREE = require("three");
import "@/assets/js/TweenMax.min.js";
import { mapState } from "vuex";
var analyser = require("web-audio-analyser");
export default {
  name: "Candy",
  computed: mapState(["isStart", "audio", "startBtn"]),
  created() {
    this.init();
  },
  mounted() {
    this.$refs.webgl.appendChild(this.renderer.domElement);
    requestAnimationFrame(this.render);
  },
  data() {
    return {
        myAnalyser:null
    };
  },
  methods: {
    init() {
       this.width = window.innerWidth
        this.height = window.innerHeight
      this.point = new THREE.Vector2(0.8, 0.5);

      this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();
      this.camera = new THREE.PerspectiveCamera(
        100,
        this.width / this.height,
        0.1,
        10000
      );
      this.camera.position.set(0, 0, 300);

      this.hemisphereLight = new THREE.HemisphereLight(0xe5fd1f, 0x000000, 0.6);

      this.scene.add(this.hemisphereLight);

      this.light = new THREE.DirectionalLight(0xffff00, 0.2);

      this.light.position.set(200, 300, 400);

      this.scene.add(this.light);

      var light2 = this.light.clone();
      light2.position.set(200, 300, 400);
      this.scene.add(light2);

      this.geometry = new THREE.IcosahedronGeometry(150, 5); //后面的是模型精度5
      for (var i = 0; i < this.geometry.vertices.length; i++) {
        var vector = this.geometry.vertices[i];
        vector._o = vector.clone();
      }
      var material = new THREE.MeshPhongMaterial({
        emissive: 0xf6c7f1,
        emissiveIntensity: 0.4,
        shininess: 0
      });
      var shape = new THREE.Mesh(this.geometry, material);
      this.shape = shape;
      this.scene.add(shape);

      this.renderer = new THREE.WebGLRenderer();

      this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      this.renderer.setSize(this.width,this.height);
      // 背景色
      this.renderer.setClearColor(0xf6c7f1);

      // show visualization and hide loader
    },

    updateVertices(time) {
      for (var i = 0; i < this.geometry.vertices.length; i++) {
        var vector = this.geometry.vertices[i];
        vector.copy(vector._o);
        var perlin = window.noise.simplex3(
          vector.x * 0.006 + time * 0.0002,
          vector.y * 0.006 + time * 0.0003,
          vector.z * 0.006
        );
        var ratio = perlin * 0.4 * (this.point.y + 0.1) + 0.8;
        vector.multiplyScalar(ratio);
      }
      this.geometry.verticesNeedUpdate = true;
    },
    render(time) {
      this.updateVertices(time);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    renderWithMusic() {
      var array = new Uint8Array(this.myAnalyser.analyser.frequencyBinCount)
    this.myAnalyser.frequencies(array)
      TweenMax.to(this.point, 0.8, {
        y: (this.getAvg(this.myAnalyser) * 10 / this.height),
        //y: (getnewdata(myAnalyser) * 1 / height),
        //y: (getAvgFromTo(myAnalyser,10,30) * 10 / height),
        //y: (getfinaldataY(myAnalyser)* 6 / height),
        // y: this.datatransY(this.myAnalyser),
        // x: this.datatransX(this.myAnalyser),
        //x: (200 * 10 / height),
        x: (this.getAvg(this.myAnalyser) *10 / this.width),
        ease: Power4.easeOut
      });
      requestAnimationFrame(this.renderWithMusic);
    },

    getAvg(analyser){
         var binCount = new Uint8Array(analyser.analyser.frequencyBinCount)
    analyser.frequencies(binCount)
    var sum = 0
    binCount.forEach(function(item,i) {
    
		sum += item;
    });
    // for(var i =0;i<10;i++){
    //   binCount(10)
    // }
	return (sum / binCount.length)
    },
datatransY(analyser){
//颜色加深算法
var c = 0
var b = getfinaldataZ(analyser)
var a = getfinaldataY(analyser)* 6 / height
c = (a +(a*b)/(1-b))/2
return c/1.5
},

datatransX(analyser){
  //颜色加深算法
  var c = 0
  var b = getfinaldataZ(analyser)
  var a = getfinaldataX(analyser)* 6 / height
  c = (a +(a*b)/(1-b))/2
  return c/1.5
  }
  },

  watch:{
      isStart(newVal){
          console.log(newVal)
          if(newVal){
               this.myAnalyser = analyser(this.audio)
                requestAnimationFrame(this.renderWithMusic)
          }
      }
  }
};
</script>
<style lang="scss" scoped>
</style>