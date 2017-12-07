<template>
	<div class="star" :class="starType">	<!-- class同样可以用函数取得 -->
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span >
	</div>										<!-- 绑定class也可以是一个数组传入 -->
</template>

<script type="text/ecmascript-6">
	var class_on = "on", class_half = "half", class_off = "off";
	var totalStar = 5;
	export default {
		props: {
			size: {type: Number},
			score: {type: Number}
		},
		computed: {
			starType: function () {
				return 'star-' + this.size;
			},
			itemClasses: function () {
				var result = [];
				var score = Math.floor(this.score * 2) / 2;
				var hasDecimal = score % 1 !== 0;	// 有无小数
				var integer = Math.floor(score);
				for (var i = 0; i < integer; i++) {
					result.push(class_on);
				};
				if (hasDecimal) { result.push(class_half); };

				while (result.length < totalStar) {		// 插入无星
					result.push(class_off); 
				};
				return result;		// 计算属性中一定要返回一个结果,这个函数是自执行的.在DOM中直接使用函数名作为变量
			}
		}
	};
</script>
<style>
	.star{ font-size: 0; }
	.star-item{ display: inline-block;background-repeat: no-repeat;background-size: cover; }
	.star-48 {height: 20px;}
	.star-48 .star-item{width: 20px;height: 20px;margin-right: 22px;}
	.star-48 .star-item:last-child{margin-right: 0;}
	.star-48 .star-item.on{background-image: url(../../../static/img/star48_on@2x.png);}
	.star-48 .star-item.half{background-image: url(../../../static/img/star48_half@2x.png);}
	.star-48 .star-item.off{background-image: url(../../../static/img/star48_off@2x.png);}

	.star-36 {height: 15px;}
	.star-36 .star-item{width: 15px;height: 15px;margin-right: 6px;}
	.star-36 .star-item:last-child{margin-right: 0;}
	.star-36 .star-item.on{background-image: url(../../../static/img/star36_on@2x.png);}
	.star-36 .star-item.half{background-image: url(../../../static/img/star36_half@2x.png);}
	.star-36 .star-item.off{background-image: url(../../../static/img/star36_off@2x.png);}

	.star-24 {height: 10px;}
	.star-24 .star-item{width: 10px;height: 10px;margin-right: 3px;}
	.star-24 .star-item:last-child{margin-right: 0;}
	.star-24 .star-item.on{background-image: url(../../../static/img/star24_on@2x.png);}
	.star-24 .star-item.half{background-image: url(../../../static/img/star24_half@2x.png);}
	.star-24 .star-item.off{background-image: url(../../../static/img/star24_off@2x.png);}


</style> 