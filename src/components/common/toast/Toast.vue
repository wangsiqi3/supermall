<template>
  <div class="toast" v-show="isShow1">
     <span>{{message1}}</span>
  </div>
</template>

<script>
export default {
 name:"Toast",
 data(){
   return {
       message1:'',
       isShow1:false
   }
 },
 methods:{
     show(message1,delay){
       this.message1=message1;
       this.isShow1=true;
       setTimeout(()=>{
         this.message1='';
        this.isShow1=false;
       },delay)
     }
 }
}
</script>

<style scoped>
 .toast{
   position: fixed;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   background-color:rgba(0, 0, 0, .6);
   z-index: 9999;
   height: 35px;
   line-height: 35px;
   text-align: center;
   color:#fff;
   
 }
 .toast span {
     padding: 0px 10px;
 }
 
</style>