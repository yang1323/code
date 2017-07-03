<template lang="html">
  <ul class="star">
    <li class="off">
      <ul>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>
    </li>
    <li class="half">
      <ul>
        <li v-for="item in Half"></li>
      </ul>
    </li>
    <li class="on">
      <ul>
        <li v-for="item in On"></li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    elescore:Number
  },
  computed:{
    Half(){
      return Math.ceil(this.elescore);
    },
    On(){
      return Math.floor(this.elescore)
    }
  }
}
</script>

<style lang="less" scoped>
@import "public.less";
.star{
  position: relative;
  .h(48);
  .mt(32);.mb(48);.ml(25);
  &>li{
    position: absolute;
    li{
      .w(48);
      .h(48);
      .ml(50);
      float: left;
      background-size: cover;
    }
  }
  li.off li{background-image:url(./star36_off@2x.png)}
  li.on li{background-image: url(./star24_on@3x.png);}
  li.half li{background-image: url(./star36_half@2x.png);}
}
</style>
