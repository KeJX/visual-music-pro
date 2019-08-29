<template>
    <div>
        <dropdown>
            <button slot="dropdown-trigger" class="mode-picker-trigger">模式</button>
            <div slot="dropdown-layer" class="mode-picker-layer">
                <div @click="clickEvent(index)" class="mode-item" v-for="(item, index) in ModeConfigs" :class="{'item-active':(activeIndex==index)}" :key="index">{{item}} </div>
            </div>
        </dropdown>
    </div>
</template>
<script>
import Dropdown from "@/base/Dropdown"
import {ModeConfigs} from "./config"
export default {
    name:"ModePicker",
    components:{
        Dropdown
    },
    data(){
        return {
            ModeConfigs,
            activeIndex:0
        }
    },
    methods:{
        clickEvent(i){
            this.activeIndex=i
        }
    }
}
</script>
<style lang="scss">
@import "~assets/scss/variable";
    .mode-picker-trigger{
         width:100px;
        height:40px;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: $main-color;
        color: white;
    }

    .mode-picker-layer{
    width:360px;
    box-shadow: 0 0 10px #5c5c5c;
    background: #fff;
    padding: 10px;
    position: absolute;
    top: 50px;
    right: 0px;
    border-radius: 20px;
    display: flex;
    flex-flow:row wrap;
    justify-content: space-around;
    align-items: center;
    align-content: flex-start;
    .mode-item:hover,
    .item-active{
        color:$main-color;
    }
    }
</style>