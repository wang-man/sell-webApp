<template>
	<transition name="slide">
		<div class="food" v-show="showFood">
			<div class="icon_back" @click="back">
				<i class="icon-arrow_lift"></i>
			</div>
			<div class="food__detail_content">
				<div class="food_img">
					<img :src="food.image" alt="">
				</div>
				<div class="food_info">
					<div class="food_info_list">
						<h3 class="food_name">{{food.name}}</h3>
						<div class="sell-count">
							<span class="food-sellCount font_gray_12">月售{{food.sellCount}}份</span>
							<span class="food-ratings font_gray_12">好评率{{food.rating}}%</span>
						</div>
						<div class="food-price">
							<span class="price">¥{{food.price}}</span>
							<span v-show="food.oldPrice" class="oldPrice font_gray_12">¥{{food.oldPrice}}</span>
							
						</div>
						<div class="to_buy">
							<div v-show="food.count" class="cartControl_wraper">
								<cartControl :food="food"></cartControl>	
								<!-- 又商品数据传入购买组件 -->
							</div>
							<a v-show="!food.count" @click="addFirst" href="javascript:;" class="addCart_btn">加入购物车</a>
						</div>
					</div>
					<div class="split_line" v-show="food.description"></div>
					<div class="food_info_list" v-show="food.description">
						<h3 class="food_title">商品介绍</h3>
						<p class="food-description font_gray_12">{{food.description}}</p>
					</div>
					<div class="split_line" v-show="food.ratings"></div>
					<div class="food_info_list border_bot">
						<h3 class="food_title">商品评价</h3>
						<foodRating :ratingTypeDes="ratingTypeDes" :ratings_length="ratings_length" v-show="food.ratings" v-on:haveContentFn="haveContent_" v-on:showRatingsFn="showRatings_"></foodRating>
					</div>
					<div class="food_info_list">
						<ul class="ratings_item">
							<li class="ratings_list" v-for="rating in screeningRatings">
								<div class="rating_head">
									<span class="rating_time">{{rating.rateTime | time}}</span>
									<div class="rating_people">
										<span class="rating_name">{{rating.username}}</span>
										<img :src="rating.avatar" class="rating_avatar">
									</div>
								</div>
								<div class="rating_text">
									<i class="" :class="{ 'icon-thumb_down': rating.rateType, 'icon-thumb_up': !rating.rateType}"></i><span>{{rating.text}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import Vue from "vue";
	import cartControl from "../cartControl/cartControl";
	import foodRating from "../foodRating/foodRating";
	export default {
		props: ["food"],
		data: function () {
			return {
				showFood: false,
				ratingTypeDes: ["全部", "推荐", "吐槽"],
				all_ratings: [],
				good_ratings: [],
				bad_ratings: [],
				ratings_length: [],
				haveContent: false,
				showRatingType: 0
			}
		},
		created: function () {
			
		},
		watch: {
			food: function (val) {
				var _this = this;
				if (val.ratings) {
					this.all_ratings = val.ratings;
					val.ratings.forEach(function(rating, index) {
						if (!rating.rateType) {
							_this.good_ratings.push(rating);
						}else {
							_this.bad_ratings.push(rating);
						}
					});
					this.ratings_length.push(val.ratings.length,this.good_ratings.length,this.bad_ratings.length);
					// 这里不能使用赋值的方式给ratings_length，否则无法及时得到值，必须使用push
					// debugger
					console.log(this.ratings_length);
				}
			}
		},
		computed: {
			screeningRatings: function () {
				var show_ratings = [];
				switch (this.showRatingType) {
					case 0:
						if (!this.haveContent) {	// 如果不开启筛选，则直接取得全部评论
							show_ratings = this.all_ratings;
						}else {
							this.all_ratings.forEach( function(rating, index) {
								if (rating.text) {
									show_ratings.push(rating);
								}
							});
							// console.log(show_ratings);
						}
						break;
					case 1:
						if (!this.haveContent) {	// 如果不开启筛选，则直接取得好评
							show_ratings = this.good_ratings;
						}else {
							this.good_ratings.forEach( function(rating, index) {
								if (rating.text) {
									show_ratings.push(rating);
								}
							});
						}
						break;
					case 2:
						if (!this.haveContent) {	// 如果不开启筛选，则直接取得差评
							show_ratings = this.bad_ratings;
						}else {
							this.bad_ratings.forEach( function(rating, index) {
								if (rating.text) {
									show_ratings.push(rating);
								}
							});
						}
						break;
				};
				return show_ratings;
			}
		},
		methods: {
			show: function () {
				this.showFood = true;
			},
			back: function () {
				this.showFood = false;
			},
			addFirst: function (event) {		// 添加第一份
				if (!this.food.count) {
					this.$set(this.food, "count", 1);	// 给一个count变量，购物车就自动添加
				};
			},
			showRatings_: function (num) {
				this.showRatingType = num;
				// console.log(num);
			},
			haveContent_: function (flag) {
				this.haveContent = flag;
			}
		},
		components: {
			cartControl,
			foodRating
		},
		
	}

	// 这里定义全局过滤器
	Vue.filter("time", function(ratingTime) {
		var d = new Date(ratingTime),
		year = d.getFullYear(),
		month = d.getMonth() + 1 > 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1) ,
		date = d.getDate() > 10 ? d.getDate() : "0" + d.getDate(),
		hour = d.getHours(),
		minute = d.getMinutes(),
		time = year + "-" + month + "-" + date + "　" + hour + ":" + minute;
		return time;
	})
</script>
<style>
	.food{ position: fixed;top: 0;left: 0;width: 100%;bottom: 58px;background-color: #fff; overflow: scroll;}
	.slide-enter-active, .slide-leave-active{ transition: all 0.4s linear; }
	.slide-enter, .slide-leave-to{ transform: translate3d(100%, 0, 0); }
	.food_img{ width: 100%; padding-top: 100%; position: relative;}
	.food_img img{ width: 100%; height: 100%; position: absolute; top: 0; left: 0;}
	.icon_back{position: absolute; top: 0; left: 0; font-size: 18px; color: #fff; z-index: 2; padding: 10px; }
	.food_info{ }
	.food_info .split_line{ height: 18px; border-top: 1px solid rgba(7,17,27,0.1); border-bottom: 1px solid rgba(7,17,27,0.1); background-color: #f3f5f6;}
	.food_info_list{ padding: 18px; position: relative; }
	.food_info_list .food_name{ font: 14px/14px a; }
	.food_info_list .food-price{ height: 24px;}
	.food_info_list .food-price .price{ line-height: 24px;}
	.to_buy{ position: absolute; right: 18px; bottom: 18px; }
	.addCart_btn{display: inline-block; width: 74px; height: 24px; text-align: center; font: 12px/24px a; color: #fff; background-color: rgb(0, 160, 220); border-radius: 12px;}
	.food_title{ font-weight: 200; font-size: 14px; margin-bottom: 6px; }
	.food_info_list .food-description{ font: 12px/22px a; }
	.border_bot{ border-bottom: 1px solid rgba(7, 17, 27, 0.1); }
	.ratings_item{ }
	.ratings_list{ padding: 16px 0; border-bottom: 1px solid rgba(7, 17, 27, 0.1);}
	.ratings_list:last-child{border-bottom: none;}
	.food__detail_content .rating_avatar{ width: 16px; height: 16px; border-radius: 50%; margin-left: 6px;}
	.rating_head{ display: flex; justify-content: space-between; margin-bottom: 6px; color: rgb(147, 153, 159);  }
	.rating_name{ line-height: 16px; vertical-align: top; }
	.rating_text .icon-thumb_up{ color: rgb(0, 160, 220); margin-right: 4px; }
	.rating_text .icon-thumb_down{ color: rgb(147, 153, 189); margin-right: 4px; }
</style>