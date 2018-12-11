<template>
  <div class="home">
    <mt-cell class="asingerlist" is-link
    :to="{name:'singerInfo',params:{singerid:item.singerid}}"
    v-for="item in singerList"
    :title="item.singername"
    :key="item.singerid">
      <span></span>
      <img slot="icon" :src="item.imgurl | filterImgUrl" width="100">
    </mt-cell>
  </div>
</template>

<script>

export default {
  data(){
    return {
      singerList:[]
    }
  },
  components: {
    
  },
  async created(){
    let classId=this.$route.params.id;
    let {data} = await this.$kugou.getSingerList({classid:classId});
    this.singerList=data.data;
  }
}
</script>
<style scoped>
  .asingerlist{
    margin: .3rem;
  }
</style>

