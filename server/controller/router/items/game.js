module.exports = function(app) {
	var gameManager = require('../../manager/items/game');

	// 获取游戏列表
	app.get("/game/getGames", gameManager.getGames);

	// 增加游戏
	app.post("/game/addGame", gameManager.addGame);

	// 修改游戏
	app.post("/game/updateGame", gameManager.updateGame);

	// 删除游戏
	app.get("/game/deleteGames", gameManager.deleteGames);
};