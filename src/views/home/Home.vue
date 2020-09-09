<template>
  <div id="home">
    <NavBar class='home-nav' ref='navbar'><div slot='center'>购物街</div></NavBar>
    <TabControl v-show="isTabFixed" :titles="titles" class="new-tab-control" :class="{isTabFixed:isTabFixed}" @tabClick='tabClick' @newTabClick="newTabClick" ref="newTabControl" 
    ></TabControl>
    <Scroll class="content"
           :probeType="3" 
           :pullUpLoad='true' 
            @pullingUp='loadMore'
           @scroll="contentScroll" 
           ref="scroll" 
           key="home" >
      <HomeSwiper :banners='banners' class="home-swiper" @swiperImageLoad='swiperImageLoad'></HomeSwiper>
      <RecommendView :recommends='recommends'></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="titles" class="tab-control" :class="{isTabFixed:isTabFixed}" @tabClick='tabClick' ref="tabControl" ></TabControl>
      <GoodsList :goods='showGoods'></GoodsList>
    </Scroll>
    <BackTop @click.native="backTop" v-show='isShowBackTop'></BackTop>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'

import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {debounce} from "common/utils"
import {itemLisenerMinxin,backTopMixin} from "common/mixin"
export default {
      name:'Home',
      data(){
            return {
              banners: [],
              recommends:[],
              titles:['流行','新款','精选'],
              goods:{
                pop:{page:0,list:[]},
                new:{page:0,list:[]},
                sell:{page:0,list:[]}
              },
              currentType:'pop',
              Type:['pop','new','sell'],
              offsetTop:0,
              isTabFixed:false,
              saveY:0,
              // position:0,
              navPosition:0,
              currentIndex:0,
              tabControlPosition:[]
            }
            },
      components:{
              Scroll,
              NavBar,
              TabControl,
              HomeSwiper,
              RecommendView,
              FeatureView,
              GoodsList,
            },
      mixins:[itemLisenerMinxin,backTopMixin],
      watch:{
          isTabFixed(){
            this.tabControlPosition=[-this. navPosition,-this.navPosition,-this.navPosition]
          }
      },
      // 生命周期 组件创建完created的时候发送请求 拿数据
      created() {
              this.getHomeMultidata()
              this.getHomeGoods('pop')
              this.getHomeGoods('new')
              this.getHomeGoods('sell')
              
            },
      // 加了keep-alive才有活跃和不活跃状态
      deactivated() {
         this.saveY = this.$refs.scroll.getScrollY()
         //取消全局事件的监听
         this.$bus.$off('imageLoad', this.itemImgListener)
      },
      activated() {
        // console.log("回来首页Home了");
        this.$refs.scroll.refresh() //一定要加这个 不然会一回到首页没有停留在saveY
         this.$refs.scroll.scrollTo(0,this.saveY,0)   

        //  老师没有写这个 但我觉得要写这个 不然我回到首页滚不下去的
         this.$bus.$on('imageLoad', this.itemImgListener)

      },
      computed:{
              showGoods() {
                  return this.goods[this.currentType].list
              }
            },
      methods:{
             tabClick(index) {
                this.currentType=this.Type[index] //这里老师是用switch做的 没有给Type数组
                // 这两句让两个tabControl可以同步切换
                this.$refs.newTabControl.currentIndex=index
                this.$refs.tabControl.currentIndex=index
              },
              newTabClick(index){
                this.currentIndex=index 
                this.$refs.scroll.scrollTo(0,this.tabControlPosition[index],0)
              },
              contentScroll(position) {
                this.tabControlPosition[this.currentIndex] = position.y
                this.navPosition=this.$refs.tabControl.$el.offsetTop+43
                // 1、判断BackTop是否显示
                this.listenIsShowBackTop(position,3000)
                // 2、决定tabControl是否吸顶（position:fixed）
                this.isTabFixed = -position.y>=this.$refs.tabControl.$el.offsetTop+43
              },
              loadMore() {
                this.getHomeGoods(this.currentType)
                // 还有个bug 加载更多之后滑不上去  refresh 就会重新计算可滑动高度
                // this.$refs.scroll.refresh() 
                // 这里最好给一个定时器 不然有可能上拉一下请求到两次数据
                setTimeout(()=>{
                this.$refs.scroll.finishPullUp()//这一句老师是放到getHomeGoods里面 笔记有
                },500) 
              },
              swiperImageLoad() {
                this.offsetTop = this.$refs.tabControl.$el.offsetTop
              },

              // 网络请求相关的方法
              getHomeMultidata() {
                   getHomeMultidata().then(res=>{
                // 这样写太长 有两个data 我们可以在发送请求的时候拦截响应res  return一个res.data  
                // this.banner=res.data.data.banner.list
                this.banners=res.data.banner.list
                this.recommends=res.data.recommend.list
              })
              },
              getHomeGoods(type) {
                  const page = ++this.goods[type].page;
                  getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list)//push(10,20,30)可以 push([10,20,30])不可以 所以要用...把数组的元素一个个解析成10,20,30 
                  })
              }
            }
            }
</script>

<style scoped>
#home {
  position: relative;
  /* vh是viewport height 视口高度  100个视口就是100%高度 
  不然#home会被内容撑得非常非常高 或者没有标准流内容的时候直接为0 */
  height: 100vh;
}
.home-nav {
   background-color: var(--color-tint);
   color:#fff;
}
.home-swiper {
   margin-top: 43px;
}
.new-tab-control {
  /* 用了Scroll之后这里就不起效果了 原生滚动才需要写这个  */
  /* 我们这三句是写给new-tab-control的 */
  position: sticky;
  top:43px;
  z-index:9
}
.content{
  /* 因为用了Scroll一定要确定滚动的高度 */
  /* 如何给content确定高度  可以用定位  */
  position: absolute;
  top:44px;
  bottom: 49px;
  left:0px;
  right:0px;
  overflow: hidden;
}
/* .isTabFixed {
  position:fixed;
  top:0;
  right: 0;
  left: 0;
  z-index:9
} */

</style>