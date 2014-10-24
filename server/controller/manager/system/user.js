exports.login = function(req, res) {
	var userName = req.body.userName;
	var password = req.body.password;

	if (userName == 'demo' && password == 'demo') {
		res.send({
			state: 1
		});

		//保存session
		req.session.user = {
			"username": userName
		};

	} else if (userName == 'demo' && password == 'demo3') {
		res.send({
			status: 3,
			msg: "修改默认密码"
		});
	} else if (userName == 'demo' && password == 'demo4') {
		res.send({
			status: 4,
			msg: "用户密码已过期"
		});
	} else {
		res.send({
			status: 2,
			msg: "用户名或密码错误"
		});
	}
};

exports.checkLogin = function(req, res) {
	if (req.session.user) {
		res.send({
			status: 1,
			msg: "已登录"
		});
	} else {
		res.send({
			status: 0,
			msg: "未登录"
		});
	}
};

exports.logout = function(req, res) {
	delete req.session.user;
	res.send({
		status: 1,
		msg: "已登出"
	});
};