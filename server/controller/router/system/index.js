module.exports = function(app) {
	var loginManager = require('../../manager/system/login');

	// 登录
	app.post("/system/login", loginManager.login);

	// 进入系统
	app.get("/system/metro", loginManager.metro);
};