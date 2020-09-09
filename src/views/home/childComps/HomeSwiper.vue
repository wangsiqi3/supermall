<template>
  <div>
      <Swiper>
         <!-- :key='index' 要加这个 不然报错 -->
          <SwiperItem v-for='(item,index) in banners' :key='index'>
            <a :href="item.link">
                <img :src="item.image" alt="" @load="swiperImageLoad" >
            </a>
          </SwiperItem>
      </Swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  data() {
     return {
       flag:true
     }
  },
  props:{
     banners:{
         type:Array,
        //  默认值必须是个函数
         default() {
             return []
         }
     }
  },
  components:{
      Swiper,
      SwiperItem
  },
  methods:{
    swiperImageLoad(){
      if(this.flag) {
        this.$emit('swiperImageLoad')
        this.flag = !this.flag
      }
    }
  }
}
</script>

<style>

</style>