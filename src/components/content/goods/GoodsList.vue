<template>
  <div class="goods-list">
    <GoodsListItem class="item" v-for='(item,index) in goods' :key="index" :goodsItem="item">
    </GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name:"GoodsList",
  components:{
        GoodsListItem,
  },
  props:{
    goods:{
        type:Array,
        default() {
            return []
        }    
        }
  }
}
</script>

<style>
   .goods-list {
       display: flex;
       flex-wrap: wrap;
       justify-content: space-around;
       padding:2px
   }
   .item {
       width:48%
   }
</style>