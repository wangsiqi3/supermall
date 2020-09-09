<template>
   <div class="detail-base-info" v-if="goods.services">
       <div class="info-title">{{goods.title}}</div>
       <div class="price">
           <span class="new-price">{{goods.newPrice}}</span>
           <span class="old-price">{{goods.oldPrice}}</span>
           <span class="discount" v-show='goods.discount'>{{goods.discount}}</span>
       </div>
       <div class="info-collect">
           <span>{{goods.columns[0]}}</span>
           <span class="collect">{{goods.columns[1]}}</span>
           <span class="sevenday">{{goods.services[goods.services.length-1].name}}</span>
       </div>
       <div class="info-service">
           <span v-for="index in goods.services.length-1" :key="index">
               <img :src="goods.services[index-1].icon" alt="">
               {{goods.services[index-1].name}}
           </span>
       </div>
   </div>
</template>

<script>
export default {
 name:"DetailBaseInfo",
 props:{
     goods:{
         type:Object,
         default() {
             return {}
         }
     }
 }
}
</script>

<style scoped>
 .detail-base-info {
     padding:0px 5px;
 }
 .info-title {
     margin: 10px 0px;
     text-align: left;
     font-size: 14px;
 }
 .price {
     margin-bottom: 15px;
 }
 .new-price {
     color:var(--color-high-text);
     font-size: 18px;
     margin-right: 3px;
 }
 .old-price {
     font-size: 8px;
     color:#aaa;
     text-decoration:line-through;
     margin-right: 3px;
 }
 .discount{
     font-size: 12px;
     color:#fff;
     background-color: var(--color-high-text);
     padding: 2px;
     border-radius: 6px;
     position:relative;
     top:-7px;
 }
 .info-collect {
     display: flex;
    font-size: 12px;
    color:#aaa;
    padding-bottom: 5px;
    box-shadow: 0px 2px 1px rgba(100, 100, 100, .1);
 }
 .info-collect span{
      flex:1;
      text-align: left;
 }
 .info-collect .collect {
     text-align: center;
 }
 .info-collect .sevenday
{
     text-align: right;
 }
 .info-service{
     display: flex;
     font-size: 12px;
     padding: 15px 0px;
    box-shadow: 0px 4px 1px rgba(100, 100, 100, .1);
    text-align: center;

 }
 .info-service span {
     flex:1;
     color: #333;
 }
 .info-service span:last-child{
     text-align: right;
 }
 .info-service span:first-child {
     text-align: left;
 }
 .info-service img {
     width: 14px;
     height: 14px;
     vertical-align: middle;
 }
</style>