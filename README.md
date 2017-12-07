
vue2.0高仿饿了么
-----------
项目说明：

 - 开发环境为node.js+webpack构建。
 - vue-cli搭建项目框架
 - vue-router页面路由切换
 - vue-resource数据请求（本地json数据）
 
项目查看：下载项目后cd到该目录，执行npm run dev，浏览器将自动打开，切换至手机模式。
### 商品列表页 ###
 - 小球飞入动画，这是一个难点，代码部分需要细细揣摩。
 - 父子组件之间数据通信，主要是添加按钮和购物车之间的通信
 - 菜单栏联动----这里的菜单栏和商品列表的联动效果我并没有使用better-scroll，而是用原生js写的。因为像这种溢出直接css设置scroll不就可以了嘛。点击左侧菜单栏后右侧列表栏滚动则是使用for+setTimeout实现的过度滚动，同样不需要better-scroll就可以做到。

![商品列表页](https://github.com/wang-man/eeee/blob/master/2.jpg)
----------
### 商家页 ###

 - 收藏功能---本地存储
 -

![商家页](https://github.com/wang-man/eeee/blob/master/1.jpg)
----------
### 浮层 ###

 - Sticky footers布局

![浮层](https://github.com/wang-man/eeee/blob/master/3.jpg)
