<template>
    <div class="m-main" :style="{top:playTop+'rem'}">
        <mt-header class="hide-player" style="font-size:.5rem;" :title="songInfo.songName">
        <div slot="left">
            <mt-button icon="back" @touchstart.native="changeTop"></mt-button>
        </div>
        </mt-header>
        <div class="bg-overlay"></div>
        <div class="play-overlay"></div>
        <lyric :ric="ric" :currentTime="currentTime"></lyric>
        <player-control 
            :songInfo="songInfo" 
            @next="next" 
            @prev="prev" 
            @playorpause="playorpause" 
            :isPlay="isPlay"
            :duration="duration"
            :current-time="currentTime"
            @changeCurrentTime="(t)=>{this.$emit('changeCurrentTime',t)}"
        ></player-control>
    </div>
</template>
<script>
import lyric from './playinfo/lyric'
import playerControl from './playinfo/control'
export default {
    props:{
        ric:{
            type:String,
            default:''
        },
        playTop:{
            type:Number,
            default:0
        },
        songInfo:{
            type:Object,
            default:{}
        },
        isPlay:{
            type:Boolean,
            default:false
        },
        duration:{
            type:Number,
            default:0
        },
        currentTime:{
            type:Number,
            default:0
        }
    },
    mounted(){
    },
    data(){
        return {
        }
    },
    components:{
        lyric,
        playerControl
    },
    methods:{
        changeTop(){
            this.$emit('update:playTop',30);

        },
        next(){
            this.$emit('next');
        },
        prev(){
            this.$emit('prev');
        },
        playorpause(){
            this.$emit('playorpause');
        }
    }
}
</script>
<style scoped>
.clear:after {
	display: block;
	content: "";
	clear: both;
}

.m-main {
  width: 100%;
	height: 100%;
	position: fixed;
  left: 0;
  top: 100rem;
	box-sizing: border-box;
	color: #fff;
	background: rgba(0,0,0,.6);
	z-index: 10;
	transition: .5s;
}
.bg-overlay {
	background: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000003lFlWa0CwNbA.jpg?max_age=2592000) no-repeat;
	background-size: cover;
	filter: blur(10px);
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.play-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
}


#app .hide-player {
  background: rgba(255,255,255,0);
  color: #fff;
  z-index: 999;
	height: 1rem;
}
</style>

