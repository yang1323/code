<template lang="html">
    <div class="bounce">
      <h2>{{ele.name}}</h2>
      <ele-star :elescore="ele.score"></ele-star>
      <div class="tit">
        <div class="line"></div>
        <h3>优惠信息</h3>
      </div>
      <div class="fav">
        <ul>
          <li v-for="item in ele.supports">
            <i></i>
            {{item.description}}
          </li>
        </ul>
      </div>
      <div class="tit">
        <div class="line"></div>
        <h3>商家公告</h3>
      </div>
      <div class="info">
        {{ele.bulletin}}
      </div>

      <div class="close" @click="close">
          X
      </div>
      <div class="bg"></div>
    </div>
</template>

<script>
import Star from '../Star/Star'
export default {
  data(){
    return {
    }
  },
  props:{
    ele:Object
  },
  methods:{
    close(){
      this.$emit('close')
    }
  },
  components:{
    'ele-star':Star
  }
}
</script>

<style lang="less" scoped>
@import "public.less";
.bounce{
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  .fs(24);
  z-index: 999;
  background: rgba(7,17,27,.9);
  .padding(128,72,64,72);
  &>h2{
    .fs(32);
    font-weight: bold;
    text-align: center;
  }
  .tit{
    position: relative;
    .h(28);
    .line{
      height: 1px;
      background: rgba(255,255,255,.2);
    }
    h3{
      position: absolute;
      .fs(28);
      left:50%;
      transform: translateX(-50%);
      top:(-54%);
      background: #1f2831;
      .padding(0,24,0,24);
      font-weight: bold;
      text-align: center;
    }
  }
  .bg{
    position: absolute;
    top:0;
    left:0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(1px);
  }
  .close{
    text-align: center;
    .fs(64);
    color:rgba(255,255,255,.5);
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    .bottom(64);
  }

  .fav{
    .margin(33,24,56,0);
    li{
      .mb(24);
      &:last-child{
        .mb(0);
      }
      i{
        display: inline-block;
        .h(32);.w(32);
      }
    }
  }
  .info{
    .margin(48,24,0,24);
    .fs(24);.lh(48);font-weight: 200;
  }
}
</style>
