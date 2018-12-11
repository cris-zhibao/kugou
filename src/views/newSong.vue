<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in bannerList" :key="item.id" class="new-song-swipe">
          <img :src="item.imgurl" :title="item.title" />
      </mt-swipe-item>
    </mt-swipe>
    <song-list :list="songListData"></song-list>
  </div>
</template>

<script>
import { getNewSongs } from '@/server'
import songList from '@/components/songlist'

export default {
  data(){
    return {
      bannerList:[],
      songListData:[]
    }
  },
  async created(){
      let data = await getNewSongs();
      this.bannerList=data.data.banner;
      this.songListData=data.data.data;
  },
  components:{
    songList
  }
}
</script>
<style scoped>
    .mint-swipe{
      height:3rem;
      width: 100%;
    }
    .new-song-swipe img {
      width: 100%;
    }
</style>

