<template>
  <div class="pullup">
    <div class="songs-wrapper" ref="songsWrapper">
      <ul class="songs-list" ref="songsList">
        <li class="item" v-for="(item,idx) in songs">
          <span class="idx">{{idx}}</span>
          <span class="albumname">{{item.musicData.albumname}}</span>
          <span class="albumid">{{item.musicData.albumid}}</span>
          <span class="singer">{{item.musicData.singer[0].name}}</span>
          <span class="interval">{{item.musicData.interval}}</span>
        </li>
      </ul>
      <p class="addMore"  v-show="showAddMore">下拉加载更多</p>
    </div>
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
      showAddMore:false,
      addMore:false
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$http.get('/api/songs').then(res => {
        var result = res.body;
        this.songs =this.songs.concat(result.data);

        this.addMore = false
        this.showAddMore = false

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
        return
      }else{
        this.songScroll = new BScroll(this.$refs.songsWrapper,{
         probeType: 1
        });
      }
     
      this.songScroll.on("scrollEnd",(pos)=>{
        console.log('scrollEnd')
        if(this.addMore === true){
          this.getData();
          this.addMore = false
          this.showAddMore = false
          return
        }
        
        this.scrollY = Math.abs(Math.round(pos.y))
        console.log('scrollY'+'==='+'height')
        console.log(this.scrollY+"==="+this.height)
        this.diff = this.height - this.scrollY;
        
        if(this.diff===0){
          this.showAddMore = true
          this.addMore = true
        }
        console.log('scrollEnd============================')
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
.songs-wrapper{
  position: fixed;
	width: 100%;
	top: 44px;
	bottom: 0;
	border: 1px solid #42B983;
	overflow: hidden;
}
.songs-wrapper  .songs-list{
  padding:0 30px;
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
