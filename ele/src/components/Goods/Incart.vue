<template lang="html">
  <div class="incart">
    <div class="title">
      <h3>购物车</h3><span @click="clearcart">清空</span>
    </div>
    <div id="food">
      <ul class="foods">
        <li v-for="item in foodsincart">
          <span>{{item.name}}</span>
          <strong><i>¥</i>{{item.price*item.count}}</strong>
          <addtocart :food="item"></addtocart>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Addtocart from './addtocart'
import './iscroll.js'
export default {
  props:{
    foodsincart:Array
  },
  components:{
    addtocart:Addtocart
  },
  methods:{
    clearcart(){
      this.$emit('clearcart')
    },
    drop(el){

    }
  },
  created(){
      // this.$root.eventHub.$on('cart.add', this.drop)
  },
  mounted(){
    new IScroll('#food',{bounce:false});
  },
  updated(){
    new IScroll('#food',{bounce:false})
  }


}
</script>

<style lang="less" scoped>
@import "./public.less";
.incart{
  position: fixed;
  width: 100%;
  .bottom(100);
  .fs(28);
  z-index: 9;
  .title{
    .h(80);
    background: #f3f5f7;
    .disb();
    .padding(0,36,0,36);
    border-bottom: 1px solid rgba(7,17,27,.2);
    h3{
      color:rgb(7,17,27);
    }
    span{
      .fs(24);
      color:rgb(0,160,220);
    }
  }
  #food{
    .mh(583);
    overflow: hidden;
  }
  .foods{
    .padding(0,36,0,36);
    background: #fff;
    li{
      .disb();
      .h(96);
      border-bottom: 1px solid rgba(7,17,27,.2);
      &:last-child{
        border:none;
      }
      strong{
        text-align: right;
        flex:auto;
        .mr(24);
        color:rgb(240,20,20);
        font-weight: bold;
        i{
          .fs(20);
          font-weight: normal;
        }
      }
    }
  }
}
</style>
