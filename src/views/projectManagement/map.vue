
<template>
	<div>
		<div id="allmap" style="width: 100%; height: 400px;"></div>
		<div id="r-result" style="background: #FFFFFF; z-index: 999; position: absolute; margin-top: -420px;">
			<!-- <span style="font-weight: bold; padding: 0px 10px 0px 10px;">{{$t('Map.MapInputDesc')}}:</span><br />
			<a-input type="text" id="suggestId" size="20" :placeholder="this.$t('Map.MapInputDesc')" :style="width" @keydown="box"/><br /> -->
		</div>
		<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
		<!--<span id="choosePoints"></span><span>{{points.lng+'--'+points.lat}}</span>-->
		
	</div>
</template>
 
<script>
	
	export default {
		name: "AddressSelection",
		data() {
			return {
				points: { lng: '', lat: '' },
				width:"width:300px;"
			}
		},
		created(){
			if(document.body.clientWidth<=375){
				this.width="width:240px;"
			}
		},
		mounted() {
//			console.log(this.storeLocation)
			/**
			 * 过于麻烦描述一下，以免以后忘记了。
			 * 1.父组件传递经纬度参数过来，子组件接收后，将它的数据格式维护成复合百度地图的数据格式
			 * 2.判断父组件传递过来的经纬度参数是否为空，如果为空，则启用浏览器定位，如果不为空则将经纬度参数传给百度地图回显。
			 * 3.根据搜索和点击事件回传经纬度参数给父组件。
			 */
			var a = {lng:this.storeLocation[0],lat:this.storeLocation[1],of: "inner"}
			var map = new BMap.Map("allmap");
			if(this.storeLocation.length==2){
				var point = new BMap.Point(this.storeLocation[0],this.storeLocation[1]);
				map.centerAndZoom(point,16);
				map.addOverlay(new BMap.Marker(a))
			}else{
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					map.centerAndZoom(r.point, 16); //根据浏览器定位,设置城市和地图级别。
				})
			}
			var that = this;
			//地图点击事件。获取点击位置经纬度位置
			map.addEventListener('click', function(e) {
				that.points = { lng: e.point.lng, lat: e.point.lat }
				that.$emit("point",{ lng: e.point.lng, lat: e.point.lat })
				//document.getElementById("choosePoints").innerHTML=e.point.lng+","+e.point.lat
//				console.log(e.point);
				//清除所有地图坐标
				map.clearOverlays();
				//添加地图坐标
				map.addOverlay(new BMap.Marker(e.point))
			})
 
			var ac = new BMap.Autocomplete( //建立一个自动完成的对象
				{
					"input": "suggestId",
					"location": map
				});
 
			ac.addEventListener("onhighlight", function(e) {//鼠标放在下拉列表上的事件
//				console.log(e)
				var str = "";
				var _value = e.fromitem.value;
				var value = "";
				if(e.fromitem.index > -1) {
					value = _value.province + _value.city + _value.district + _value.street + _value.business;
				}
				str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
 
				value = "";
				if(e.toitem.index > -1) {
					_value = e.toitem.value;
					value = _value.province + _value.city + _value.district + _value.street + _value.business;
				}
				str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
				document.getElementById("searchResultPanel").innerHTML = str;
			});
 
			var myValue;
			ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
//				console.log(e)
				var _value = e.item.value;
				myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
				document.getElementById("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
 
				map.clearOverlays(); //清除地图上所有覆盖物
 
				function myFun() {
					var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
					//document.getElementById("choosePoints").innerHTML=pp.lng+","+pp.lat
					that.points = { lng: pp.lng, lat: pp.lat } //搜索位置的经纬度坐标
					that.$emit("point",{ lng: pp.lng, lat: pp.lat })
//					console.log(pp) //搜索位置的经纬度坐标
					map.centerAndZoom(pp, 16);
					map.addOverlay(new BMap.Marker(pp)); //添加标注
				}
				var local = new BMap.LocalSearch(map, { //智能搜索
					onSearchComplete: myFun
				});
				local.search(myValue);
			});
		},
		methods: {
			box(){
				//监听键盘事件，重新设置style参数。在弹窗中需要这样做。不然搜索回显数据显示不出来。
				var suggestion = document.getElementsByClassName("tangram-suggestion-main")
//				console.log(suggestion)
//				console.log("display:flex;z-index:1000;"+"position:"+suggestion[0].style.position+";"+"left:"+suggestion[0].style.left+";"+"top:"+suggestion[0].style.top+";"+"width:"+suggestion[0].style.width+";")
				suggestion[0].style.position="absolute"
				suggestion[0].style.display="flex"
				suggestion[0].style.left=suggestion[0].style.left
				suggestion[0].style.top=suggestion[0].style.top
				suggestion[0].style.width=suggestion[0].style.width
				suggestion[0].style.cssText="display:flex;z-index:1000;"+"position:"+suggestion[0].style.position+";"+"left:"+suggestion[0].style.left+";"+"top:"+suggestion[0].style.top+";"+"width:"+suggestion[0].style.width+";"
			}
		},
		props:{
			storeLocation:{
				type:Array,
				default:[]
			},
		},
		
		components: {}
	}
</script>
 
<style lang="scss" scoped>
	#allmap {
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0;
		font-family: "微软雅黑";
	}
    .tangram-suggestion-main{
		display: flex;
		position: absolute;
		left: 164px;
		top: 143px;
		width: 300px;
		
	}
</style>