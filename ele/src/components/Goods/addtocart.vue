<template lang="html">
  <div class="num" id="num">
        <transition name="scroll">
            <i class="iconfont icon-jian" @click.stop="subfromcart(food)" v-if="food.count"></i>
        </transition>

        <transition name="fade"><span v-if="food.count">{{food.count}}</span></transition>

      <i class="iconfont icon-jia" @click.stop="addtocart(food)" id="ball"></i>
      <!-- <div class="ball"></div> -->

  </div>
</template>

<script>
export default {
  data(){
    return{
        show:false
    }
  },
  props:{
    food:Object
  },
  methods:{
    addtocart(food){
      this.show=true;
      setTimeout(()=>{this.show=false},1000)
      if(food.count){
        food.count++
      }else{
        this.$set(food,'count',1);
      }

      
      this.$emit('cartball', event.target);
      // let stage = document.getElementById('num');
      // let btn   = document.getElementById('ball');
      // let div   = document.createElement('div');
      // div.classList.add('ball');
      // stage.appendChild(div);

    },
    subfromcart(food){
      if(food.count)
        food.count--;
    },

  }
}

</script>

<style lang="less" scoped>
@import "public.less";
@keyframes scroll-in{
  0%{.translateX(100,360);}
  100%{.translateX(0,0);}
}
@keyframes scroll-out{
  0%{.translateX(0,0);}
  100%{.translateX(100,360);}
}
.fade-enter,.fade-leave-active{opacity: 0}
.fade-enter-active,.fade-leave-active{transition:all .5s};
.scroll-enter-active{animation: scroll-in .5s}
.scroll-leave-active{animation: scroll-out .5s}
.num{
  position: relative;
  .w(168);
  .h(54);

  i{
    .fs(48);
    color:rgb(0,160,220);
    border-radius: 50%;
  }
  i.icon-jian{
    position: absolute;
    .left(0);
  }
  i.icon-jia{
    position: absolute;
    .right(0);
    .top(2);
    z-index: 1
  }
  span{
    position: absolute;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
    top:50%;
  }

}
</style>
