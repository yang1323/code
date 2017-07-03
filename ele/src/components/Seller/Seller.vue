<template lang="html">
    <div class="seller">
      <div>
        <div class="head">
          <div class="title">
            <div>
              <h3>{{eleseller.name}}</h3>
              <div class="starscore">
                <ele-star :elescore="eleseller.score"></ele-star>
                <i>(661)</i>
                <span>月售{{eleseller.sellCount}}单</span>
              </div>

            </div>
            <div class="collect" @click="Coll">
              <i class="iconfont icon-aixin" :class="{coll:collect}"></i>
              <p><span v-if="!collect">收藏</span><span v-else>已收藏</span></p>
            </div>
          </div>
          <ul class="time">
                <li>
                  <p>起送价</p>
                  <span>{{eleseller.minPrice}}<i>元</i></span>
                </li>
                <li>
                  <p>商家配送</p>
                  <span>{{eleseller.deliveryPrice}}<i>元</i></span>
                </li>
                <li>
                  <p>平均配送时间</p>
                  <span>{{eleseller.deliveryTime}}<i>分钟</i></span>
                </li>
          </ul>
        </div>
        <div class="bulletin">
          <h3>公告与活动</h3>
          <p>{{eleseller.bulletin}}</p>
          <ul>
            <li v-for="item in eleseller.supports">
              <i :class="classtype(item.type)"></i>{{item.description}}
            </li>
          </ul>
        </div>
        <div class="stage">
          <h3>商家实景</h3>
          <div class="imgs">
            <div class="">
              <img :src="item" alt="" v-for="item in eleseller.pics">
            </div>
          </div>
        </div>
        <div class="info">
          <h3>商家信息</h3>
          <ul>
            <li v-for="item in eleseller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import '../../../static/iscroll.js'
import {mapState,mapMutations} from 'vuex';
import Star0 from '../Star/Star0'
export default {
  data(){
    return {
      coll:false
    }
  },
  computed:{
    ...mapState(['eleseller','collect']),

  },
  methods:{
    ...mapMutations(['Coll']),
    classtype(type){
      switch (type) {
        case 0:
          return 'te'
        case 1:
          return 'jian'
        case 2:
          return 'piao'
        case 3:
          return 'zhe'
        case 4:
          return 'bao'
        default:
          return 'te'
      }
    }
  },
  components:{
    'ele-star':Star0
  },
  mounted(){
    new IScroll(".seller");
    new IScroll(".imgs",{
      scrollX: true,
      scrollY: false
    })
  },
  updated(){
    new IScroll(".seller");
    new IScroll(".imgs",{
      scrollX: true,
      scrollY: false
    })
  }
}
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
</script>

<style lang="less">
@import "public.less";
.seller{
  position: fixed;
  .top(349);
  .bottom(0);
  overflow-x: hidden;
  .fs(24);
  background: #f3f5f7;
  width:100%;
  .head{
    .padding(0,36,0,36);
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    background: #fff;
    .title{
      .disb();
      border-bottom: 1px solid rgba(7,17,27,.1);
      .padding(36,0,36,0);
      h3{
        .fs(28);
        color:rgb(7,17,27);
      }
      .starscore{
        .disb();
        color:rgb(77,85,93);
        .mt(12);
        .star{
          .w(194);
        }
        i{
          .margin(0,24,0,16);
        }
      }
      .collect{
        text-align: center;
        .w(72);
        color:rgb(77,85,93);
        i{
          .fs(48);
          color:rgb(147,153,159);
        }
        i.coll{
          color:rgb(240,20,20);
        }
      }
    }
    .time{
      display: flex;
      .padding(36,0,36,0);
      text-align: center;
      li{
        flex:1;
        p{
          .fs(20);
          color:rgb(147,153,159);
        }
        span{
          .fs(48);
          color:rgb(7,17,27);
          i{
            .fs(20);
          }
        }
      }
    }
  }
  .bulletin{
    .padding(36,36,0,36);
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    .mt(32);
    background: #fff;
    h3{
      .mb(12);
      .fs(28);
      color:rgb(7,17,27);
    }
    p{
      color:rgb(240,20,20);
      .lh(48);
      .margin(0,24,32,24);
    }
    li{
      border-top: 1px solid rgba(7,17,27,.1);
      color:rgb(7,17,27);
      .lh(32);
      .padding(32,24,32,24);
      i{
        display: inline-block;
        .w(32);.h(32);
        background-size: cover;
        vertical-align: text-top;
        .mr(12);
      }
      i.te{  background-image: url(./special_3@2x.png)}
      i.jian{  background-image: url(./decrease_3@2x.png)}
      i.zhe{  background-image: url(./discount_3@2x.png)}
      i.bao{  background-image: url(./guarantee_3@2x.png)}
      i.piao{  background-image: url(./invoice_3@2x.png)}
    }
  }
  .stage{
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    .padding(36,0,36,36);
    background: #fff;
    .mt(32);
    h3{
      .fs(28);
      color:rgb(7,17,27);
      .mb(24);
    }
    .imgs{
      .h(180);
      width: 100%;
      overflow:hidden;
      &>div{
        height: 100%;
        .w(240*4+12*3);
        display: flex;
        overflow:hidden;
      }
      img{
        .w(240);.h(180);
        flex-shrink: 0;
        .mr(12);
      }
      img:last-child{
        .mr(0);
      }
    }

  }
  .info{
    .padding(36,36,36,36);
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    .mt(32);
    background: #fff;
    h3{
      .mb(24);
      .fs(28);
      color:rgb(7,17,27);
    }
    li{
      border-top: 1px solid rgba(7,17,27,.1);
      color:rgb(7,17,27);
      .lh(32);
      .padding(32,24,32,24);
    }
  }
}
</style>
