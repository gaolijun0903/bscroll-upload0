<template>
  <div class="pullup">
    <div class="songs-wrapper" ref="songsWrapper">
      <ul class="songs-list" 
      	ref="songsList"
      	@touchstart="touchStart"
      	@touchmove="touchMove"
      	@touchend="touchEnd"
      	>
        <li class="item" v-for="(item,idx) in songs">
          <span class="idx">{{idx+1}}</span>
          <span class="albumname">{{item.musicData.albumname}}</span>
          <span class="albumid">{{item.musicData.albumid}}</span>
          <span class="singer">{{item.musicData.singer[0].name}}</span>
          <span class="interval">{{item.musicData.interval}}</span>
        </li>
      </ul>
    </div>
    <p class="addMore" ref="addMore" v-html="addMoreText"></p>
  </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  name: 'hello',
  data () {
    return {
      songs:[],
      scrollY:0,
      height:0,
      diff:0,
      addMore:false,
      addMoreText:"下拉加载更多",
      isEnd:false
    }
  },
  created(){
  	this.touch = {};
    this.getData();
  },
  methods:{
    getData(){
    	if(this.isEnd){
    		return
    	}
      this.$http.get('/api/songs').then(res => {
        var result = res.body;
        this.songs =this.songs.concat(result.data);
        this.addMoreText = '上拉加载更多'
				if(this.songs.length>=100){
					this.isEnd = true
        	this.addMoreText = '别扯了，已经到底了'
				}
        this.$nextTick(()=>{
          this._initScroll();
          this._calculateHeight();
        })
      }, response => {
        console.log(response)
      });
    },
    touchStart(e){
    	if(this.isEnd){
    		return
    	}
    	this.touch.y1 = e.touches[0].pageY;
    },
    touchMove(e){
    	if(this.isEnd){
    		return
    	}
    	this.touch.y2 = e.touches[0].pageY;
    	this.touch.moveY = this.touch.y1 - this.touch.y2;
    	if(this.touch.moveY>=200 && this.addMore){
    		this.addMoreText = '松手加载更多';
    	}else{
    		this.addMoreText = '上拉加载更多'
    	}
    },
    touchEnd(e){
    	if(this.isEnd){
    		return
    	}
    	if(this.touch.moveY>=200 && this.addMore){
    		this.addMoreText = '加载中。。。。';
    		setTimeout(()=>{
    			this.getData();
    		},300)
    		
    		this.addMore = false;
    	}
    },
    _initScroll(){
      if(this.songScroll){
        this.songScroll.refresh()
        return
      }else{
        this.songScroll = new BScroll(this.$refs.songsWrapper,{
         probeType: 1
        });
      }
      this.songScroll.on("scrollEnd",(pos)=>{
      	if(this.isEnd){
      		return
      	}
        this.scrollY = Math.abs(Math.round(pos.y))
        this.diff = this.height - this.scrollY;
        if(this.diff===0){
          this.addMore = true
        }else{
        	this.addMore = false
        }
      })
    },
    _calculateHeight(){
      let height1 = this.$refs.songsList.clientHeight;
      let height2 = this.$refs.songsWrapper.clientHeight;
      this.height = height1-height2;
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pullup{
	position: fixed;
	width: 100%;
	top: 44px;
	bottom: 0;
	border: 1px solid #42B983;
	overflow: hidden;
}
	
.songs-wrapper{
  height: 100%;
}
.songs-wrapper  .songs-list{
  padding:0 30px;
  border:1px solid red;
  background: #FFCD32;
}
.songs-list .item{
  height:50px;
  border-bottom:1px solid #222;
  line-height:50px;
}
.addMore{
  position:absolute;
  bottom:0;
  z-index: -1;
  width:100%;
  text-align:center;
}
</style>
