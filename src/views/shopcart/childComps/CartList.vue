<template>
  <div class="cart-list">
        <CartListItem v-for="(item,index) in cartList" :key="index" :product="item"></CartListItem>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from "./CartListItem"
export default {
 name:"CartList",
 components:{
   CartListItem,
 },
 computed:{
    ...mapGetters(['cartList'])
 }
}
</script>

<style>

</style>