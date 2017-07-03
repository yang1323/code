<template lang="html">
  <div class="commonts">
    <div>
      <div class="score">
        <div class="com">
          <h3>{{eleseller.score}}</h3>
          <span>综合评价</span>
          <p>高于周边商家{{eleseller.rankRate}}%</p>
        </div>
        <div class="items">
            <p class="foodScore">商品评分
              <ele-star :elescore="eleseller.foodScore"></ele-star>
              <span>{{eleseller.foodScore}}</span>
            </p>
            <p class="serviceScore">服务态度
              <ele-star :elescore="eleseller.serviceScore"></ele-star>
              <span>{{eleseller.serviceScore}}</span>
            </p>
            <p class="gettime">送达时间
              <i>{{eleseller.deliveryTime}}分钟</i>
            </p>
        </div>
      </div>
      <div class="all">
        <div class="btn">
          <span @click="curtext='all'">全部<em>{{foodratings}}</em></span>
          <span @click="curtext='good'">满意<em>{{goodcom}}</em></span>
          <span @click="curtext='bad'">不满意<em>{{foodratings-goodcom}}</em></span>
        </div>
        <div class="select">
          <i class="iconfont icon-gou" :class="{cur:cur}" @click="cur=!cur"></i>只看有内容的评价
        </div>
      </div>
      <div class="content">
        <ul>
          <li v-for="item in eleratings" v-if="(item.text||!cur)&&Curtext(item)" >
            <div class="news">
              <img :src="item.avatar" alt="">
              <div class="con">
                <span>{{item.username}}</span>
                <p>
                  <ele-star-small :elescore="item.score"></ele-star-small>
                  <i v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</i>
                </p>
              </div>
              <div class="time">
                {{item.rateTime|getdate}}
              </div>
            </div>
            <div class="info">
              {{item.text}}
            </div>
            <div class="eva">
              <i class="iconfont icon-damuzhi" v-if="!item.rateType"></i>
              <i class="iconfont icon-down" v-else></i>
              <div class="recommend">
                <span v-for="rec in item.recommend">{{rec}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../static/iscroll.js'
import {mapState} from 'vuex';
import Star0 from '../Star/Star0'
import Star00 from '../Star/Star00'
export default {
  data(){
    return {
      cur:false,
      curtext:'all'
    }
  },
  computed:{
    ...mapState(['eleseller','eleratings']),
    goodcom(){
      if(this.eleratings)
        return this.eleratings.filter(val=>val.rateType==0).length
    },
    foodratings(){
      if(this.eleratings)
        return this.eleratings.length
    },

  },
  mounted(){
    new IScroll(".commonts")
  },
  updated(){
    new IScroll(".commonts")
  },
  methods:{
    Curtext(item){

      if(this.curtext=='all'){
        return true
      }else if(this.curtext=='good'){
        return item.rateType==0
      }else{
        return item.rateType==1
      }
    }
  },
  components:{
    'ele-star':Star0,
    'ele-star-small':Star00
  },
  filters:{
    getdate(time){
      let ti=new Date(time);
      let y=ti.getFullYear();
      let m=ti.getMonth()<10?'0'+ti.getMonth():ti.getMonth();
      let d=ti.getDay()<10?'0'+ti.getDay():ti.getDay();
      let h=ti.getHours()<10?'0'+ti.getHours():ti.getHours();
      let mi=ti.getMinutes()<10?'0'+ti.getMinutes():ti.getMinutes();
      return y+'-'+m+'-'+d+' '+h+':'+mi;
    }
  }
}
</script>

<style lang="less" scoped>
@import "./public.less";
.commonts{
  position: fixed;
  .top(349);
  .bottom(0);
  overflow-x: hidden;
  .fs(24);
  background: #f3f5f7;
  .score{
    display: flex;
    .padding(36,0,36,0);
    background: #fff;
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    .com{
      .w(275);
      text-align: center;
      flex-shrink:0;
      h3{
        .fs(48);
        color:rgb(255,153,0);
      }
      span{
        display: block;
        .fs(24);
        color:rgb(7,17,27);
        .margin(3,0,8,0);
      }
      p{
        .fs(20);
        color:rgb(147,153,159);
      }
    }
    .items{
      .w(474);
      .padding(0,48,0,48);
      box-sizing: border-box;
      border-left: 1px solid rgba(7,17,27,.1);
      p{
        .disb();

        .star{
          // .w(200);
          flex:1;
          .margin(0,24,0,24);
        }
      }
      .serviceScore{
        .margin(16,0,16,0);
      }
      .gettime{
        i{
          flex:auto;
          .ml(24)
        }

      }
    }
  }
  .all{
    .mt(32);
    background: #fff;
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    .padding(0,36,0,36);
    .btn{
      .padding(36,0,36,0);
      border-bottom:1px solid rgba(7,17,27,.1);
      span{
        display: inline-block;
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
      .padding(24,0,24,0);
      .fs(24);
      color:rgb(147,153,159);
      i{
        .fs(36);
        vertical-align: middle;
        .mr(8);
        &.cur{
          color:rgb(0,160,220);
        }
      }
    }
  }
  .content{
    .padding(0,36,0,36);
    li{
      border-bottom: 1px solid rgba(7,17,27,.1);
      .padding(36,0,36,0);
    }
    background: #fff;
    .news{
      .disb();
      .fs(20);
      img{
          .w(56);
          .h(56);
          .mr(24);
          border-radius:50%;
      }
      .con{
        flex:1;
        span{
          color:rgb(7,17,27);
        }
        p{
          display: flex;
          color:rgb(147,153,159);
          .star{
            .w(130);
          }
        }
      }
      .time{
        color:rgb(147,153,159);
        align-self: flex-start;
      }
    }
    .info{
      .ml(80);
      .fs(24);
      .lh(36);
      .mt(12);
    }
    .eva{
      .ml(80);
      .mt(16);
      .fs(18);
      display: flex;
      i.icon-down{
        vertical-align: middle;
        color:rgb(147,153,159);
      }
      i.icon-damuzhi{
        vertical-align: top;
        color:rgb(0,160,220);
      }
      .recommend{
        .ml(16);
        span{
          display: inline-block;
          border: 1px solid rgba(7,17,27,.1);
          .fs(18);
          .maxw(110);
          .mr(16);
          color:rgb(147,153,159);
          .padding(0,12,0,12);
          text-overflow:ellipsis;
          overflow: hidden;
          white-space:nowrap;
        }
      }
    }
  }
}
</style>
