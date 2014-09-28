/** 
 * 世界地图 - 服务
 * 获取数据、数据格式处理、业务逻辑处理
 */


exports.getMoney = function(req, res) {
	console.log(req.body.id);

	// 返回数据
	res.send([{
			id: 1,
			name: "USA",
			money: 152170,
			status: "TRUE"
		},{
			id: 2,
			name: "CN",
			money: 221853,
			status: "FALSE"
		},{
			id: 3,
			name: "JP",
			money: 76435,
			status: "FALSE"
		}]
	);
};

exports.getRegister = function(req, res){

	// 返回数据
	res.send([{
			id: 1,
			name: "USA",
			register: 644321,
			status: "TRUE"
		},{
			id: 2,
			name: "CN",
			register: 2135521,
			status: "FALSE"
		},{
			id: 3,
			name: "JP",
			register: 141211,
			status: "FALSE"
		}]
	);
};

exports.getActive = function(req, res){

	// 返回数据
	res.send([{
			id: 1,
			name: "USA",
			active: 644321,
			status: "TRUE"
		},{
			id: 2,
			name: "CN",
			active: 2135521,
			status: "FALSE"
		},{
			id: 3,
			name: "JP",
			active: 141211,
			status: "FALSE"
		}]
	);
};