<template>
  <div class="recommend">
    <div v-for='(item,index) in recommends' :key='index' class="recommend-item">
       <a :href="item.link">
        <img :src='item.image'>
        <div>{{item.title}}</div>
       </a>
    </div>
  </div>
  
</template>

<script>

export default {
  name:'RecommendView',
  props:{
     recommends:{
         type:Array,
        //  默认值必须是个函数
         default() {
             return []
         }
     }
  }
}
</script>

<style scoped>
.recommend{
    display:flex;
    width:100%;
    text-align:center;
    padding:10px 0 20px;
    border-bottom:8px solid #eee
}
.recommend-item{
    flex:1;
}
.recommend-item img {
    width:74px;
    height:74px;
    margin-bottom:8px;
}
</style>