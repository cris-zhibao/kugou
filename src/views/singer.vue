<template>
  <div class="home">
    <mt-cell class="singertypelist"
      v-for="item in singerTypeList"
      :key="item.classid"
      :title="item.classname"
      is-link
      :to="{name:'SingerList',params:{id:item.classid}}"
      >
    </mt-cell>
  </div>
</template>

<script>
//import {getSingers} from '@/server'

export default {
  data(){
    return {
      singerTypeList:[]
    }
  },
  name: 'singer',
  components: {
    
  },
  methods:{
    // goSingerList(id){
    //   console.log(id);
    //   this.$router.push({
    //     name:'SingerList',
    //     params:{
    //       id:id
    //     }
    //   });
    // }
  },
  async created(){
      let { data }= await this.$kugou.getSingers();
      this.singerTypeList=data.data;
  }
}
</script>
<style scoped>
  .singertypelist{
    border:1px solid #DDD;
    margin:.3rem;
  }
</style>

