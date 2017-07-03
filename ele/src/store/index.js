import Vue from 'vue'
import Vuex from 'Vuex'
import ele from './../data.json'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
      elegoods:ele.goods,
      eleseller:ele.seller,
      eleratings:ele.ratings,
      collect:false
  },
  mutations:{
    Coll(state){
      // console.log(this.collect);
      state.collect=!state.collect;
    }
  },
  getters:{

  }
})
