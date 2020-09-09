<template>
  <div class="tab-control">
      <div class="tab-control-item" v-for="(item,index) in titles" :key='index' :class="{active:index===currentIndex}" @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
 name:"TabControl",
 data() {
     return {
         currentIndex:0,
         position0:0,
         position1:this.navPosition,
         position2:this.navPosition,
         flag1:true,
         flag2:true,
         lastClickIndex:0

     }
 },
 props:{
     titles:{
         type:Array,
         default() {
             return []
         }
     },
 },
 methods:{
     itemClick(index){
         this.currentIndex=index;
         this.$emit('tabClick',index);
         this.$emit('newTabClick',index);
       }
     },
}
</script>

<style>
  .tab-control{
      display: flex;
      background-color: #fff;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
  }
  .tab-control-item {
      flex:1
  }
  .tab-control-item span {
      padding:5px
  }
  .active span{
      border-bottom: 3px solid var(--color-high-text);
      color:var(--color-high-text);
  }

</style>