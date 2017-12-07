// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';     // App.vue组件
import Router from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import axios from "axios";
import vueAxios from "vue-axios";

Vue.use(Router);
Vue.use(vueAxios, axios);

// 组件挂载到路由
let router = new Router({
    routes: [
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller }
    ]
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    template: '<App></App>',
    components: { 'App': App }          // 注册App组件标签
});
router.push('/seller');      // 初始打开路由