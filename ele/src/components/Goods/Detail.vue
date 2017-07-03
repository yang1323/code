<template lang="html">
    <div class="detail">
      <div>
        <span class="back" @click.stop="hide"><</span>
        <img :src="food.image" alt="">
        <div class="con">
          <div class="">
            <h3>{{food.name}}</h3>
            <span>月售{{food.sellCount}}份　好评率{{food.rating}}%</span>
            <p>¥<strong>{{food.price}}</strong><span v-if="food.oldPrice">¥{{food.oldPrice}}</span></p>
          </div>
          <div class="addtocart">加入购物车</div>
        </div>
        <div class="info">
          <h3>商品介绍</h3>
          <p>{{food.info}}</p>
          <p v-if="!food.info">暂无介绍</p>
        </div>
        <div class="commonts">
          <h3>商品评价</h3>
          <div class="all">
            <div class="btn">
              <span @click="curtext='all'">全部<em>{{foodratings}}</em></span>
              <span @click="curtext='good'">推荐<em>{{goodcom}}</em></span>
              <span @click="curtext='bad'">吐槽<em>{{foodratings-goodcom}}</em></span>
            </div>
            <div class="select">
              <i class="iconfont icon-gou" :class="{cur:cur}" @click="cur=!cur"></i>只看有内容的评价
            </div>
          </div>
          <div class="texts">
            <ul>
              <li v-for="item in food.ratings" v-if="(!cur||item.text)&&Curtext(item)">
                <p class="datas"><time>{{item.rateTime|getdate}}</time><span>{{item.username}}</span></p>
                <p class="text" v-if="item.text">
                  <i class="iconfont icon-damuzhi" v-if="!item.rateType"></i>
                  <i class="iconfont icon-down" v-else></i>{{item.text}}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import './iscroll.js'
export default {
  data(){
    return {
      cur:false,
      curtext:'all'
    }
  },
  props:{
    food:Object
  },
  methods:{
    hide(){
      this.$emit('hide')
    },
    Curtext(item){
      if(this.curtext=='all'){
          return true;
      }
      if(this.curtext=='good'){
        return item.rateType==0
      }
      if(this.curtext=='bad'){
        return item.rateType==1
      }

    }
  },
  mounted(){
    new IScroll(".detail");
  },
  updated(){
    new IScroll(".detail");
  },
  filters:{
    getdate(time){
      let ti=new Date(time);
      let y=ti.getFullYear();
      let m=ti.getMonth()<10?'0'+ti.getMonth():ti.getMonth();
      let d=ti.getDay()<10?'0'+ti.getDay():ti.getDay();
      let h=ti.getHours()<10?'0'+ti.getHours():ti.getHours();
      let mi=ti.getMinutes()<10?'0'+ti.getMinutes():ti.getMinutes();
      return y+'-'+m+'-'+d+'　'+h+':'+mi;
    }
  },
  computed:{
      goodcom(){
        if(this.food.ratings)
          return this.food.ratings.filter(val=>val.rateType==0).length
      },
      foodratings(){
        if(this.food.ratings)
          return this.food.ratings.length
      },

  }
}
</script>

<style lang="less">
@import "public.less";
.detail{
  position: fixed;
  z-index: 9;
  top:0;
  left:0;
  right:0;
  .bottom(100);
  overflow: hidden;
  background: #f3f5f7;
  .fs(28);
  .back{
    position: absolute;
    .left(5);
    .top(5);
    .fs(50);
    color:#fff;
  }
  &>div>img{
    .w(750);
    .h(750);
  }
  .con{
    background: #fff;
    display: flex;
    justify-content:space-between;
    .padding(36,36,36,36);
    border-bottom: 1px solid rgba(7,17,27,.1);
    h3{
      color:rgb(7,17,27);
      font-weight: bold;
    }
    span,p{
      color:rgb(147,153,159);
      .fs(20);
    }
    p{
      color:rgb(240,20,20);
      strong{
        .fs(28)
      }
      span{
        color:rgb(147,153,159);
        text-decoration: line-through;
        .ml(24);
      }
    }
    .addtocart{
      align-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      .w(148);
      .h(48);
      .fs(20);
      color:#fff;
      .padding(12,24,12,24);
      background: rgb(0,160,220);
      .br(36);
    }
  }
  .info{
    .mt(32);
    .mb(32);
    .padding(36,36,36,36);
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    background: #fff;
    p{
      .fs(24);
      .ml(16);
      color:rgb(77,85,93);
      .lh(48);
    }
  }
  .commonts{
    background: #fff;
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    h3{
      .padding(36,36,36,36);
    }
    .all{
      .padding(0,36,0,36);
      .btn{
        .padding(0,0,36,0);
        border-bottom:1px solid rgba(7,17,27,.1);
        span{
          .padding(16,24,16,24);
          color:rgb(77,85,93);
          .mr(16);
          &:nth-child(1){
            background: rgb(0,160,220);
            color:#fff;
          }
          &:nth-child(2){
            background: rgba(0,160,220,.2);
          }
          &:nth-child(3){
            background: rgba(77,85,93,.2);
          }
          em{
            .fs(16);
            .ml(3);
          }
        }
      }
      .select{
        .mt(24);.mb(24);
        .fs(36);
        color:rgb(147,153,159);
        i{
          .fs(48);
          vertical-align: middle;
          .mr(8);
          &.cur{
            color:rgb(0,160,220);
          }
        }
      }
    }
    .texts{
      .padding(0,36,0,36);
      border-top: 1px solid rgba(7,17,27,.1);
      li{
        .padding(32,0,32,0);
        border-bottom: 1px solid rgba(7,17,27,.1);
        &:last-child{
          border:none;
        }
      }
      .datas{
        .fs(20);
        .mb(12);
        time{
          color:rgb(147,153,159);
        }
        span{
          float: right;
        }
      }
      .text{
        i{
          .mr(8);

        }
        i.icon-down{
          vertical-align: middle;
          color:rgb(147,153,159);
        }
        i.icon-damuzhi{
          vertical-align: top;
          color:rgb(0,160,220);
        }
      }
    }
  }
}

</style>
