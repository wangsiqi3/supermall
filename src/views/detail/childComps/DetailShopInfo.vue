<template>
  <div class="detail-shop-info">
      <div class="logo">
        <img :src="shop.logo" alt="">
        {{shop.name}}
      </div>
      <div class="shop-sell">
          <span class="shop-all">
            <span><strong>{{shop.sells}}</strong><div>总销量</div> </span>
            <span><strong>{{shop.goodsCount}} </strong><div>全部宝贝</div> </span>
          </span>
          <span class="comment">
             <p v-for="(item,index) in shop.score" :key="index" >
                 {{item.name}}  <span :class="{isBetter:!item.isBetter}"><i>{{item.score}}</i> <em :style="{backgroundColor:item.isBetter?'red':'green'}">{{item.isBetter?'高':'低'}}</em> </span>
            </p>
          </span>
      </div>
      <a href="">
          <div class="welcome">
          进店逛逛
      </div>
      </a>
  </div>
</template>

<script>
export default {
 name:"DetailShopInfo",
 props:{
     shop:{
         type:Object,
         default() {
             return {}
         }
     }
 }
}
</script>

<style scoped>
.detail-shop-info {
    padding:0px 5px;
}
.logo {
    margin: 30px 0px;
    font-size: 16px;
}
  .logo img{
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }
  .shop-sell {
       display: flex;
  }
  .shop-sell>span {
      flex:1;
  }
  .shop-all {
       display: flex;
      margin-left: 20px;
      margin-top: 10px;
      height: 54px;
      border-right: 1px solid #ccc;
  }
  .shop-all>span {
      flex:1;
      text-align: center;
  }
  .shop-all strong {
      font-size: 20px;
      
  }
  .shop-all div {
      margin-top: 10px;
  }
  .comment {
      position:relative;
      top:-12px;
     margin-left: 30px;
     text-align: left;
  }
  .comment p {
      position:relative;
      margin: 10px 0px;
  }
  .comment p span {
      color:red;
  }
  .comment p i {
      display: inline-block;
      font-style: normal;
      width: 25%;
  }
  .comment p em {
      margin-right: 5px;
     
      font-style: normal;
      width: 18px;
      height: 18px;
      color:white
  }
   .comment p .isBetter {
      color:green
  }
  .welcome {
      width: 240px;
      height: 40px;
      line-height: 40px;
      margin: auto;
      text-align: center;
      background-color: #eee;
      border-radius:20px
  }
</style>