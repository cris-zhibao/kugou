<template>
  <div ref="area" class="m-lyric-area">
    <div ref="lyric" class="m-lyric" >
      <p v-for="(item,index) in rcArr" :key="index" :class="{'bg':index===theIndex}">{{item[1]}}</p>
    </div>
  </div>
</template>
<script>
import {parseLyric} from '@/utils/utils'
export default {
	props:{
		ric:{
			type:String,
			default:''
		},
		currentTime:{
			type:Number,
			default:0
		}
	},
	data(){
		return {
			theIndex:0,
			lyricBoxH:0,
			oPHeight:0
		}
	},
	watch:{
		currentTime(){
				//通过currentTime判断歌词是否已经超过播放时间
				for(let i=0;i<this.rcArr.length;i++){
					if(this.currentTime>this.rcArr[i][0]){
						this.theIndex=i;
					}else{
						break;
					}
				}
		},
		ric:{
			handler(){
				//获取当前歌词的行数并且得到歌词盒子高度
				//console.log(this.rcArr.length);
			
					this.$nextTick(()=>{
							this.lyricBoxH=this.rcArr.length;

							console.log(this.lyricBoxH)
					})

			
			}
		}
	},
	computed:{
		rcArr(){
			 return parseLyric(this.ric);
		}
	},
	mounted(){

	
			this.oPHeight=this.$refs.lyric.getElementsByTagName('p')[0].offsetHeight;

			console.log(this.oPHeight);
		
		

	}
}
</script>

<style>

.m-lyric-area {
	height: 58%;
	overflow: hidden;
	position: relative;
  z-index: 2;
  margin-top: .6rem;
}

.m-lyric {
	width: 100%;
	position: absolute;
	left: 0;
  top: 0;
}

.m-lyric-area p {
	text-align: center;
	line-height: 1rem;
	font-size: .3rem;
	
}


.m-lyric .bg {
	color: red;
	font-size: .4rem;
}
</style>

