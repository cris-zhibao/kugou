import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hash:'',
    songList:[], //存放歌曲列表,
    onSongIndex:0
  },
  mutations: {
    changeHash(state,val){
      state.hash=val;
    },
    changeSongList(state,list){
      state.songList=list;
    },
    setonSongIndex(state,i){
      state.onSongIndex=i;
    }
  },
  actions: {

  }
})
