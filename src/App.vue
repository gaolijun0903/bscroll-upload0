<template>
  <div id="app">
  	<div class="tab">
  		<router-link tag="div" class="tab-item" to="/pullup1">
				<span class="tab-link">demo1</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/pullup2">
				<span class="tab-link">demo2</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/pullup3">
				<span class="tab-link">demo3</span>
			</router-link>
  	</div>
	    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.tab{
	display: flex;
	height: 44px;
	width: 100%;
	line-height: 44px;
	font-size: 14;
	background:#ccc;
}
.tab .tab-item{
	flex:1;
	text-align: center;
}
.tab .tab-item .tab-link{
	padding-bottom: 5px;
	color: rgba(255, 255, 255, 0.5);
}
.tab .tab-item.router-link-active .tab-link{
	color: #ffcd32;
	border-bottom: 2px solid #ffcd32;
}
</style>
