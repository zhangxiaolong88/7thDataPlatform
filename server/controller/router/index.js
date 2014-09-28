/** 
 * 总路由
 */

module.exports = function(app){
	// 静态文件
	app.get("*.html", function(req, res, next){
		console.log(req.url);
		next();
	});

	// 所有路由
	require('./worldMap')(app);

};