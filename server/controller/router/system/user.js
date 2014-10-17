module.exports = function(app) {
	var userManager = require('../../manager/system/user');

	// 登录
	app.post("/user/login", userManager.login);

	// 验证登录
	app.post("/user/checklogin", userManager.checkLogin);
};