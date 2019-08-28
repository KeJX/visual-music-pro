<template>
    <div class="kjx-cell" @click="clickEvent">
        <slot name="left-icon" class="left-icon"></slot>
        <div class="center" v-if="value">{{value}}</div>
        <slot name="center" class="center" v-if="!value"></slot>
        <slot name="right-icon" class="right-icon"></slot>
    </div>
</template>
<script>
export default {
    name:"kjxCell",
    props:{
        value:{
            type:String,
            default:""
        }
    },
    methods:{
        clickEvent(){
            this.$emit("click")
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixin";
.kjx-cell{
    @include flexCenter(row);
    .center{
        flex:1;
    }
}
</style>