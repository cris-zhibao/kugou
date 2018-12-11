<template>
  <div class="m-bottom">
    <div class="m-progress-box">
      
      <span class="current-time">{{currentTimeToM}}</span>
      <div class="m-progress" @touchstart="toTime">
        <div class="m-progress-line">
          <div class="m-progress-lineed" :style="{'width':x_end+'px'}"></div>
        </div>
        <div class="m-progress-circle" :style="{'left':x_end+'px'}" 
					@touchmove="toMove"
					@touchend="dragEnd"
					@touchstart.stop="dragStart"
				></div>
      </div>
      <span class="total-time">{{durationToM}}</span>
    </div>
    <div class="m-play-control">
      <div class="m-play-btn m-play-prev-btn iconfont icon-audio_last_step" @touchstart="prev"></div>
      <div 
        class="m-play-play-btn iconfont" 
				:class="{'icon-bofang':!isPlay,'icon-zanting':isPlay}" 
      @touchstart="playorpause"></div>
      <div class="m-play-btn iconfont icon-audio_next_step m-play-next-btn" @touchstart="next"></div>
    </div>
  </div>
</template>
<script>
import {sToM } from '@/utils/utils'
export default {
	props:{
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
	data(){
		return {
			maxX:0,
			oP_x:0,
			circleX:0,
			drag:false
		}
	},
	computed:{
		currentTimeToM(){
			return sToM(this.currentTime);
		},
		durationToM(){
			return sToM(this.duration)
		},
		x_end(){
			if(this.circleX<0)this.circleX=0;
			if(this.circleX>this.maxX)this.circleX=this.maxX;
			return this.circleX;
		}
	},
	watch:{
		currentTime(){
			if(this.drag) return;
			//当前时间/总时间 * 最大运动距离= 当前运动位置
			this.circleX = this.currentTime/this.duration * this.maxX;
		}
	},
	methods:{
		dragStart(){
				this.drag=true;
		},
		toMove(e){
			//获取手指点击距离屏幕左侧的距离
			//console.log(e.changedTouches[0].pageX);
			 this.circleX=e.changedTouches[0].pageX-this.oP_x;
		},
		dragEnd(){
			this.drag=false;
			//获取当前拖拽后的播放时间
			let changeTime= this.circleX/this.maxX*this.duration;
			this.$emit('changeCurrentTime',changeTime)
		},
		next(){
			this.$emit('next')
		},
		prev(){
			this.$emit('prev')
		},
		playorpause(){
			this.$emit('playorpause')
		},
		toTime(e){
			//获取点击位置对应的播放时间
			let time=(e.changedTouches[0].pageX-this.oP_x)/this.maxX*this.duration;
			this.$emit('changeCurrentTime',time)
		}
	},
	mounted(){
		let mProgress=document.querySelector('.m-progress');
		let circle=document.querySelector('.m-progress-circle');

		//获取进度条最大可拖拽、移动距离
		this.maxX=mProgress.clientWidth-circle.clientWidth;

	  //获取父级元素距离屏幕可视区左侧的距离
		this.oP_x=mProgress.getBoundingClientRect().left;
	}
}
</script>


<style>

.m-bottom {
	width: 100%;
	position: absolute;
	bottom: .5rem;
	left: 0;
}

.m-progress-box {
	padding: 0 .2rem;
	box-sizing: border-box;
	font-size: .12rem;
	display: flex;
	align-items: center;

}

.m-progress-box span {
	width: 1rem;
}

.m-progress {
	width: 7rem;
	height: .44rem;
	margin: 0 .1rem;
	display: flex;
	align-items: center;
	position: relative;
	-overflow: hidden;
}

.m-progress-line {
	width: 100%;
	background:#9c8d88;
	height: .06rem;
	position: relative;
}

.m-progress-lineed {
	width: 0;
	background: #d23d43;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
}

.m-progress-circle {
	width: .4rem;
	height: .4rem;
	background: #fff;
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 50%;
	z-index: 2;
}

.m-play-control {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: .1rem;
}

.m-play-play-btn {
	width: 1rem;
	height: 1rem;
	background: #c84040;
	border-radius: 50%;
	margin: 0px .56rem;
	

}

.m-play-btn:before {
	font-size: .4rem;
	color: #fff;
	display: block;
	text-align: center;
	line-height: .85rem;
}

.m-play-play-btn {
	font-size: .8rem;
	color: #fff;
	display: block;
	text-align: center;
	line-height: 1rem;
}

.m-play-btn {
	width: .85rem;
	height: .85rem;
	background: #c84040;
	border-radius: 50%;
}
</style>
