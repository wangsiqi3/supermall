<template>
  <div class="detailNavBar">
    <NavBar class="detailNavBar">
        <div slot="left" class="backHome" @click="backHome">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
             <div v-for='(item,index) in titles' :key="index" class="title-item"
                  :class="{titleActive:index===currentIndex}" @click="titleClick(index)">
                 {{item}}
             </div>
        </div>
        <div slot="right" class="right" @click='cartClick'>
            <img slot='item-icon' src="~assets/img/tabbar/shopcart.svg" alt="">
        </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
 name:'DetailNavBar',
 data() {
     return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
     }
 },
 components:{
     NavBar,
 },
 watch:{
    currentIndex() {
        // console.log('nav.currentIndx改变了');
    }
 },
 methods:{
     titleClick(index) {
          this.currentIndex = index
          this.$emit('titleClick',index)
     },
     backHome() {
         this.$router.back();
        //  this.$router.go(-1);
     },
     cartClick() {
         this.$router.push('/shopcart')
     }
 }
}
</script>

<style scoped>
  .detailNavBar {
      background-color: #fff;
      position:relative;
      z-index: 9;
  }
  .title{
      display: flex;
      font-size: 13px;
  }
  .title-item {
      flex:1
  }
  .titleActive {
      color:var(--color-high-text)
  }
  .backHome img {
      margin-top:10px;
  }
  .right {
      width: 44px;
      height: 44px;
  }
  .right img {
      width: 60%;
      position:relative;
      top:8px;
      right:1px
  }
</style>