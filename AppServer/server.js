/* 这个文件是创建一个服务器，运行项目打包后的文件。浏览整个项目成果 */
var express = require('express');
var config = require('../config/index');	// 引入配置文件

var port = process.env.PORT || config.build.port;	// 这里是端口号。要么使用开发时候的端口号要么使用build下的端口号
													// 刚才手动在config目录下的index的build对象里加了port:9000端口
var app = express();				// 启动express
var router = express.Router();		// 使用路由

router.get('/', function (req, res, next) {
	req.url = '/index.html';	// 请求地址为index文件
	next();
});

app.use(router);				// 使用这个路由

/* 注意，下面一段我们在build下的dev.server.js也定义的。数据接口 */

// 拿到本地模拟用的数据
var appData = require("../data.json");
var seller = appData.seller;  
var goods = appData.goods;
var ratings = appData.ratings;

// 开始编写路由和数据接口
var ApiRouters = express.Router();
ApiRouters.get("/seller", function (req, res) {
  res.json({
    errno: 0,        // 状态码
    data: seller     // 数据
  });
});

ApiRouters.get("/goods", function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

ApiRouters.get("/ratings", function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

// 使用此路由，路由path为api
// 在地址栏输入localhost:8080/api/seller就可以看到数据
app.use("/api", ApiRouters);

app.use(express.static('../dist'));		// 访问静态资源，dist目录

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('服务器监听在http://localhost:' + port);
})



