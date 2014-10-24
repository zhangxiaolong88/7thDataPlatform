exports.getGames = function(req, res) {
	var pageCount = req.query.pageCount;
	var currentPage = req.query.currentPage;

	var data = [{
		id: 1,
		name: "神曲",
		desc: "神曲描述"
	}, {
		id: 2,
		name: "弹弹堂",
		desc: "弹弹堂描述"
	}, {
		id: 3,
		name: "疯狂弹弹堂",
		desc: "疯狂弹弹堂描述"
	}, {
		id: 5,
		name: "剑影",
		desc: "剑影描述"
	}, {
		id: 6,
		name: "新海神",
		desc: "新海神描述"
	}, {
		id: 9,
		name: "神创天下",
		desc: "神创天下描述"
	}, {
		id: 10,
		name: "移动神曲",
		desc: "星际争霸描述"
	}, {
		id: 12,
		name: "新弹弹堂",
		desc: "新弹弹堂描述"
	}, {
		id: 17,
		name: "天龙八部",
		desc: "天龙八部描述"
	}, {
		id: 18,
		name: "神之皇冠",
		desc: "魔兽世界描述"
	}, {
		id: 101,
		name: "女仆联盟",
		desc: "女仆联盟描述"
	}, {
		id: 102,
		name: "群侠",
		desc: "英雄联盟描述"
	}];

	var start = (currentPage - 1) * pageCount + 1;
	var end = currentPage * pageCount;

	console.log(start + "," + end);
	var games = [];

	for (var i = 1; i <= data.length; i++) {
		if (i >= start && i <= end) {
			games.push(data[i-1]);
		}
	}

	res.send({
		state: 1,
		data: {
			totalCount: 12,
			games: games
		}
	});

};

exports.addGame = function(req, res) {

};

exports.updateGame = function(req, res) {

};

exports.deleteGames = function(req, res) {

};