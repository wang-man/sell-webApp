<template>
	<div>
		<div class="header">
			<div class="content-wraper">
				<div class="avatar">
					<img width="64" height="64" :src="seller.avatar" alt="">
				</div>
				<div class="content">
					<div class="title">
						<span class="brand"></span>
						<span class="name">{{seller.name}}</span>
					</div>
					<div class="description">
						{{seller.description}} / {{seller.deliveryTime}}分钟送达
					</div>
					<div class="support" v-if="seller.supports">
						<span class="support-icon" :class="classMap[seller.supports[0].type]"></span>
						<span class="support-description">
							{{seller.supports[0].description}}
						</span>
						<a href="javascript:;" @click="showDetail" class="support-more">{{seller.supports.length}}个
							<i class="icon-keyboard_arrow_right"></i>
						</a>
					</div>
				</div>
			</div>
			<div class="bulletin-wraper">
				<span class="bulletin-icon"></span>
				<span class="bulletin">{{seller.bulletin}}</span>
				<a href="javascript:;" @click="showDetail" class="bulletin-more sell-icon icon-keyboard_arrow_right"></a>
			</div>
			<div class="background">
				<img :src="seller.avatar" alt="">
			</div>
			<transition name="fade">
				<div class="detail" v-show="detailShow">
					<div class="detail-content">
						<h2 class="seller-name">{{seller.name}}</h2>
						<div class="seller-score">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="Preferential-info">
							<div class="line"></div>
							<div class="pre-info-title">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="support-list">
							<li class="support-item" v-for="(item, index) in seller.supports" >
								<span :class="classMap[index]" class="icon"></span>
								<span class="item-description">{{item.description}}</span>
							</li>
						</ul>
						<div class="Preferential-info">
							<div class="line"></div>
							<div class="pre-info-title">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin-txt">
							<p class="bulletin-txt-text">{{seller.bulletin}}</p>
						</div>
					</div>
					<div class="detail-close">
						<i class="icon-close" @click="hideDetail"></i>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '../star/star';
	export default {
		props: ["seller"],		// 取得父组件的值
		data: function () {
			return {
				detailShow: false
			}
		},
		methods: {
			showDetail: function () {
				this.detailShow = true;
			}, 
			hideDetail: function () {
				this.detailShow = false;
			}
		},
		mounted: function () {	// 定义一个变量，此变量是一个class的数组。
			this.classMap = ["decrease","discount","special","invoice","guarantee"];
		},
		components: {
			star
		}
	};
</script>
<style>
	.header{ position: relative;overflow: hidden; color:#efefef;}
	.content-wraper{padding: 24px 12px 18px 24px; background-color: rgba(28,32,36,0.7);position: relative; }
	.avatar{display: inline-block;margin-right: 16px;vertical-align: top;}
	.avatar img{border-radius: 3px; vertical-align: bottom;}
	.content{display: inline-block;}
	.title .brand{display: inline-block;width: 30px;height: 18px;background: url(brand@2x.png) no-repeat; background-size:contain;vertical-align: bottom;}
	.title .name{margin-left: 3px; font:bold 16px/16px a;}
	.description{font-size: 12px;margin-top: 8px;}
	.support{margin-top: 10px;font-size: 12px;}
	.decrease{background: url(decrease_1@2x.png) no-repeat;  }
	.discount{background: url(discount_1@2x.png) no-repeat;  }
	.guarantee{background: url(guarantee_1@2x.png) no-repeat;  }
	.invoice{background: url(invoice_1@2x.png) no-repeat;  }
	.special{background: url(special_1@2x.png) no-repeat;  }
	.icon-keyboard_arrow_right{font-size: 10px; vertical-align: middle;}
	.background{ position: absolute;top: -90px;left: 0;width: 100%;height: 100%;z-index:-1;}
	.background img{width: 100%; filter: blur(4px);} /*模糊*/
	.support-icon{ display: inline-block;width: 12px;height: 12px;background-size: contain;vertical-align: bottom;  }
	.support-more{ position: absolute;bottom: 18px; right: 12px; width: 40px; height: 24px; border-radius: 12px;background-color: rgba(0,0,0,0.5);line-height: 24px;color: #fff;text-align: right;}
	.bulletin-wraper{height:28px; line-height: 28px; padding:0 15px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background-color: rgba(28,32,36,0.9); font-size: 12px;}
	.bulletin-wraper .bulletin-icon{display: inline-block; width: 22px; height: 12px;background: url(bulletin@2x.png) no-repeat;background-size: contain; vertical-align: middle;}
	.bulletin-more {position:absolute;height: 28px;line-height: 32px; right: 12px; }
	.bulletin{vertical-align: middle;}

	.detail{position: fixed;top: 0;left: 0;width: 100%;height: 100%;overflow: auto;background: rgba(0,0,0,0.8);opacity: 1;z-index: 10;}
	.fade-enter-active, .fade-leave-active{ transition: all 0.3s; }
	.fade-enter, .fade-leave-to{background: rgba(0,0,0,0);opacity: 0;}
	.detail-content{ min-height: 100%; padding-bottom: 60px; width: 80%; margin-left: 10%; color: #fff;}
	.detail-close{ height: 60px; margin-top: -60px;text-align: center; line-height: 60px; font-size: 24px; }
	.seller-name{ text-align: center; font: bold 16px/16px a; padding:  64px 0 16px; }
	.seller-score{ text-align: center; }
	.star{ display: inline-block; }
	.Preferential-info{ display: flex; margin: 28px auto 24px; }
	.line{ flex: 1;position: relative; top: -6px; border-bottom: 1px solid rgba(255,255,255,0.4);}
	.pre-info-title{ padding: 0 12px; font: bold 14px/14px a; }

	.support-list{ margin: 0 auto;}
	.support-item {line-height: 0; margin-bottom: 12px; font-size: 0; padding: 0 12px;} 
	.support-item .icon{display: inline-block; width: 16px;height: 16px; margin-right: 6px; background-size: contain;}
	.support-item .item-description{display: inline-block; font: 12px/16px a; vertical-align: top;}

	.bulletin-txt{ padding: 0 12px; }
	.bulletin-txt-text{ font: 12px/24px a; }
</style>