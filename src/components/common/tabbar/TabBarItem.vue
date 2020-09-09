<template>
  <div class="tab-bar-item" @click='itemClick'>
    <div v-if='!isActive'><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style='activeStyle'><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  data() {
      return {
        //   isActive:true
      }
  },
//props？ App.vue调用了TabBarItem组件  所以相当于子组件TabBarItem从父组件App.vue拿path
  props: {
      path:String,
      activeColor:{
          type:String,
          default:'#ff5777'
      }
  },
  computed: {
    isActive() {
    //   return this.$route.path === this.path
    return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive?{color: this.activeColor}:{}
    }
  },
  methods: {
     
    itemClick() {
    // 自己加的 不然重复点同一个会报错
    //  if(this.$route.path  ==this.path) {
    //         return false
    // }
    // 或者
    if(this.$route.path !==this.path) {
      this.$router.push(this.path)}  
    }
  }
}

</script>

<style>
  .tab-bar-item {
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active{
      color:red
  } */
</style>