<template>
<div class="songs-wrapper" ref="songsWrapper">
  <ul class="songs-list" ref="songsList">
    <li class="item" v-for="(item,idx) in songs">
      <span class="idx">{{idx+1}}</span>
      <span class="albumname">{{item.musicData.albumname}}</span>
      <span class="albumid">{{item.musicData.albumid}}</span>
      <span class="singer">{{item.musicData.singer[0].name}}</span>
      <span class="interval">{{item.musicData.interval}}</span>
    </li>
  </ul>
  <p class="addMore"  v-show="showAddMore">更多内容加载中。。。</p>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      songs:[],
      scrollY:0,
      height:0,
      diff:0,
      showAddMore:false,
      addMore:true
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      console.log('getData=======================')
      this.$http.get('/api/songs').then(res => {
      	this.showAddMore = false;
        var result = res.body;
        this.songs = this.songs.concat(result.data);

        this.$nextTick(()=>{
          this._initScroll();
          this._calculateHeight();
        })
      }, response => {
        console.log(response)
      });
    },
    _initScroll(){
      if(this.songScroll){
        this.songScroll.refresh()
        
      }else{
        this.songScroll = new BScroll(this.$refs.songsWrapper,{
         probeType: 1
        });
      }
      this.songScroll.on('scrollEnd', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        console.log('scrollY'+'==='+'height')
        console.log(this.scrollY+"==="+this.height)
        this.diff = this.scrollY - this.height;
        if(this.diff===0){
          this.showAddMore = true;
          this.getData();
        }

//      console.log('y'+'==='+'maxScrollY')
//      console.log(this.songScroll.y+"==="+this.songScroll.maxScrollY)
//      let diff = this.songScroll.y - this.songScroll.maxScrollY
//				if(diff <= 50){
//					this.showAddMore = true;
//					this.getData();
//				}
        
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

<style>
.songs-wrapper{
  position: fixed;
	width: 100%;
	top: 44px;
	bottom: 0;
	border: 1px solid #42B983;
	overflow: hidden;
}

.songs-wrapper  .songs-list{
  padding: 0 30px;
  border:1px solid red;
}
.songs-list .item{
  height:50px;
  border-bottom:1px solid #222;
  line-height:50px;
}
.addMore{
  position:absolute;
  bottom:0;
  width:100%;
  text-align:center;
}
</style>