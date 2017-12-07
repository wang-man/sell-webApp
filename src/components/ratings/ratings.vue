<template>
	<div class="ratings">
		<div class="global_scoring">
            <div class="global_scoring_left">
                <div class="composite_scrore yellow_text">
                    {{seller.score}}
                </div>
                <div class="composite_scrore_text">
                    综合评分
                </div>
                <div class="composite_scrore_high">
                    高于周边商家
                </div>
            </div>
            <div class="global_scoring_right">
                <div class="serviceScore score_item">
                    <div class="score_item_type">服务态度</div>
                    <div class="star_wrapper">
                        <star :size="36" :score="seller.serviceScore"></star>
                    </div>
                    <div class="serviceScore_srcore yellow_text">
                        {{seller.serviceScore}}
                    </div>
                </div>
                <div class="foodScore score_item">
                    <div class="score_item_type">商品品质</div>
                    <div class="star_wrapper common_style">
                        <star :size="36" :score="seller.foodScore"></star>
                    </div>
                    <div class="serviceScore_srcore yellow_text">
                        {{seller.foodScore}}
                    </div>
                </div>
                <div class="serviceScore score_item">
                    <div class="score_item_type">送达时间</div>
                    <div class="star_wrapper deliveryTime">
                        {{seller.deliveryTime}}分钟
                    </div>
                </div>
            </div>
        </div>
        <div class="split_line"></div>
        <div class="food_info_list border_bot">
            <h3 class="food_title">商品评价</h3>
            <foodRating :ratingTypeDes="ratingTypeDes" :ratings_length="ratings_length" v-show="ratings" v-on:haveContentFn="haveContent_" v-on:showRatingsFn="showRatings_"></foodRating>
        </div>
        <div class="food_info_list">
            <ul class="ratings_item">
                <li class="ratings_list" v-for="rating in screeningRatings">
                    <div class="rating_head">
                        <div class="rating_people">
                            <img :src="rating.avatar" class="rating_avatar">
                            <div class="name_star_deliveryTime">
                                <div class="rating_name">{{rating.username}}</div>
                                <span class="star_wrapper">
                                    <star :size="24" :score="seller.foodScore"></star>
                                </span>
                                <span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                        </div>
                        <span class="rating_time">{{rating.rateTime | time}}</span>
                    </div>
                    <div class="rating_detail">
                        <div class="rating_text">
                            {{rating.text}}
                        </div>
                        <div class="recommend">
                            <i class="" :class="{ 'icon-thumb_down': rating.rateType, 'icon-thumb_up': !rating.rateType}"></i>
                            <ul class="recommend_item" v-show="rating.recommend">
                                <li class="recommend_list" v-for="recommend in rating.recommend"><span class="recommend_food">{{recommend}}</span></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
    import star from "../star/star";
    import foodRating from "../foodRating/foodRating";
    // 输出组件，大括号中空的，就代表输出的是自己
    export default {
        props: ["seller"],
    	data: function () {
    		return {
                ratings: [],
                ratingTypeDes: ["全部", "满意", "不满意"],
                all_ratings: [],
                good_ratings: [],
                bad_ratings: [],
                ratings_length: [],
                haveContent: false,
                showRatingType: 0
    		}
    	},
    	created: function () {
            var self = this;
            this.$nextTick(function () {    // 异步获取数据
                this.$http.get('/api/ratings').then(function (res) {     // axios取得数据
                    // console.log(res.data);
                    if (res.data.errno === 0) {
                        self.ratings = res.data.data;
                    };
                });
            });
    	},
        watch: {
            ratings: function (val) {
                var _this = this;
                if (val) {
                    this.all_ratings = val;
                    val.forEach(function(rating, index) {
                        if (!rating.rateType) {
                            _this.good_ratings.push(rating);
                        }else {
                            _this.bad_ratings.push(rating);
                        }
                    });
                    this.ratings_length.push(val.length,this.good_ratings.length,this.bad_ratings.length);
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
                        if (!this.haveContent) {    // 如果不开启筛选，则直接取得全部评论
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
                        if (!this.haveContent) {    // 如果不开启筛选，则直接取得好评
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
                        if (!this.haveContent) {    // 如果不开启筛选，则直接取得差评
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
            showRatings_: function (num) {
                this.showRatingType = num;
                // console.log(num);
            },
            haveContent_: function (flag) {
                this.haveContent = flag;
            }
        },
        components: {
            star,
            foodRating
        }
    };
</script>

<style>
    .yellow_text{ color: rgb(255, 153, 0); }
	.ratings{position: absolute;top: 174px;bottom: 0; width: 100%; color: rgb(7, 17, 27); font: 13px/13px a; overflow: scroll;}
    .global_scoring{ display: flex; padding: 18px; }
    .global_scoring_left{ width: 32%; text-align: center;}
    .composite_scrore{ font: 24px/24px a; margin-bottom: 6px;}
    .composite_scrore_text{ margin-bottom: 8px;}
    .composite_scrore_high{ font: 12px/12px a; color: rgba(7, 17, 27, 0.5); }
    .global_scoring_right{ padding-left: 24px; border-left: 1px solid rgba(7, 17, 27, 0.1); }
    .score_item{ display: flex; margin: 8px 0; }
    .score_item_type { white-space: nowrap; }
    .star_wrapper{ margin: 0 12px; }
    .deliveryTime{ color: rgba(7, 17, 27, 0.5); }
    @media screen and (min-width:320px) and (max-width:359px) {
        .global_scoring{ padding: 18px 14px; }
        .global_scoring_right{ padding-left: 12px; }
        .star_wrapper{ margin: 0 8px; }
        .score_item .star-36 .star-item{ margin-right: 4px; }
    }
    .split_line{ height: 18px; border-top: 1px solid rgba(7,17,27,0.1); border-bottom: 1px solid rgba(7,17,27,0.1); background-color: #f3f5f6;}
    .food_info_list{ padding: 18px; position: relative; }
    .border_bot{ border-bottom: 1px solid rgba(7, 17, 27, 0.1); }
    .ratings_item{font: 13px/13px a; }
    .rating_head{ display: flex; justify-content: space-between;}
    .rating_people{ display: flex; }
    .rating_avatar{ width: 28px; height: 28px; border-radius: 50%; margin-right: 12px;}
    .name_star_deliveryTime .star_wrapper{display: inline-block; margin: 0; }
    .name_star_deliveryTime .deliveryTime{ display: inline-block; }
    .rating_name{ margin-bottom: 2px; }
    .rating_time{font-size: 12px; color: rgba(7, 17, 27, 0.5);}
    .ratings_list:first-child{ padding-top: 0; }
    .ratings_list{ padding: 16px 0; border-bottom: 1px solid rgba(7, 17, 27, 0.1);}
    .rating_detail{ padding-left: 40px; margin-top: 6px; }
    .rating_text{ line-height: 18px; }
    .rating_detail .icon-thumb_up{ color: rgb(0, 160, 220); line-height: 20px;}
    .rating_detail .icon-thumb_down{ color: rgb(147, 153, 189); line-height: 20px; }
    .recommend{display: flex; margin-top: 8px; }
    .recommend_item{ display: inline-block; margin-left: 8px;}
    .recommend_list{ display: inline-block; margin-right: 8px; padding: 2px 6px; border: 1px solid rgba(7, 17, 27, 0.1); }
    .recommend_food{ font: 12px/12px a; }
</style>