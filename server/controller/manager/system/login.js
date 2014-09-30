exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username == 'demo' && password == 'demo1') {
		res.send({
			status: 1,
			msg: "登录成功",
			user: {
				name: username,
				password: password
			},
			system: [{
				id: 1,
				name: '运营系统'
			}, {
				id: 2,
				name: '财务系统'
			},
			//  {
			// 	id: 3,
			// 	name: '营销系统'
			// }, {
			// 	id: 4,
			// 	name: '手游系统'
			// },
			{
				id: 5,
				name: '大数据系统'
			}]
		});

		//保存session
		req.session.user = {
            "username":username
        };

	} else if (username == 'demo' && password == 'demo2') {
		res.send({
			status: 2,
			msg: "用户名或密码错误"
		});
	} else if (username == 'demo' && password == 'demo3') {
		res.send({
			status: 3,
			msg: "修改默认密码"
		});
	} else if (username == 'demo' && password == 'demo4') {
		res.send({
			status: 4,
			msg: "用户密码已过期"
		});
	}
};

exports.metro = function(req, res) {
	var systemId = req.query.systemId;
	if (systemId == 1) {
		res.send({
			status: 200,
			data: [{
					id: 12,
					name: '指标分析',
					list: [{
						id: 121,
						name: '五力模型'
					}, {
						id: 122,
						name: '指标趋势看盘'
					}, {
						id: 123,
						name: '板块看盘'
					}, {
						id: 123,
						name: '新用户留存率'
					}, {
						id: 124,
						name: '新用户漏斗模型'
					}]
				}

			]
		});
	}
};