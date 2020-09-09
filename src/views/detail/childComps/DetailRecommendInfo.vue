<template>
  <div class="recommend" v-if="recommendInfo">
    <div v-for='(item,index) in recommendInfo' :key='index' class="recommend-item">
       <a :href="item.item_h5_url">
        <img :src='item.image'>
        <div class="title">{{item.title}}</div>
        <div class="goods-info-box">
            <span class="price">{{item.price}}</span>
            <span class="cfav">{{item.cfav}}</span>
        </div>
       </a>
    </div>
  </div>
</template>

<script>
export default {
 name:"DetailRecommendInfo",
 props:{
     recommendInfo:{
         type:Array,
         default() {
             return []
         }
     }
 },
 components:{
   
 }
}
</script>

<style scoped>
.recommend{
    display:flex;
    width:100%;
    text-align:center;
    padding:10px 8px 20px;
    border-top: 4px solid #eee;
    flex-wrap: wrap;
    justify-content: space-around;

}
.recommend-item{
    width: 48%;
}
.recommend-item img {
    width:100%;
    margin-bottom:8px;
    border-radius: 8px;
}
.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.goods-info-box {
       text-align: center;
   }
   .price {
       color:var(--color-tint)
   }
   .cfav::before {
       content:'';
       /* 行内元素 没办法设宽高的 所以要转成行内块 或者定位、浮动就可以转*/
       display: inline-block;
       width: 14px;
       height: 14px;
       background: url('~assets/img/common/collect.svg') 0px 0px no-repeat  ;
       background-size: 14px 14px;
       margin:0px 3px;
   }
</style>