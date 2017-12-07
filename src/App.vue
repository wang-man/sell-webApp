<template>
    <div class="wraper">
        <v-header :seller="seller"></v-header>  <!-- 将seller数据绑定到变量seller传到header组件 -->
        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <!-- 路由内容 --><!-- 给每个路由都先输入seller数据 -->
        <keep-alive>
            <router-view :seller="seller" keep-alive></router-view>
        </keep-alive>
    </div>
</template>
    
<script type="text/ecmascript-6">
    import {urlParse} from './common/js/util';    // 引入解析url的方法。注意引入方法要用大括号包围
    import header from './components/header/header';    // 引入组件
    export default {
        data: function () {
            return {
                seller: {
                    id: (function () {          // id模拟某一个商家，带入url参数中，根据此id取得该商家数据
                        var queryPram = urlParse();
                        console.log(queryPram);
                        return queryPram.id;
                    })()
                }
            }
        },
        created: function () {
            var self = this;
            this.$http.get('/api/seller?id=' + this.seller.id).then(function (res) {     // axios取得数据
                // console.log(res.data);
                if (res.data.errno === 0) {
                    // self.seller = res.data.data;
                    // 因为我们加入了商家id，所以不能直接覆盖seller，而是另外添加请求的数据
                    // Object.assign方法有多个参数，用于将后面的参数合并到第一个参数。返回第一个参数。类似于extend方法。
                    self.seller = Object.assign({}, self.seller, res.data.data);
                };
                // console.log(self.seller);
            });
        },
        components: {
            'v-header': header                          // 注册组件标签
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .tab
        display: flex
        height: 40px
        line-height: 40px
        text-align: center
        border-bottom: 1px solid rgba(7,17,21,0.1)
        .tab-item
            flex: 1
            a
                display: block
                font-size: 14px
                color: rgb(77,85,93)
            .router-link-active
                color: rgb(240,20,20)
    .wraper
        height:100%  
</style>
