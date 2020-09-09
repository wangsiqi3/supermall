<template>
  <div class="comment-info" v-if="commentInfo.images">
    <div class="user-comment">用户评价 <span class="more">更多</span> </div>
    <div>
        <div class="user">
            <img :src="commentInfo.user.avatar" alt="">{{commentInfo.user.uname}}
        </div>
        <p class="content">{{commentInfo.content}}</p>
        <p class="style">
            <span>{{commentInfo.created | showDate}}</span>
            <span>{{commentInfo.style}}</span>
        </p>
        <span class="comment-images" v-for="(item,index) in commentInfo.images" :key="index">
            <img :src="item" alt="">
        </span>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
 name:"DetailCommentInfo",
 props:{
     commentInfo:{
         type:Object,
         default(){
             return {}
         }
     }
 },
 filters:{
    showDate(value) {
     const date = new Date(value*1000)
     return formatDate(date,'yyyy-MM-dd hh:mm:ss') 
    }
    
 }
}
</script>

<style scoped>
  .comment-info {
      padding: 0px 10px 3px;
      border-bottom: 4px solid #eee;
      margin-bottom: 3px;
  }
  .user-comment {
      padding: 20px 0px;
      margin-top: 20px;
      border-top: 4px solid #eee;
      border-bottom: 1px solid #eee;
      position: relative;
      color:#333
  }
  .more {
      position: absolute;
      right: 8px;
  }
  .user img{
      width: 40px;
      height: 40px;
      vertical-align: middle;
      border-radius: 20px;
      margin: 10px 10px 10px 0px;
  }
  .content {
      padding-right:5px;
      margin-top: 5px;
  }
  .style{
      color:#bbb;
      font-size: 12px;
      margin-top: 10px;
  }
  .comment-images {
      display: inline-block;
      width: 23%;
      height: 80px;
      overflow: hidden;
      margin: 8px 5px 10px 0px;
  }
  .comment-images img {
      width: 100%;
      height: 100%;
      
  }
  .style span{
      margin-right: 5px;
  }
</style>