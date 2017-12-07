<template>
	<div class="goods">
		<div class="menu-wraper" ref="menu-wraper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current': Index === index}" @click="scrollFood(index)">
					<span class="text">
						<i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>
						<span class="text-name">{{item.name}}</span>
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wraper" ref="foodsWraper" @scroll="currentItem">
			<ul>
				<li v-for="(item,index) in goods" class="food-list food-list-hook">
					<h2 class="list-title">{{item.name}}</h2>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="currentFood(food)">
							<div class="food-icon">
								<img :src="food.icon" alt="">
							</div>
							<div class="food-content">
								<h3 class="food-name">{{food.name}}</h3>
								<p v-if="food.description" class="food-description font_gray_12">{{food.description}}</p>
								<div class="sell-count">
									<span class="food-sellCount font_gray_12">月售{{food.sellCount}}份</span>
									<span class="food-ratings font_gray_12">好评率{{food.rating}}%</span>
								</div>
								<div class="food-price">
									<span class="price">¥{{food.price}}</span>
									<span v-if="food.oldPrice" class="oldPrice font_gray_12">¥{{food.oldPrice}}</span>
								</div>
								<div class="cartControl-wraper">
									<cartControl :food="food" v-on:cartAdd="_drop"></cartControl>
								</div>					<!-- cartAdd为自定义事件类型，触发父组件的_drop事件 -->
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>				<!-- selectFoods将被选择的商品传入购物车组件中 -->			
		<shopCart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
		<food :food="clickFood" ref="food"></food>
	</div>
</template>

<script type="text/ecmascript-6">
	import shopCart from "../shopCart/shopCart";
	import cartControl from "../cartControl/cartControl";
	import food from "../food/food";
    // 输出组件，大括号中空的，就代表输出的是自己

    export default {
    	props: ["seller"],		// 商家数据
    	data: function () {
    		return {
    			goods: [],
    			Index: 0,
    			foodListTop: [],
    			clickFood: []
    		}
    	},
    	created: function () {	// 生命周期钩子函数
            var self = this;
            this.$nextTick(function () {	// 异步获取数据
	            this.$http.get('/api/goods').then(function (res) {     // axios取得数据
	                // console.log(res.data);
	                if (res.data.errno === 0) {
	                    self.goods = res.data.data;
	                };
	                // console.log(self.goods);
	            });
	            // this._initScroll();
			});
        },
        mounted: function () {	// 生命周期钩子函数
			this.classMap = ["decrease","discount","guarantee","invoice","special"];  // 定义一个变量,此变量是一个class的数组
		},
		computed: {														// 子组件的操作会计算到父组件中，所以使用计算属性
			selectFoods: function () {
				var selectFoods = [];
				this.goods.forEach( function(goodsObj, index) {			// this.goods是一个数组，里面多个商品分类对象
					goodsObj.foods.forEach( function(food, index) {	// goodsObj.foods数组中是多个的商品对象
						if (food.count) {								// goods.count变量本不存在，是由子组件创建而来
							selectFoods.push(food); 					// 将被选择的商品插入数组
						}
					});
				});
				return selectFoods;
			}
		},
		methods: {
			_initScroll: function () {
				// 不适用讲师的better-scroll
				// this.menuScroll = new BScroll(this.$refs.menuWraper, {});
				// this.foodsScroll = new BScroll(this.$refs.foodsWraper, {});
			},
			currentItem: function () {
				var foodList = document.getElementsByClassName("food-list");
				var foodsWraper = document.getElementsByClassName("foods-wraper")[0];
				for (var i = 0; i < foodList.length; i++) {
					var currentList = foodList[i].offsetTop - foodsWraper.scrollTop;
					if (currentList <= 0) {
						this.Index = i
					}
				}
			},
			scrollFood: function (index) {
				this.Index = index;
				console.log(this.Index)
				this.foodListTop=[];
				var foodList = document.getElementsByClassName("food-list");
	        	for (var i = 0; i < foodList.length; i++) {
	        		this.foodListTop.push(foodList[i].offsetTop);
	        	};
	        	// console.log(this.foodListTop);
				var foodsWraper = document.getElementsByClassName("foods-wraper")[0];
				var foodListTop = this.foodListTop[index];
				var scrollTop = foodsWraper.scrollTop;
				var length = foodListTop - scrollTop;	// 滚动距离
				function scroll() {
					scrollTop += length*0.02;
					foodsWraper.scrollTop = scrollTop;
					// console.log(scrollTop, foodsWraper.scrollTop);
				};
				for (var i = 0; i < 50; i++) {	// 经典的for+setTimeout实现过渡效果
					setTimeout(function () {
						scroll();
					}, 2*i)
				};
			},
			_drop: function (target) {
				// console.log(target);
				this.$refs.shopCart.drop(target);	//  结合ref="shopCart"，$refs访问子组件，然后触发其事件，
			},
			currentFood: function (food) {
				this.clickFood = food;
				this.$refs.food.show();		// 拿到子组件，触发子组件的事件
				// console.log(this.clickFood);
			}
		},
		components: {		// 注册组件
			shopCart,
			cartControl,
			food
		}
    };
</script>

<style>
	.goods{ display: flex;position: absolute;top: 174px;bottom: 58px;width: 100%; }
	/*.goods{ display: flex;width: 100%; height: calc( 100% - 232px); overflow: hidden;}*/
	.menu-wraper{flex: 0 0 80px; width:80px; background-color: #f3f5f7; overflow-y: scroll; }
	.foods-wraper{flex: 1; overflow-y: scroll;}
	.menu-item{width: 100%; display: table; height: 56px; padding: 0 12px;}
	.menu-item.current{background-color: #fff;font-weight: bold;}
	.menu-item .text{ display: table-cell;vertical-align: middle; border-bottom: 1px solid rgba(1,17,27,0.1);font-size: 0; }
	.menu-item .text .text-name{ font-size: 12px; color: rgb(7,17,27); line-height: 14px;}
	.menu-item .text .decrease{background: url(decrease_3@2x.png) no-repeat;  }
	.menu-item .text .discount{background: url(discount_3@2x.png) no-repeat;  }
	.menu-item .text .guarantee{background: url(guarantee_3@2x.png) no-repeat;  }
	.menu-item .text .invoice{background: url(invoice_3@2x.png) no-repeat;  }
	.menu-item .text .special{background: url(special_3@2x.png) no-repeat;  }
	.menu-item .text .icon{display: inline-block;width: 12px; height: 12px; background-size: contain; vertical-align: top;}

	.food-list .list-title{ height: 26px; padding-left: 14px; font: 12px/26px a; color: rgb(147,153,159); background-color: #f3f5f7; border-left: 2px solid #d9dde1;}
	.food-item { padding: 18px; border-bottom: 1px solid rgba(7,17,27,0.1); display: flex;position: relative;}
	.food-item:last-child { border-bottom: none; }
	.food-icon {width: 30%;min-width: 30%;}
	.food-icon img{width: 100%;border-radius: 3px;}
	.food-content{ margin-left: 10px; }
	.food-name{ padding-top: 2px; font:  14px/14px a; color: rgb(7,17,27); }
	.font_gray_12{ font: 12px/12px a; color: rgb(147,153,159);}
	.food-description{ margin: 8px 0; }
	.sell-count { margin: 8px 0; font-size: 0;}
	.sell-count span{ display: inline-block; }
	.food-sellCount{margin-right: 12px;}
	.food-price{ font-size: 0; }
	.price{ font: bold 12px/12px a; color: #f00; margin-right: 8px;}
	.cartControl-wraper{ position: absolute; right: 18px; bottom: 15px; }
</style> 