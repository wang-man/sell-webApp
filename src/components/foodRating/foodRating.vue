<template>
	<div class="food_rating">
		<ul class="ratings_count">
			<li class="ratings_type" v-for="(type, index) in ratingTypeDes" @click="showRatings(index)" :class="{'selected': showRatingType === index}">
				<span class="ratings_type_text">{{type}}</span>{{ratings_length[index]}}
			</li>
		</ul>
		<div class="choose_rating">
			<i class="icon-check_circle" :class="{'selected': haveContent}" @click="onlyContent"><span>只看有内容的评价</span></i>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: ["ratingTypeDes", "ratings_length"],
		data: function () {
			return {
				haveContent: false,
				showRatingType: 0
			}
		},
		
		created: function () {
		},
		computed: {
			
		},
		methods: {
			onlyContent: function () {
				this.haveContent = !this.haveContent;
				this.$emit("haveContentFn", this.haveContent);
			},
			showRatings: function (index) {
				this.showRatingType = index;
				this.$emit("showRatingsFn", index);
			}
		},
		components: {
			
		}
	}
</script>
<style>
	.ratings_count{ font-size: 0; margin-top: 18px; padding-bottom: 18px; border-bottom: 1px solid rgba(7, 17, 27, 0.1)}
	.ratings_type{display: inline-block; padding: 8px; margin-right: 8px; font: 12px/12px a; border-radius: 6px; color: rgb(77, 85, 93); background-color: rgba(0, 160, 220, 0.2); color: rgb(77, 85, 93);}
	.ratings_type.selected{ background-color: rgba(0, 160, 220, 1); color: #fff;}
	.ratings_type:nth-child(3){ background-color: rgba(77, 85, 93, 0.2); color: rgb(77, 85, 93);}
	.ratings_type:nth-child(3).selected{ background-color: rgba(77, 85, 93, 1); color: #fff;}
	.ratings_type_text{ margin-right: 3px; }
	.choose_rating { color: rgb(147, 153, 159); padding-top: 12px;}
	.choose_rating .icon-check_circle{ font-size: 24px; margin-right: 4px;}
	.choose_rating .icon-check_circle.selected{ color: rgb(0, 160, 220); }
	.choose_rating .icon-check_circle span{display: inline-block;margin-left: 3px; font: 12px/24px a; vertical-align: top;}
	.choose_rating .icon-check_circle.selected span{color: #333;}
</style>