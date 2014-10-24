module.exports = function(app) {
	var userManager = require('../../manager/system/user');

	// 登录
	app.post("/user/login", userManager.login);

	// 验证登录
	app.get("/user/checkLogin", userManager.checkLogin);

	// 登出
	app.get("/user/logout", userManager.logout);
};