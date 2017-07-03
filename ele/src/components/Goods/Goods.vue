<template lang="html">
<div class="">
  <div class="goods">
      <div class="names">
        <ul>
          <li v-for="(item,idx) in elegoods" @click="curname(idx)" :class="{cur:cur==idx}">
            <div>
              <i v-if="idx==1"></i>
              {{item.name}}
            </div>
          </li>
        </ul>
      </div>
      <div class="items" ref='lists'>
        <ul>
          <li v-for="item in elegoods" class="list">
              <h2>{{item.name}}</h2>
              <ul>
                <li v-for="food in item.foods" class="item" @click="detailshow(food)">
                    <div>
                      <img :src="food.image" alt="">
                      <div class="con">
                          <h3>{{food.name}}</h3>
                          <p>{{food.description}}</p>
                          <span>月售{{food.sellCount}}份　好评率{{food.rating}}%</span>
                          <i><strong>¥</strong>{{food.price}}<span v-if="food.oldPrice">¥{{food.oldPrice}}</span></i>
                      </div>
                    </div>
                    <addtocart :food="food" class="addtocart" @cartball="drop"></addtocart>
                </li>
              </ul>
          </li>
        </ul>
      </div>
  </div>
  <transition name="mark"><div class="cartmark" v-if="Showcart"></div></transition>
  <transition name="incart">
    <ele-incart :foodsincart="elefoods" v-if="Showcart" @clearcart="clearcart"></ele-incart>
  </transition>
  <transition name="ball" v-for="ball in balls"
    @before-enter="beforeEnter"
    @enter="Enter"
    @after-enter="afterEnter"
  >
  <div class="ball" v-show="ball.show">
    <div class="inner">

    </div>
  </div>

  </transition>

  <ele-cart :goodsincart="eleseller" :foodsincart="elefoods" @togglecart="togglecart"></ele-cart>
  <transition name="slide">
    <ele-detail :food="det" v-show="show" @hide="hide"></ele-detail>
  </transition>
</div>
</template>

<script>
import {mapState} from 'vuex';
import './iscroll.js'
import Cart from './Cart'
import addtocart from './addtocart'
import Detail from './Detail'
import Incart from './Incart'
import Vue from 'Vue'
const eventHub = new Vue();
export default {
  data(){
    return {
      cur:0,
      listScroll:'',
      menuScroll:'',
      listop:[0],
      det:{},//详情页数据
      show:false,//详情页是否显示
      cartshow:false,//购物车内容是否显示
      balls:[
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        {show:false}
      ],
      dropballs:[]
    }
  },
  methods:{
    curname(idx){
      this.cur=idx;
      let lis=this.$refs.lists.querySelectorAll('.list');
      this.listScroll.scrollToElement(lis[idx]);
    },
    detailshow(food){
      this.show=true;
      this.det=food;
    },
    hide(){//详情页隐藏
      this.show=false;
    },
    clearcart(){
      this.cartshow=false;
      this.elegoods.forEach(item1=>{
        item1.foods.forEach(item2=>{
            item2.count=0;
        })
      })
    },
    togglecart(){
      this.cartshow=!this.cartshow;
    },
    drop(el){

      for (let i = 0 ; i < this.balls.length ; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropballs.push(ball)
          return
        }
      }
    },
    beforeEnter(el){

      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {

          let rect = ball.el.getBoundingClientRect();

          let x = rect.left - 32 ;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display='';
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.querySelector('.inner')
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    Enter(el){
      el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.querySelector('.inner')
        inner.style.transform = `translate3d(0,0,0)`
      })
    },
    afterEnter(el){
      let ball = this.dropballs.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  mounted(){
    this.listScroll=new IScroll(".items",{probeType:2});
    this.menuScroll=new IScroll(".names");
    let lis=this.$refs.lists.querySelectorAll('.list');
    for(var i=0;i<lis.length;i++){
        this.listop.push(this.listop[i]+lis[i].clientHeight)
    }
    let _this=this;
    this.listScroll.on('scrollEnd',function(){
        let y=Math.abs(this.y);
        for(var i = 0 ; i< _this.listop.length;i++){
            if(!_this.listop[i+1]||(y>=_this.listop[i]&&y<_this.listop[i+1])){
                _this.cur=i;
                _this.menuScroll.scrollToElement(lis[i]);
                break;
            }
        }
    })
  },
  computed:{
    elefoods(){
      let arr=[];
      this.elegoods.forEach(item1=>{
        item1.foods.forEach(item2=>{
          if(item2.count){
            arr.push(item2)
          }
        })
      })
      return arr
    },
    Showcart(){
      if(this.elefoods.length==0){
        this.cartshow=false;
        return this.cartshow;
      }
      return this.cartshow;
    },
    ...mapState(['elegoods','eleseller'])

  },
  components:{
    'ele-cart':Cart,
    'addtocart':addtocart,
    'ele-detail':Detail,
    'ele-incart':Incart
  }
}
</script>

<style lang="less">
@import "public.less";

// @keyframes ball-in{
//   0%{.top(5);.right(5)}
//   20%{.top(-100);.right(500)}
//   100%{.top(1000);.right(800)}
// }
.mark-enter,.mark-leave-active{opacity: 0}
.mark-enter-active,.mark-leave-active{transition:all .5s};

.incart-enter,.incart-leave-active{transform:translateY(100%)}
.incart-enter-active,.incart-leave-active{transition:all .5s};

.slide-enter,.slide-leave-active{transform:translateX(100%);opacity: 0}
.slide-enter-active,.slide-leave-active{transition:all .5s};
// .ball-enter-active{animation: ball-in 1s}
// .drop-enter-active{transition: all 2.4s cubic-bezier(0.49,-0.29,0.75,0.41)}
.goods{
  background: #f3f5f7;
  border-top:1px solid rgba(7,17,27,0.2);
  display: flex;
  position: fixed;
  .top(349);
  .bottom(100);
  overflow: hidden;
  .names{
    .w(180);
    .fs(24);
    color:#666;
    font-weight: 200;
    text-align: left;
    li{
      .h(108);
      .padding(0,24,0,24);
      display: flex;
      align-items: center;
      i{
        display: inline-block;
        .w(24);.h(24);
        background: url(./special_3@2x.png);
        background-size: cover;
        vertical-align: middle;
      }
    }
    li.cur{
      background: #fff;
    }
  }
  .items{
    .w(750-160);
    .fs(24);
    color:rgb(147,153,159);
    &>ul{
      background: #fff;
    }
    h2{
      .fs(24);
      .lh(52);
      border-left: 2px solid #d9dde1;
      .padding(0,0,0,28);
      background: #f3f5f7;
    }
    .item{
      .disb();
      .margin(0,36,0,36);
      border-bottom: 1px solid rgba(7,17,27,.1);
      .padding(36,0,36,0);
      &:last-child{
        border:none;
      }
      img{
        .w(100);
        .h(100);
        height: auto;
        float: left;
        .mr(20);
      }
      .con{
        display: flex;
        flex-direction: column;
        // .w(480);
        h3{
          .fs(28);
          color:rgb(7,17,27);

        }
        p,span{
          .fs(20);
          color:rgb(147,153,159);
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow: hidden;
          .w(300);
        }
        i{
          color:rgb(247,53,59);
          .fs(28);
          font-weight: bold;
          strong{
            .fs(20);
            font-weight: normal;

          }
          span{
            text-decoration: line-through;
            .ml(16);
          }
        }
      }
      .addtocart{
        align-self:flex-end;
        .top(15);
      }

    }
  }

}
.cartmark{
  position: fixed;
  width: 100%;
  top:0;
  bottom:0;
  z-index: 8;
  background: rgba(7,17,27,.8);
  // blur:10px;
}
.ball{
  position: fixed;
  .left(64);
  .bottom(44);
  transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
  .inner{
    .w(30);
    .h(30);
    transition: all 0.4s linear;
    border-radius: 50%;
    z-index: 200;
    background: rgb(0,160,220);
  }
}
</style>
