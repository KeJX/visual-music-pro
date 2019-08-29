<template>
    <div class="sharpSlider">
        <dropdown>
            <button slot="dropdown-trigger" class="sharp-slider-trigger">尖锐度</button>
            <div slot="dropdown-layer" class="sharp-slider-layer">
                <kjx-progress class="slider" :percent="percent" @changePercent = "changePercent"/>
            </div>
        </dropdown>
    </div>
</template>
<script>
import Dropdown from "@/base/Dropdown"
import kjxProgress from "@/base/Progress"
export default {
    name:"sharpSlider",
    props:{
        percent:{
            default:0,
            props:Number
        }
    },
    components:{
        Dropdown,
        kjxProgress
    },
    methods:{
        changePercent(percent){
            this.$emit("changePercent",percent)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.sharpSlider{
    .sharp-slider-trigger{
        width:100px;
        height:40px;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: $main-color;
        color: white;
    }
    .sharp-slider-layer{
        position:absolute;
    box-shadow: 0 0 10px #8e8e8e;

        width:200px;
        background-color: #fff;
        height:50px;
        top:50px;
        right:0;
        border-radius:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        .slider{
            position:relative;
            width:160px;
        }

    }
}
</style>