<template lang="html">
    <div class="header">
        <div class="content">
            <img :src="ele.avatar" alt="">
            <div class="con">
              <h3><img src="./brand@2x.png" alt="">{{ele.name}}</h3>
              <p>{{ele.description}}/{{ele.deliveryTime}}分钟送达</p>
              <i><img src="./decrease_1@2x.png" alt="">{{ele.supports[0].description}}</i>
            </div>
            <div class="num" @click="bou=true">
              {{ele.supports.length}}个
            </div>
        </div>
        <div class="bgcolor">
            <img :src="ele.avatar" alt="">
        </div>
        <div class="headinfo">
          <img src="./bulletin@2x.png" alt="">
          <p>{{ele.bulletin}}</p>
        </div>
        <transition name="bounce"><ele-bounce :ele="ele" v-if="bou" @close="bou=false"></ele-bounce></transition>
    </div>
</template>

<script>
import bounce from './bounce'
export default {
  data(){
    return {
      bou:false
    }
  },
  props:{
    ele:Object
  },
  components:{
    'ele-bounce':bounce
  }

}
</script>

<style lang="less" scoped>
@import "public.less";
@keyframes bounce-in{
  0%{transform:scale(0);}
  50%{transform:scale(1.5);}
  100%{transform:scale(1);}
}
@keyframes bounce-out{
  0%{transform:scale(1);}
  50%{transform:scale(1.5);}
  100%{transform:scale(0);}
}
.bounce-leave-active{animation:bounce-out 0.5s}
.bounce-enter-active{animation:bounce-in 0.5s}
.header{
    width: 100%;
    .h(268);
    color:#fff;
    overflow: hidden;
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    .content{
      display: flex;
      .margin(48,24,36,48);
      .h(128);
      .con{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        flex-grow: 1;
      }
      img{
        .w(128);
        .h(128);
        .mr(32);
      }
      h3{
        .fs(32);
        font-weight: bold;
        img{
          .h(34);
          width: auto;
          .mr(12);
        }
      }
      p{
        .fs(24);
      }
      i{
        .fs(20);
        img{
          .w(22);
          height: auto;
          .mr(8);
        }
      }
      .num{
        .fs(20);
        align-self: flex-end;
        background: rgba(0,0,0,0.2);
        .padding(14,16,14,16);
        .br(30);
      }
      .num:after{
        content:'>'
      }
    }
    .bgcolor{
      position: absolute;
      left:0;
      top:0;
      z-index:-1;
      width: 100%;
      height: 100%;

      filter:blur(10px);
      img{
        width: 100%;
        height:100%;
        z-index: -2;
      }
    }
    .headinfo{
      position: absolute;
      bottom:0;
      left:0;
      .h(56);
      .lh(56);
      .fs(20);
      width: 100%;
      background: rgba(7,17,27,0.2);
      img{
        .h(32);
        width: auto;
        float: left;
        .mt(12);
        .ml(24);
        .mr(8);
      }
      p{

        .margin(0,48,0,0);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .info:after{
      content:'>';

      position: absolute;
      .right(24);
      top:0;
    }
}
</style>
