<template lang="html">
  <div class="cart" @click="togglecart">
      <div class="bigcir">
        <div class="smcir" :class="{buy:Num}">
            <i class="icon-gouwuche iconfont"></i>
            <div class="num" v-if="Num">{{Num}}</div>
        </div>
      </div>
      <div class="con">
        <p class="price">¥{{Price}}</p>
        <div class="line"></div>
        <p class="fare">另需配送费¥{{goodsincart.deliveryPrice}}元</p>
        <div class="pay" :class="{buy:buy}" @click.stop="">
          {{Pay}}
        </div>
      </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
        buy:false
    }
  },
  props:{
    goodsincart:Object,
    foodsincart:Array
  },
  methods:{
    togglecart(){
      this.$emit('togglecart')
    }
  },
  computed:{
    Price(){
      // if(this.foodsincart!=[])
        // return this.foodsincart.reduce((a,b)=>{return a.price*a.count+b.price*b.count})
        let sum=0;
        this.foodsincart.forEach(item =>{
          sum+=item.price*item.count;
        })
        return sum;
    },
    Pay(){

      if(this.Price==0){
        this.buy=false;
        return `¥${this.goodsincart.minPrice}元起送`
      }else if(this.Price<this.goodsincart.minPrice){
        this.buy=false;
        return `还差¥${this.goodsincart.minPrice-this.Price}起送`
      }else{
        this.buy=true;
        return '去结算'
      }
    },
    Num(){
      let cou=0;
      this.foodsincart.forEach(item =>{
        cou+=item.count;
      })
      return cou;
    }
  },

}
</script>

<style lang="less">
@import "./public.less";
.cart{
  position: fixed;
  bottom:0;
  .h(100);
  width: 100%;
  z-index: 10;
  background: #141d27;
  .bigcir{
    position: absolute;
    .left(22);
    .w(116);
    bottom:0;
    .h(116);
    border-radius: 50%;
    background: #141d27;
    .smcir{
      position: absolute;
      .left(14);
      .w(88);
      .bottom(14);
      .h(88);
      .fs(48);
      color:rgba(255,255,255,.4);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgba(255,255,255,.1);
      .num{
        position: absolute;
        .fs(18);
        color:#fff;
        .right(-12);
        .top(-16);
        // .w(48);
        .padding(2,12,4,12);
        // .h(32);
        .br(999);
        background: rgb(240,20,20);
      }
    }
    .smcir.buy{
      background: rgb(0,160,220);
      i{color:#fff}
    }
  }
  .con{
    .ml(72+88);
    .disb();
    .fs(32);
    .lh(100);
    color:rgba(255,255,255,.4);
    .line{
      border-left: 1px solid rgba(255,255,255,.1);
      .h(50);
    }
    .price{
      .w(100);
    }
    .price,.pay{
      font-weight: bold;
    }
    .pay{
      text-align: center;
      .w(210);
      background: rgba(255,255,255,.1);
    }
    .pay.buy{
      color:#fff;
      background: rgb(0,160,220);
    }
  }
}
</style>
