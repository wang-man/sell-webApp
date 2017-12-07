<template>
	<div class="shopCart">
		<div class="cart-content">
			<div class="content-left" @click="toggleList">
				<div class="cartIcon-wraper">
					<div class="cartIcon" :class="{'highLight': totalCount > 0}">
						<i class="icon-shopping_cart" :class="{'highLight': totalCount > 0}"></i>
					</div>
					<div class="totalCount" v-show="totalCount > 0 ">{{totalCount}}</div>
				</div>
				<div class="total-price" :class="{'highLight': totalPrice > 0}">
					￥{{totalPrice}}
				</div>
				<div class="transitPrice">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right" :class="{'highLight': totalPrice >= minPrice}" @click="settlement
">
				{{PriceState}}
			</div>
		</div>
		<ul class="ball-contaniar">
			<li class="ball" v-for="ball in balls" >
				<transition name="drop" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
					<div class="ball-outer" v-show="ball.show">
						<div class="ball-inner"></div>
					</div>
				</transition>
			</li>
		</ul>
		<transition name="food_wraper">
			<div class="food_wraper" v-show="fade">
				<div class="food_cover" @click="hideList"></div>
				<div class="food_content">
					<div class="list_header">
						<h1 class="list_name">购物车</h1>
						<a href="javascript:;" class="empty" @click="emptyFood">清空</a>
					</div>
					<ul class="food_item">
						<li class="food_list" v-for="food in selectFoods">
							<div class="food_name">{{food.name}}</div>
							<div class="food_totalPrice"><span class="rmb">￥</span>{{food.price*food.count}}</div>
							<div class="cartControl_wraper">
								<cartControl :food="food"></cartControl>
							</div>	
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>
<script type="text/ecmascript-6">
	import cartControl from "../cartControl/cartControl";
	export default {
		props: ["selectFoods","deliveryPrice", "minPrice"],
		data: function () {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				// dropBalls: []	// 不必存在的数组
				show: false
			}
		},
		created: function () {
		},
		computed: {			// 计算属性--当一个变量发生变化时，另一个关联的变量根据计算也相应改变
			totalPrice: function () {
				var total = 0;
				this.selectFoods.forEach( function(food, index) {
					total += food.price * food.count
				});
				// console.log(this.selectFoods);
				return total;
			},
			totalCount: function () {	// 监听数量变化
				var count = 0;
				this.selectFoods.forEach(function(food, index) {
					count += food.count
				});
				return count;
			},
			PriceState: function () {
				var PriceState;
				if (this.totalPrice === 0) {
					PriceState = "￥" + this.minPrice + "起送";
					return PriceState;
				}else if (this.totalPrice < this.minPrice) {
					PriceState = "还差￥" + (this.minPrice-this.totalPrice) + "起送";
					return PriceState;
				}else if (this.totalPrice >= this.minPrice) {
					PriceState = "去结算";
					return PriceState;
				}
			},
			fade: function () {
				if (!this.totalCount) {
					return false;
				};
				return this.show;
			}
		},
		methods: {
			drop: function (el) {
				// console.log(el);
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;		// 小球显示
						ball.el = el;			//拿到点击的元素
						// this.dropBalls.push(ball);
						break;		 // 每次点击创建一个小球
					}
				}
				// console.log(JSON.stringify(this.balls[0]));			// balls数组也被改变
				// console.log(this.balls[0]);	// balls数组也被改变
			},
			// 动画前--让元素处于起始位置
			beforeDrop: function (el) {			// 参数el表示动画的元素对象
				console.log(el)
				var count = this.balls.length;
				while (count--) {
					var ball = this.balls[count];
					if (ball.show) {
						var rect = ball.el.getBoundingClientRect();	// getBoundingClientRect获取元素相对文档偏移
						var x = rect.left - 26;		
						var y = -(window.innerHeight - rect.top - 40);	// 差值，可能为负数，代表方向
						el.style.display = "";
						el.style.webkitTransform = 'translate3d(0, ' + y + 'px, 0)';	// 父元素做y轴运动
						el.style.transform = 'translate3d(0, ' + y + 'px, 0)';
						var inner = el.getElementsByClassName("ball-inner")[0];
						inner.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';	//子元素做x轴运动
						inner.style.transform = 'translate3d(' + x + 'px, 0, 0)';
					}
				}
			},
			// 动画中--让元素回终点位置
			droping: function (el, done) {
				//通过获取某些元素的属性来触发浏览器重绘(当然还有其他的方式来触发重绘),否则动画会存在不知名的bug,比如第一次或连续快速点击会发生动画不执行的现象.重排的原理见相关资源
				var refrash = el.offsetHeight;	
				// 加上$nextTick为了动画异步执行，避免与其他动画冲突，让动画更流畅 ，关于$nextTick的用法也经常出现在获取数据上
				this.$nextTick(function () {	
					el.style.webkitTransform = 'translate3d(0, 0, 0)';
					el.style.transform = 'translate3d(0, 0, 0)';
					var inner = el.getElementsByClassName("ball-inner")[0];
					inner.style.webkitTransform = 'translate3d(0, 0, 0)';
					inner.style.transform = 'translate3d(0, 0, 0)';
					el.addEventListener('transitionend', done);
				});
			},
			// 动画后--让元素隐藏起来
			afterDrop: function (el) {
				var refrash = el.offsetHeight;	
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (ball.show) {
						ball.show = false;		// 虽然这里是可以将小球隐藏的，但有bug存在
					}
				}
				el.style.display = "none";		// 这里必须通过el隐藏小球，不能依靠ball.show = false;
				// var ball = this.dropBalls.shift();		// 取走数组第一个小球，将其隐藏
				// if (ball) {
				// 	ball.show = false;			// 这里会同时改变balls数组,所以每次动画完毕,balls中的ball都是false
				// 	el.style.display = "none";	// 每次完成动画后将元素隐藏
				// }
				// console.log(this.balls)
			},
			toggleList: function () {
				if (this.totalCount) {
					this.show = !this.show;		// show被fade()监听，并且show作为结果返回
				};
			},
			emptyFood: function () {
				this.selectFoods.forEach( function(food, index) {
					food.count = 0;
				});;
			},
			hideList: function () {
				this.show = false;
				return false;
			},
			settlement: function () {
				if ( this.totalPrice >= this.minPrice ) {
					alert("请先登录哦！")
				}
			}
		},
		components: {
			cartControl
		}
	}
</script>
<style>
	.shopCart{position: absolute; bottom: -58px;width: 100%; height: 58px; }
	.cart-content{display: flex; position: absolute;width: 100%; height: 48px; bottom: 0; left: 0; background-color: rgba(0,0,0,0.9);; z-index: 9; color: rgba(250,250,250,0.5);}
	.content-left{ flex: 1; font-size: 0; }
	.cartIcon-wraper{position: relative; bottom: 9px; display: inline-block; width: 56px; height: 56px; padding: 6px; margin-left: 12px; border-radius: 50%; background-color: #141d27; z-index: 10;vertical-align: bottom;}
	.totalCount{ position: absolute; right: 0; top: 0; width: 24px; line-height: 16px; background-color: #f22; color: #fff; border-radius: 8px; text-align: center; font: 12px/16px a;}
	.cartIcon{width: 100%;height: 100%; border-radius: 50%; background-color: rgba(255,255,255,0.2); line-height: 42px; text-align: center;}
	.cartIcon.highLight{ background-color: rgb(0,160,220); }
	.cartIcon .icon-shopping_cart{ font-size: 24px; vertical-align: middle;}
	.cartIcon .icon-shopping_cart.highLight{ color: #fff; }
	.content-left .total-price{ display: inline-block; height: 24px;margin-left: 12px;padding-right: 12px;border-right: 1px solid rgba(255,255,255,0.5); vertical-align: top;margin-top: 12px;font: bold 14px/24px a;}
	.content-left .total-price.highLight{ color: #fff; }
	.content-left .transitPrice{ display: inline-block;height: 24px;line-height: 24px;margin-left: 12px; vertical-align: top; margin-top: 12px;font: 12px/24px a;}
	.content-right{ flex: 0 0 105px; width: 105px; text-align: center;font: bold 14px/48px a; background-color: rgba(255,255,255,0.2);}
	.content-right.highLight{ background-color: rgb(0,160,220); color: #fff;}
	.ball-contaniar .ball-outer{ position: fixed; z-index: 99;bottom: 22px; left: 26px; transition: all 1s cubic-bezier(.59,-0.36,.81,.41);}
	.ball-inner { width: 16px; height: 16px; border-radius: 50%; background-color: rgb(0,160,220); transition: all 1s linear; }
	.food_wraper-enter-active,.food_wraper-leave-active{ transition: all 0.3s; }
	.food_wraper-enter-active .food_content,.food_wraper-leave-active .food_content{ transition: all 0.3s; }
	.food_wraper-enter,.food_wraper-leave-to{ opacity: 0; }
	.food_wraper-enter .food_content,.food_wraper-leave-to .food_content{ transform: translate3d(0, 100%, 0); }
	.food_cover{ position: fixed;top: 0; bottom: 48px;left: 0; width: 100%; background-color: rgba(0,0,0,0.7);backdrop-filter: blur(2px); z-index: 7;}
	.food_wraper{width: 100%; position: absolute; bottom: 48px;left: 0;}
	.food_content{ position: absolute;bottom: 0; width: 100%; background-color: #fff; max-height: 300px;z-index: 8; }
	.list_header{display: flex; height: 40px; padding: 0 15px; border-bottom: 1px solid #ddd; background-color: #f3f5f7; color: rgb(7,17,27); justify-content: space-between; line-height: 40px;}
	.list_name{ font-size: 14px; }
	.empty{ font-size: 12px; color: rgb(0, 160, 220);}
	.food_item{ padding: 0 15px; max-height: 260px;  overflow: scroll; }
	.food_list{ height: 48px; display: flex; line-height: 48px; border-bottom: 1px solid #eee;}
	.food_name{ flex: 3; font-weight: bold;}
	.food_totalPrice{ margin-right: 12px; font-size: 14px; font-weight: bolder; color: #f00; white-space: nowrap;}
	.cartControl_wraper{  }
	.cartControl_wraper .cartControl{ margin-top: 13px; }
	.food_totalPrice .rmb{ font-size: 12px; font-weight: 200;}
	@media screen and (min-width:320px) and (max-width:359px) {
		.content-right{ flex: 0 0 100px; width: 100px; }
		.cartIcon-wraper{ margin-left: 6px; }
		.content-left .total-price{ margin-left: 6px; padding-right: 6px; }
		.content-left .transitPrice{ margin-left: 6px; }
	}
</style>