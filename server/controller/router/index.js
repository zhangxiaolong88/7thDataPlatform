/** 
 * 总路由
 */

module.exports = function(app) {
	// 静态文件
	app.get("*", function(req, res, next) {
		next();
	});

	// 所有路由
	require('./system/user')(app);

};