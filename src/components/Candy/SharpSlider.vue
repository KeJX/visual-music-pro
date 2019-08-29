<template>
    <div class="sharpSlider">
        <dropdown>
            <button slot="dropdown-trigger" class="sharp-slider-trigger">尖锐度</button>
            <div slot="dropdown-layer" class="sharp-slider-layer">111</div>
        </dropdown>
    </div>
</template>
<script>
import Dropdown from "@/base/Dropdown"
export default {
    name:"sharpSlider",
    components:{
        Dropdown
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.sharpSlider{
    .sharp-slider-trigger{
        padding:10px;
        border-radius: 5px;
        background-color: $main-color;
    }
    .sharp-slider-layer{
        background-color: #fff;
    }
}
</style>