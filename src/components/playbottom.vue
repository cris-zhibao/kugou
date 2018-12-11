<template>
    <div>
        <div class="play-bottom" :style="{bottom: bottom+'rem'}">
            <div class="play-left" @touchstart="goSongPlayInfo">
                <img v-if="songInfo.imgUrl" :src="songInfo.imgUrl | filterImgUrl" alt="">
                <p>
                <span>{{songInfo.songName}}</span>
                <span>{{songInfo.singerName}}</span>
                </p>
            </div>
            <div class="play-right">
                <div class="iconfont  icon-audio_last_step prev-song"
                @touchstart="prev"
                ></div>
                <div
                class="iconfont play-song icon-bofang" @touchstart="playorpause" :class="{'icon-bofang':!isPlay,'icon-zanting':isPlay}"></div>
                <div class="iconfont  icon-audio_next_step next-song" 
                @touchstart="next"
                ></div>      
            </div>
        </div>
        <audio ref="audio" preload :src="src"></audio>
        <play-info 
            :playTop.sync="playTop"
            :songInfo="songInfo"
            @next="next"
            @prev="prev"
            @playorpause="playorpause"
            :isPlay="isPlay"
            :duration="duration"
            :current-time="currentTime"
            @changeCurrentTime="changeCurrentTime"
            :ric="lyric"
        ></play-info>
    </div>
</template>
<script>
import playInfo from './playInfo'
export default {
    //获取当前歌曲信息和当前歌曲列表
    data(){
        return {
            bottom:-30,
            audio:null,
            src:'',
            playTop:30,
            songInfo:{},
            iIndex:0,
            isPlay:true,
            duration:0, //播放总时间
            currentTime:0, //当前播放时间
            lyric:''
        }
    },
    computed:{
         songList(){
             return this.$store.state.songList;
         }
    },
    watch:{
        '$store.state.hash':async function(){
            this.iIndex=this.$store.state.onSongIndex;
            let data=await this.$getSong.getSongMp3({hash:this.$store.state.hash});
            this.songInfo=data.data;
            this.src=this.songInfo.url;
            this.bottom=0;
            this.isPlay=true;
            //临时设置
            this.playTop=0;

            //获取歌词
            let lyric= await this.$getSong.getRc({
                hash:this.songInfo.hash,
                keyword:this.songInfo.songName
            })
            this.lyric=lyric.data;
        }
    },
    methods:{
        async getSong(i){
           let newHash=this.songList[i].hash;
           this.songInfo=await this.$getSong.getSongMp3({hash:newHash});
           this.audio.src=this.songInfo.data.url;
           this.$store.commit('changeHash',newHash);
           this.$store.commit('setonSongIndex',i);
           this.isPlay=true;

        },
        next(){
           this.iIndex++;
           if(this.iIndex > this.songList.length-1){
               this.iIndex=0;
           }
           this.getSong(this.iIndex);
        },
        prev(){
           this.iIndex--;
           if(this.iIndex < 0){
               this.iIndex=this.songList.length-1;
           }
           this.getSong(this.iIndex);
        },
        playorpause(){
            if(this.isPlay){
                this.$refs.audio.pause();
                this.isPlay=false;
            }else{
                this.$refs.audio.play();
                this.isPlay=true;
            }
        },
        goSongPlayInfo(){
            this.playTop=0;
        },
        changeCurrentTime(t){
            //console.log(t);
            this.$refs.audio.currentTime=t;
        }
    },
    components:{
        playInfo
    },
    mounted(){
        this.audio=this.$refs.audio;
        //监听歌曲加载完毕事件
        this.audio.addEventListener('loadedmetadata',()=>{
            this.duration=this.audio.duration;
            this.currentTime=this.audio.currentTime;
            this.audio.play();
        });

        this.audio.addEventListener('timeupdate',()=>{
            this.currentTime=this.audio.currentTime;
        })

        this.audio.addEventListener('ended',()=>{
            this.next();
        })
    }

}
</script>
<style scoped>
    #app .play-bottom {
  width: 100%;
  height: 1.5rem;
  background-color:rgba(5, 5, 5, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
  transition: .3s;
  z-index: 9;
}
.play-left {
  width: 55%;
  height: 100%;
  float: left;
  overflow: hidden;
  position:relative;
  box-sizing: border-box;
  display: flex;
}
.play-left img {
  width: 1.5rem;
  float: left;
}
.play-left p {
  margin: auto 0;
  width: 60%;
  color: #fff;
  float: left;
  font-size: .35rem;
  margin-left: .1rem;
}
.play-left p span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.play-left p span:nth-child(2){
  font-size: .3rem;
}
.play-right {
  position:relative;
  float: left;
  width: 40%;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .1rem;
  height: 100%;
}
.play-right > div {
  font-size: .7rem;
  color: #fff;
}

.play-right > div:active{
  color: #e5e5e5;
}
</style>


