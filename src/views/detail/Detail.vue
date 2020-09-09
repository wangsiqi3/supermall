<template>
  <div id="detail">
      <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
      <Scroll class='content' ref='scroll' 
              :probeType='3'
              @scroll="contentScroll">
      <DetailSwiper :topImages='topImages'></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad='detailImageLoad'></DetailGoodsInfo>
      <DetailInfoParams ref="params" :infoParams='infoParams'></DetailInfoParams>
      <DetailCommentInfo ref="comment" :commentInfo='commentInfo'></DetailCommentInfo>
      <GoodsList  ref="recommend" :goods="recommendInfo"></GoodsList>
      </Scroll>
      <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
      <BackTop  v-show="isShowBackTop" @click.native="backTop"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailInfoParams from "./childComps/DetailInfoParams"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import GoodsList from "components/content/goods/GoodsList"
import {debounce} from "common/utils"
import {getDetail,getRecommend,Goods,Shop,Params} from "network/detail.js" 
import Scroll from "components/common/scroll/Scroll"
import {itemLisenerMinxin,backTopMixin} from "common/mixin"
import {mapActions} from "vuex"


export default {
 name:'Detail',
 data(){
     return {
         iid:null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         infoParams:{},
         commentInfo:{},
         recommendInfo:[],
         themeTopYs:[],
         currentIndex:0,
     }
 },
 components:{
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     DetailGoodsInfo,
     DetailInfoParams,
     DetailCommentInfo,
     DetailBottomBar,
     GoodsList,
     Scroll,

 },
 mixins:[itemLisenerMinxin,backTopMixin],
 created() {
     this.iid= this.$route.params.iid//拿到地址栏中的参数iid
     
     getDetail(this.iid) //请求详情数据
       .then(res=>{
        //console.log(res);
           const data = res.result
           this.topImages=data.itemInfo.topImages
           this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
           this.shop = new Shop(data.shopInfo)
           this.detailInfo = data.detailInfo
           this.infoParams = new Params(data.itemParams.info,data.itemParams.rule) 
           if(data.rate.cRate!==0){
               this.commentInfo = data.rate.list[0]
           }
           this.$nextTick(()=>{
                
           })
                    })
     getRecommend() //请求推荐数据
       .then(res=>{
           this.recommendInfo = res.data.list
                  })
                
    
 },

 destroyed(){
    //  console.log('离开详情页');
     this.$bus.$off('imageLoad', this.itemImgListener)
 },
 methods:{
     ...mapActions(['addCart']),
     contentScroll(position){
        this.listenIsShowBackTop(position,1000)
        const positionY = -position.y;
        // 我自己的做法
        // 一、有BUG
        // 如果从小到大就要写小于号
        // 而且这样有个bug 如果没有评论 就会直接从0->3  1和2被跳过了 因为12的判断条件里面出现了this.themeTopYs[2]而如果没有评论的话 这个是undefined
        // if(-position.y>=0&&-position.y<this.themeTopYs[1]) {
        //     this.$refs.nav.currentIndex = 0;
        //     console.log(this.$refs.nav.currentIndex);
        // } else if(-position.y>=this.themeTopYs[1]&&-position.y<this.themeTopYs[2]){
        //     this.$refs.nav.currentIndex = 1;
        //     console.log(this.$refs.nav.currentIndex);
        // } else if(-position.y>=this.themeTopYs[2]&&-position.y<this.themeTopYs[3]) {
        //     this.$refs.nav.currentIndex = 2;
        //     console.log(this.$refs.nav.currentIndex);
        // } else if(-position.y>=this.themeTopYs[3]){
        //     this.$refs.nav.currentIndex = 3;
        //     console.log(this.$refs.nav.currentIndex);
        // }

        // 二、正常
        // 如果从大到小就不用写那么长的判断条件
        // 而且即使没有评论 也能正常显示
        if(positionY>=this.themeTopYs[3]){
            // 进行判断 让它每个范围只执行一次 不然会很多很多次
            if(this.$refs.nav.currentIndex !== 3){
                 this.$refs.nav.currentIndex = 3;
            }  
        } else if(positionY>=this.themeTopYs[2]) {
             if(this.$refs.nav.currentIndex !== 2){
                 this.$refs.nav.currentIndex = 2}
        } else if(positionY>=this.themeTopYs[1]){
             if(this.$refs.nav.currentIndex !== 1){
                 this.$refs.nav.currentIndex = 1}
        } else{
             if(this.$refs.nav.currentIndex !== 0){
                 this.$refs.nav.currentIndex = 0}
        }

        //三、老师优化之后的做法
        // 这样做法还是有bug  在没有评论部分的页面 会跳过12 直接0->3 和我自己的第一种做法一样的原因
        // const length = this.themeTopYs.length
        // for(let i=0;i<length-1;i++) {
        //     if(positionY >= this.themeTopYs[i]&&positionY < this.themeTopYs[i+1]){
        //         this.$refs.nav.currentIndex=i
        //     }
        // }
        
     },
     detailImageLoad() {
         this.$refs.scroll.refresh();
        //this.themeTopYs=[]  因为我们发射这个detailImageLoad的时候已经有让他只$emit一次 既然只有一次 也就不需要this.themeTopYs=[]了
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
     },
     titleClick(index) {
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
     },
     addToCart() {
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // this.$store.commit('addCart',product)
            // this.$store.dispatch('addCart',product).then(res=>{this.toastMessage=res}) 
            // 用了mapActions之后 就可以简化成下面这行
            this.addCart(product).then(res=>{this.$toast.show(res,1000)})
        }
 }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
 }
 .content {
     position: absolute;
     top: 44px;
     left: 0px;
     right: 0px;
     bottom: 49px;
 }
 ul {
     position:fixed;
     z-index: 10000;
     background: #fff;

 }
</style>