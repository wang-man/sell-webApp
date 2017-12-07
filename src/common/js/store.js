/*
 *设置本地存储
*/

export function saveToLocal (id, key, val) {
	var seller = localStorage.__seller__;		// __seller__代表所有的商家信息, id代表某一个商家
	if (!seller) {				// 初始自然是没有__seller__
		seller = {};
		seller[id] = {};
		seller[id][key] = val;
	} else {
		seller = JSON.parse(seller);	// localStorage存储的是字符串格式，这里需要转成json
		if (!seller[id]) {		// 如果没有该商家
			seller[id] = {};
		}
	};
	seller[id][key] = val;		// 给商家设置存储信息
	localStorage.__seller__ = JSON.stringify(seller);	// 这里再转成string给localStorage
};

export function loadFromLocal (id, key, def) {
	var seller = localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];	// 如果没有该商家的id
	if (!seller) {
		return def;						// 那么表示没有存储它的信息
	}
	var val = seller[key];
	console.log(key);
	return val || def;
};