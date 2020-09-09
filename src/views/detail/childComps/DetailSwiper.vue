<template>
   <div>
       <Swiper class="detail-swiper">
           <SwiperItem v-for='(item,index) in topImages' :key='index'>
              <img :src="item">
           </SwiperItem>
       </Swiper>
   </div>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
 name:"DetailSwiper",
 props:{
     topImages:{
        type:Array,
        default() {
            return []
        }
     }
 },
 components:{
     Swiper,
     SwiperItem
 }
}
</script>

<style scoped>
.detail-swiper {
    /* margin-top:43px; */
    height:300px;
}

</style>