<template>
  <div class="bottom-bar">
   <div>
      <div class="serve">
        <div></div>
        <p>客服</p>
      </div>
      <div class="shop"> 
        <div></div>
        <p>店铺</p>
      </div>
      <div class="cfav">
        <div></div>
        <p>收藏</p>
      </div>
   </div>
   <div class="buy">
     <div class="cart" @click="addCart">
       加入购物车
     </div>
     <div class="purchase">
       购买
     </div>
   </div>
  </div>
</template>

<script>
export default {
 name:"DetailBottomBar",
 methods:{
   addCart(){
     this.$emit('addToCart')
   }
 }
}
</script>

<style scoped>
 .bottom-bar {
     height: 49px;
     position:fixed;
     bottom: 0;
     left: 0;
     right: 0;
     background-color: #fff;
     display:flex;
 }
  .bottom-bar>div {
      flex:1;
      display: flex;
  }
  .bottom-bar>div>div{
      flex:1;
      text-align: center;
  }
  .serve>div {
      width: 24px;
      height: 24px;
      background: url("~assets/img/detail/detail_bottom.png") 0px 106px;
      background-size: 24px;
      margin: 2px auto 3px;
  }
  .shop>div {
      width: 24px;
      height: 24px;
      background: url("~assets/img/detail/detail_bottom.png") 0px 56px;
      background-size: 24px;
      margin: 2px auto 3px;
  }
  .cfav>div{
      width: 24px;
      height: 24px;
      background: url("~assets/img/detail/detail_bottom.png") 0px 165px;
      background-size: 24px;
      margin:2px auto 3px;
  }
  .buy{
      line-height: 49px;
  }
  .cart {
      background-color:rgb(240, 198, 10);
      color:#000
  }
  .purchase {
      background-color: deeppink;
      color:#fff
  }
</style>