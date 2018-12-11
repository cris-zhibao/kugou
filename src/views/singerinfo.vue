<template>
  <div class="home">
    <div class="img_box"><img :src="imgUrl | filterImgUrl" alt="" class="bgimg"></div>
    <song-list :list="songlist"></song-list>
  </div>
</template>

<script>
import songList from '@/components/songlist'

export default {
  data(){
    return {
      imgUrl:'',
      songlist:[]
    }
  },
  components: {
    songList
  },
  async created(){
    let singerid=this.$route.params.singerid;
    let {data} = await this.$kugou.getSingerInfo({singerid});
    this.imgUrl=data.info.imgurl;
    this.songlist=data.data;
    console.log(this.songlist);

  }
}
</script>
<style scoped>
  .bgimg{ width: 100%;}
  .img_box{ height: 6rem; overflow: hidden;}
</style>

