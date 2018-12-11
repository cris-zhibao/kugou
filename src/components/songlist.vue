<template>
    <div class="song-cell">
        <mt-cell 
            v-for="(item,index) in list"
            :key="item.filename"
            :title="item.filename"
            @click.native="playSong(item,index)"
            is-link
            value="带链接">
        </mt-cell> 
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array
        }
    },
    methods:{
        playSong(item,index){
            //将歌曲的hash值存入vuex
            this.$store.commit('changeHash',item.hash);
            this.$store.commit('changeSongList',this.list);
            this.$store.commit('setonSongIndex',index);

        }
    },
    update(){
     
    },
}
</script>

