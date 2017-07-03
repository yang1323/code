<template>
  <div id="app">
      <ele-header :ele="eleseller"></ele-header>
      <div class="routers">
          <router-link to="/goods">商品</router-link>
          <router-link to="/commonts">评价</router-link>
          <router-link to="/seller">商家</router-link>
      </div>
      <router-view></router-view>

  </div>
</template>

<script>
import header from './components/Header/header'
import './assets/font.css'
import {mapState} from 'vuex'
export default {
  name: 'app',
  data(){
    return {

    }
  },
  methods:{

  },
  computed:{
    ...mapState(['eleseller'])
  },
  components:{
    'ele-header':header
  }
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
</script>

<style lang="less">
@import './assets/public.less';

    .routers{
      a{
        .fs(28);
        color:rgb(77,85,93);
        &.router-link-active{
          color:rgb(240,20,20);
        }
      }
      .h(80);
      .lh(80);
      .dis();
    }
</style>
