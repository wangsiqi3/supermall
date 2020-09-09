<template>
  <div class="wrapper" ref='wrapper'>
      <div class="content">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
 name:'Scroll',
 data(){
     return {
         scroll:null,
     }
 },
 props:{
   probeType:{
             type:Number,
             default:0
         },
   pullUpLoad:{
       type:Boolean,
       default() {
           return false
       }
   }
 },
 mounted() {
     this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:true,//加了这个 新款流行精选才能点击进行切换
        pullUpLoad:this.pullUpLoad
     })
     this.scroll.on('scroll',(position)=>{
         this.$emit('scroll',position)
     })
     this.scroll.on('pullingUp',()=>{
         this.$emit('pullingUp')
     })
 },
 methods:{
     scrollTo(x,y,time=300) {
        this.scroll.scrollTo(x,y,time)
     },
     finishPullUp(){
         this.scroll.finishPullUp();
     },
     refresh() {
        // console.log("更新refresh");
        this.scroll.refresh();
     },
     getScrollY() {
         return this.scroll.y
     }
 }

}
</script>

<style scoped>

</style>