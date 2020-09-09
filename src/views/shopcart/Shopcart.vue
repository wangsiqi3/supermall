<template>
  <div class="shop-cart">
      <NavBar class="navbar">
        <div slot="center">购物车({{cartLength}})</div>
        <div slot='right' @click="deleteAll">清空</div>
      </NavBar>
      <Scroll class="content" ref="scroll">
        <CartList ref="cart-list"></CartList>
      </Scroll>
      <CartBottomBar></CartBottomBar>
      
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name:'Shopcart',
  components:
  {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
    },
  computed:{
    ...mapGetters(['cartLength','cartList'])
  },
  activated() {
     this.$refs.scroll.refresh()
  },
  methods:{
    ...mapActions(['deleteAllItem']),
    deleteAll(){
      // console.log('清空');
      this.deleteAllItem()
    }
    
  }
}
</script>

<style scoped>
 .navbar {
   background-color: var(--color-tint);
   color:#fff
 }
 .shop-cart {
   height: 100vh;
 }
 .content {
   height: calc(100% - 44px - 49px - 40px);
   overflow:hidden;
 }
</style>