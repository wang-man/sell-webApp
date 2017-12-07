<template>
	<div class="seller">
		<div class="seller_info_list">
			<div class="seller_sell_info">
				<div class="seller_sell_info_results">
					<h2 class="seller-name seller_info_list_title">{{seller.name}}</h2>
					<div class="star_rating_sell">
						<star :size="36" :score="seller.score"></star>
						<span class="ratingCount">({{seller.ratingCount}})</span>
						<span class="ratingCount">月售{{seller.sellCount}}单</span>
					</div>
				</div>
				<div class="collection">
					<i class="icon-favorite" :class="{'hasFavorite': hasFavorite}" @click="favorite"></i>
					<span class="collection_state">{{favorite_text}}</span>
				</div>
			</div>
			<ul class="seller_delivery_info_wrapper">
				<li class="seller_delivery_info">
					<div class="delivery_info_text">
						起送价
					</div>
					<div class="delivery_info_count">
						{{seller.minPrice}}<span class="small_text">元</span>
					</div>
				</li>
				<li class="seller_delivery_info">
					<div class="delivery_info_text">
						配送价格
					</div>
					<div class="delivery_info_count">
						{{seller.deliveryPrice}}<span class="small_text">元</span>
					</div>
				</li>
				<li class="seller_delivery_info">
					<div class="delivery_info_text">
						平均配送时间
					</div>
					<div class="delivery_info_count">
						{{seller.deliveryTime}}<span class="small_text">分钟</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="split_line"></div>
		<div class="seller_info_list padding_bottom_0">
			<div class="seller_info_list_title">
				公告与活动
			</div>
			<div class="seller_info_list_bulletin">
				{{seller.bulletin}}
			</div>
			<ul class="support-list">
				<li class="support-item" v-for="(item, index) in seller.supports">
					<span :class="classMap[index]" class="icon"></span>
					<span class="item-description">{{item.description}}</span>
				</li>
			</ul>

		</div>
		<div class="split_line"></div>
		<div class="seller_info_list">
			<div class="seller_info_list_title">
				商家实景
			</div>
			<ul class="seller_pics">
				<li class="seller_pics_list" v-for="pic in seller.pics">
					<img :src="pic" alt="">
				</li>
			</ul>
		</div>
		<div class="split_line"></div>
		<div class="seller_info_list padding_bottom_0">
			<div class="seller_info_list_title">
				商家信息
			</div>
			<ul class="support-list">
				<li class="support-item" v-for="(info, index) in seller.infos">
					<span class="item-description">{{info}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
    // 输出组件，大括号中空的，就代表输出的是自己
    import {saveToLocal, loadFromLocal} from "../../common/js/store";
    import star from "../star/star";
    export default {
    	props: ["seller"],
    	data: function () {
    		return {
				classMap: ["decrease","discount","special","invoice","guarantee"],
				hasFavorite: loadFromLocal(this.seller.id, "favorite", false)	// 这里不再是false，而是从存储中拿取
    		}
    	},
    	mounted: function () {
		},
		computed: {
			favorite_text: function () {
				return this.hasFavorite ? "已收藏" : "点击收藏";
			}
		},
    	methods: {
    		favorite: function () {
    			this.hasFavorite = !this.hasFavorite;
    			saveToLocal(this.seller.id, "favorite", this.hasFavorite);	// 存储收藏状态
    		}
    	},
    	components: {
    		star
    	}
    };
</script>
<style>
	.seller{position: absolute;top: 174px;bottom: 0; width: 100%; overflow: scroll;}
	.seller_info_list{ padding: 18px; }
	.padding_bottom_0{ padding-bottom: 0; }
	.seller_sell_info{ display: flex; justify-content: space-between;padding-bottom: 18px; border-bottom: 1px solid rgba(7, 17, 27, 0.1);  }
	.seller_info_list_title{ font: 16px/16px a; margin-bottom: 12px; padding: 0; text-align: left;}
	.star_rating_sell{ color: rgb(77, 85, 93); }
	.star_rating_sell .star { margin-right: 4px; }
	.star_rating_sell .ratingCount{ display: inline-block; line-height: 16px; margin-right: 8px; vertical-align: top; }
	.collection{width: 50px; text-align: center; color: rgb(77, 85, 93);}
	.collection .icon-favorite{ display: block; font: 24px/24px a; margin-bottom: 4px;}
	.collection .icon-favorite.hasFavorite{ color: #e93030; }
	.collection_state{ width: 100%; display: block; }
	.seller_delivery_info_wrapper{ padding-top: 18px; display: flex; text-align: center;}
	.seller_delivery_info{ flex: 1; border-right: 1px solid rgba(7,17,27,0.1);}
	.seller_delivery_info:last-child{ border: none;}

	.delivery_info_text{ color: rgb(147, 153, 159); margin-bottom: 4px; }
	.delivery_info_count{ font: 26px/26px a; }
	.delivery_info_count .small_text{ font: 12px/12px a; }
	.split_line{ height: 18px; border-top: 1px solid rgba(7,17,27,0.1); border-bottom: 1px solid rgba(7,17,27,0.1); background-color: #f3f5f6;}
	.seller_info_list_bulletin{padding: 0 12px; margin-bottom: 16px; font: 12px/24px a; color: #e93030; }
	.seller_info_list .support-item{border-top: 1px solid rgba(7, 17, 27, 0.1); padding: 16px 12px; margin-bottom: 0;}

	.seller_pics{ overflow-y: scroll; }
	.seller_pics_list{display: inline; white-space: nowrap; margin-right: 6px; }
	.seller_pics_list img{ width: 120px; height: 90px; }

</style>