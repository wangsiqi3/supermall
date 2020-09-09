<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <div class="goods-info-box">
            <span class="price">{{goodsItem.price}}</span>
            <span class="cfav">{{goodsItem.cfav}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
 name:'GoodsListItem',
 props:{
     goodsItem:{
         type:Object,
         default() {
             return {}
         }
     }
 },
 computed:{
     showImage(){
       return this.goodsItem.image||this.goodsItem.show.img
     }
 },
 methods:{
    //   @load="imgLoad"
    //  imgLoad(){
    //      this.$bus.$emit('imgLoad')
    //  }
    goodsItemClick(){
        this.$router.push('/detail/'+ this.goodsItem.iid) //必须用push才可以返回 跳转到详情页 带参数的话detail后要加个/
    },
    imageLoad() {
        this.$bus.$emit('imageLoad')
        // 29、解决方法1
        // if(this.$route.path.indexOf('/home')) {
        //     this.$bus.$emit('homeImageLoad')
        // } else if(this.$route.path.indexOf('/detail')) {
        //     this.$bus.$emit('detailImageLoad')
        // }
    }
 }
}
</script>

<style scoped>
   
   .goods-list-item img {
       width:100%;
       border-radius: 5px;

   }
   .goods-info {
       height: 40px;
   }
  
   .goods-info p {
       /* 不换行 */
       white-space: nowrap;
       overflow:hidden;
       /* 省略号 */
       text-overflow: ellipsis;
   }
   .goods-info-box {
       text-align: center;
   }
   .price {
       color:var(--color-tint)
   }
   .cfav::before {
       content:'';
       /* 行内元素 没办法设宽高的 所以要转成行内块 或者定位、浮动就可以转*/
       display: inline-block;
       width: 14px;
       height: 14px;
       background: url('~assets/img/common/collect.svg') 0px 0px no-repeat  ;
       background-size: 14px 14px;
       margin:0px 3px;
   }
</style>