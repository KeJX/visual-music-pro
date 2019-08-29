<template>
    <div class="dropdown" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <slot name="dropdown-trigger" >
        </slot>
        <transition name="dropdown">
        
        <div v-show = "isShow">
            <slot name="dropdown-layer">
        </slot>
        </div>
        </transition>
        
    </div>
</template>
<script>
export default {
    name:"Dropdown",
    data() {
        return {
            isShow:false
        }
    },
    methods:{
        onMouseEnter(){
            this.isShow = true
            console.log(1);
            this.$emit("onMouseEnter")
        },
        onMouseLeave(){
            this.isShow = false
            console.log(2);
            this.$emit("onMouseLeave")
        }
    }
}
</script>
<style lang="scss" scoped>
.dropdown-enter-active,
.dropdown-leave-active{
    transition: opacity .5s;
}

.dropdown-enter,
.dropdown-leave-to{
    opacity:0;
}
</style>