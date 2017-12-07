/*
 *解析url中的参数
 *@example ?id=123&a=b
 *@return Object {id: 123, a: b}
*/

export function urlParse () {
	var param = window.location.search;
	var obj = {};
	var reg = /[?&][^?&]+=[^?&]+/g;		// 匹配如：?id=123
	var arr = param.match(reg);
	// arr = ["?id=123", "&a=b"]
	if (arr) {
		arr.forEach( function(item, index) {
			var tempArr = item.substring(1).split("=");	// 取出第一个字符后面的，并用=号分割成数组
			var key = decodeURIComponent(tempArr[0]); 	// url中的参数是编码后的，会带有16进制编码字符,可能不会像举例中那么清晰干净，所以这里需要解码
			var val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
		});
	};
	return obj;
};