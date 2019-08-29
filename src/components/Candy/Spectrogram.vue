<template>
    <canvas ref="spectrogramCanvas" :width="width" :height="height" class="spectrogram" >
        
    </canvas>
</template>
<script>
import { request } from 'http';
export default {
    name:"Spectrogram",
    props:{
        width:{
            type:Number,
            default:window.innerWidth
        },
        height:{
            type:Number,
            default:60
        },
        analyser:null,
        color:{
            type:String,
            default:'#ffffff'
        }
    },
    data(){
        return{
            meterWidth:10,
            gap:2,
            ctx:null,
            
        }
    },
    computed:{
        meterNum(){
           return  this.cwidth/(this.meterWidth+this.gap)
        },
        cheight(){
            return this.height+2
        },
        cwidth(){
            return this.width
        }
    },
 
    mounted(){
        this.ctx = this.$refs.spectrogramCanvas.getContext('2d')
        
        this.ctx.fillStyle=this.color
        this.draw()
    },
    methods:{
        draw(){
            if(!this.analyser) {
            requestAnimationFrame(this.draw)
                return
            }
            var array = new Uint8Array(this.analyser.analyser.frequencyBinCount)
            this.analyser.frequencies(array)
            var step = Math.round(array.length/this.meterNum); //计算采样步长
            this.ctx.clearRect(0, 0, this.cwidth, this.cheight); //清理画布准备画画
            for (var i = 0; i < this.meterNum; i++) {
            var value = array[i * step];//某个值 范围0-255
            value = value>0? value :22;
            this.ctx.fillRect(i * (this.meterWidth+this.gap) /*频谱条的宽度+条间间距*/ , 2, this.meterWidth, this.cheight *(value/255));
            }
            requestAnimationFrame(this.draw)
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
