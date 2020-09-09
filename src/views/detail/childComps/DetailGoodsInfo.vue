<template>
  <div class="DetailGoodsInfo" v-if="detailInfo.detailImage">
    <div class="start"></div>
    <div class="detailDesc">{{detailInfo.desc}}</div>
    <div class='end'></div>
    <div class="detailKey">{{detailInfo.detailImage[0].key}}</div>
    <div v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" class="detailImage">
           <img :src="item" alt="" @load="imgLoad">
    </div>
    
  </div>
</template>

<script>
export default {
  name:"DetailGoodsInfo",
  data() {
   return {
     discount:0,
     imageLength:0
   }
  },
  props:{
      detailInfo:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  methods:{
    imgLoad() {
      this.discount++
      // 把this.detailInfo.detailImage[0].list.length放到watch里面 性能比较好 不然这一长串会执行很多次 watch里面只执行一次？
      //这样只会$emit一次
      // if(this.discount===this.detailInfo.detailImage[0].list.length)
      if(this.discount === this.imageLength) {
        // 父子组件不用$bus 直接发就好
        this.$emit('imageLoad')  
      }
      // this.$emit('imageLoad')  这样会$emit很多次
    }
  },
  watch:{
    detailInfo() {
      this.imageLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.DetailGoodsInfo {
  padding:20px 5px 5px;
  margin-top: 20px;
  border-top: 4px solid #eee;
}
 .detailImage img{
  width: 100%;
 }
 .detailDesc {
   padding:15px 0px;
 }
 .start,
 .end {
     width: 150px;
     height: 1px;
     background-color: #a3a3a5;
     position:relative
 }
 .start::before,
 .end::after {
     content:"";
     position: absolute;
     width: 5px;
     height: 5px;
     background-color: #333;
     bottom: 0;
 }
 .end::after {
   right:0
 }
 .start {
   margin-left: 0px;
 }
 .end {
   display: inline-block;
   position:fixed;
   right:8px;
 }
 .detailKey {
   margin: 8px 0px;
 }
</style>