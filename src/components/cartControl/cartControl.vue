<template>
	<div class="cartControl">
		<transition name="move">
			<div class="cart-dec icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decCount">
			</div>
		</transition>
		<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCount"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: ["food"],
		data: function () {
			return {
				
			}
		},
		created: function () {
			if (!this.food.count) {
				this.$set(this.food, "count", 0);
			}	// 当我们创建一个新数据变量时,要是用$set。这里给food对象创建一个count属性,当然，这个属性是会被添加到源数据中的，我们在其他组件中就可以使用到它
			// console.log(this.food)
		},
		computed: {			// 计算属性--当一个变量发生变化时，另一个关联的变量根据计算也相应改变
			
		},
		methods: {
			addCount: function (event) {
				this.food.count ++;
				// debugger
				this.$emit('cartAdd', event.target);	// vue2.0方法用$emit触发父组件中事件(cartAdd),并传递数据：DOM对象
			},
			decCount: function () {
				if (this.food.count > 0) {
					this.food.count --;
				}
			}
		}
	}
</script>
<style>
	.cartControl{ display: flex;font-size: 0;  }
	.cart-dec,.cart-add{  height: 24px; font-size: 24px;  color: rgb(0,160,220);}
	.cart-count{ height: 24px; ;padding: 0 5px; font: 12px/22px a; color: #757575;}
	.move-enter-active, .move-leave-active{ transition: all 0.3s; }
	.move-enter, .move-leave-to{ opacity: 0; transform: translate3d(20px, 0, 0) rotate(180deg);  }
</style>