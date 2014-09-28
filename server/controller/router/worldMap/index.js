/** 
 * 世界地图 - 路由
 */

module.exports = function(app) {
	var wmManager = require('../../manager/worldMap');

	// 可注册多个路由
	app.get("/worldmap/money", wmManager.getMoney);
	app.get("/worldmap/register", wmManager.getRegister);
	app.get("/worldmap/active", wmManager.getActive);
};