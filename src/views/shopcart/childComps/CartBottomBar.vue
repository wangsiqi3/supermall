<template>
  <div class="button-bar">
      <div class="allSelect">
         <CheckButton @click.native="allClick" :isChecked='isSelectAll'></CheckButton>
         <span>全选</span>
      </div>
      <div class="totalPrice">
          合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calClick">
          去计算：{{checkLength}}
      </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"
import {mapGetters} from 'vuex'

export default {
 name:"CartBottomBar",
 data(){
     return {
       
     }
 },
 components:{
     CheckButton
 },
 computed:{
     ...mapGetters(['cartList']),
     totalPrice(){
         return '￥'+this.cartList.filter(item=>item.checked)
                             .reduce((preValue,item)=>preValue+item.price*item.count,0)
                             .toFixed(2)
     },
     checkLength(){
         return this.cartList.filter(item=>item.checked).length
     },
     isSelectAll(){
         if(this.cartList.length===0){return false}
        //  return !(this.cartList.filter(item=>!item.checked).length)
        return !this.cartList.find(item=>!item.checked)
     }
 },
 methods:{
     allClick(){
            if(this.isSelectAll){
                this.cartList.forEach(item=>item.checked=false)
            }else {
                this.cartList.forEach(item=>item.checked=true)
            }
        
     },
     calClick() {
         if(!this.checkLength) {
             this.$toast.show('请选择商品',1000)
         }
     }
 }
}
</script>

<style scoped>
  .button-bar{
      display:flex;
      height: 40px;
      background-color:#eee;
      line-height: 40px;
  }
  .allSelect{
      flex:1.5;
      display: flex;
      margin-left: 5px;
      align-items: center;
  }
  .allSelect span {
      margin-left: 5px;
  }
  .totalPrice{
      flex:3;
      color:#333
      
  }
  .calculate{
      flex:1.5;
      height: 40px;
      text-align: center;
       line-height: 40px;
      background-color: red;
      color:#fff
  }
</style>