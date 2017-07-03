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
  .h(30);
  ul{
    overflow: hidden;
  }
  &>li{
    position: absolute;
    li{
      .w(30);
      .h(30);
      .ml(11);
      float: left;
      background-size: cover;
      vertical-align: bottom;
      &:first-child{
        .ml(0);
      }
    }
  }
  li.off li{background-image:url(./star36_off@2x.png)}
  li.on li{background-image: url(./star24_on@3x.png);}
  li.half li{background-image: url(./star36_half@2x.png);}
}
</style>
