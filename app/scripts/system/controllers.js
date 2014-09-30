'use strict';

/* Controllers */
define(['routers/routers'], function(routers) {
	var controllersObj = {};

	//左侧菜单控制器
	controllersObj.MenuController = ['$scope','$state','System',
		function($scope,$state,System) {
			//目录数据
			var currentSys = sessionStorage.getItem("currentSys");
			var ownSys = JSON.parse(sessionStorage.getItem("system"));
			$scope.navigation = routers[currentSys];

			//系统列表数据
			$scope.sysList = routers;
			var sysListLength = 0;

			for (var k in $scope.sysList) {
				if($scope.sysList[k].isSys){
					sysListLength += 1;
				}
			}

			$scope.sysMenuHeight = {
				height:(sysListLength-1)*40+20+"px",
			}

			//系统权限数组
			$scope.ownSysIdArr = [];
			for (var k in ownSys) {
				$scope.ownSysIdArr.push(ownSys[k].id);
			}


			//设置当前激活菜单
			$scope.$watch(function(){
				return $state.current.name;
			},function(newV,oldV){
				//修改顶级的对象
				$scope.valueObj.currentMenu = $scope.valueObj.currentMenu || {};
				$scope.valueObj.currentMenu.systemTitle = $scope.navigation.title;

				if(newV == oldV) return;
				changeActiveMenu();
			});

			$scope.gotoSys = function(sysIndex,route){
				if(sysIndex){
					sessionStorage.setItem("currentSys",sysIndex);
					$scope.navigation = routers[sysIndex];
					getRights($scope.navigation.key);
					$state.go(route);
				}
			};

			var changeActiveMenu = function(){
				var activeMenu;
				for(var menu  in $scope.navigation.list){
					if($scope.navigation.list[menu].list){
						for (var sub in $scope.navigation.list[menu].list) {
							if($scope.navigation.list[menu].list[sub].route == $state.current.name){
								$scope.navigation.list[menu].list[sub].active = true;
								activeMenu = menu;

								//修改顶级的对象
								$scope.valueObj.currentMenu = $scope.valueObj.currentMenu || {};
								$scope.valueObj.currentMenu.twoTitle = $scope.navigation.list[menu].list[sub].title;

							}else{
								$scope.navigation.list[menu].list[sub].active = false;
							}
						}
					}
					if(menu == activeMenu){
						$scope.navigation.list[menu].active = true;
						//修改顶级的对象
						$scope.valueObj.currentMenu = $scope.valueObj.currentMenu || {};
						$scope.valueObj.currentMenu.oneTitle = $scope.navigation.list[menu].title;
					}else{
						$scope.navigation.list[menu].active = false;
					}
				}
			}
			changeActiveMenu();

			//获取当前系统菜单权限
			var getRights = function(sysId){
				System.getSystemRights(sysId).success(function(result){

				});
			};

			getRights($scope.navigation.key);
		}
	];

	//登录控制器
	controllersObj.LoginController = ['$scope', '$state','$cookieStore','loginService','$timeout',
		function($scope,$state, $cookieStore, loginService,$timeout) {
			$scope.formObj = {};
			$scope.login = JSON.parse(sessionStorage.getItem("userLogin")) || {};

			//清楚cookie
			$cookieStore.remove('user');

			//处理firefox的自动填充
			$scope.$watch(function(){
				return $scope.login.username;
			},function(newV,oldV){
				if(newV && !$scope.login.password){
					$timeout(function(){
						jQuery("#password").val("");
					},10);
				}
			});

			//按tab键时自动填充
			$scope.checkValue = function(e){
				if(e.keyCode == 9 && !$scope.login.password){
					$timeout(function(){
						jQuery("#password").val("");
					},10);
				}
			}

			$scope.loginSubmit = function() {
				$scope.login.resultFail = false;
				if ($scope.formObj.login.$valid) {
					loginService.login($scope.login)
						.success(function(result) {
							if (result.status == 1) {

								sessionStorage.setItem("system", JSON.stringify(result.system));
								sessionStorage.setItem("user", JSON.stringify(result.user));
								$cookieStore.put('user',$scope.login.username);

								if ($scope.login.rememberme) {
									sessionStorage.setItem("userLogin",JSON.stringify($scope.login));
								} else{
									sessionStorage.removeItem("userLogin");
								}

								$state.go("system.metro");
							} else {
								$scope.login.resultFail = true;
							}
						}).error(function(err) {
							console.log(err);
						});
				} else {
					$scope.formObj.login.submitted = true;
				}
			}
		}
	];

	//win8界面控制器
	controllersObj.metroController = ['$scope','$state',
		function($scope,$state) {
			$scope.sysList = routers;

			//从sessionStore中读取系统数组
			$scope.ownSysIdArr = [];
			$scope.ownSys = JSON.parse(sessionStorage.getItem("system"));
			for (var k in $scope.ownSys) {
				$scope.ownSysIdArr.push($scope.ownSys[k].id);
			}
			$scope.gotoSys = function(sysIndex,route){
				if(sysIndex){
					sessionStorage.setItem("currentSys",sysIndex);
					$state.go(route);
				}
			};
		}
	];

	//右侧顶部搜索区控制器（游戏 地区 系统 渠道）
	controllersObj.SearchController = ['$scope','$state','$timeout','$cookieStore','$window',
		function($scope,$state,$timeout,$cookieStore,$window) {
						//游戏-地区-代理商-区服筛选
			$scope.currentSelect = {
				game:null,//当前游戏
				region:null,//当前选中地区
				agent:null//当前选中代理商
			};

			//手机系统筛选数组			
			$scope.mobSystemData = {
				key1:{
					key:1,
					name:"IOS正版",
				},
				key2:{
					key:2,
					name:"IOS越狱版",
				},
				key3:{
					key:3,
					name:"Android版",
				}
			};
			$scope.mobSystemData.checkedNum = 0;
			
			//手机渠道筛选数组			
			$scope.gamesData = [
				{
					key:1,
					name:"弹弹堂",
					pic:"ddt.jpg"
				},
				{
					key:2,
					name:"神曲",
					pic:"sq.jpg"
				},
				{
					key:11,
					name:"疯狂弹弹堂",
					pic:"fkddt.jpg"
				},
				{
					key:3,
					name:"新海神",
					pic:"xhs.jpg"
				},
				{
					key:4,
					name:"神之皇冠"
				},
				{
					key:5,
					name:"大侠请留步",
				},
				{
					key:6,
					name:"女仆联盟",
				},
				{
					key:7,
					name:"剑影",
				},
				{
					key:8,
					name:"神创天下",
				}
			];

			//手机渠道筛选数组
			$scope.mobChannelData = {
				key1:{
					key:1,
					name:"360助手",
				},
				key2:{
					key:2,
					name:"爱贝-安卓",
				},
				key3:{
					key:3,
					name:"UC",
				},
				key4:{
					key:4,
					name:"VIVO",
				},
				key5:{
					key:5,
					name:"小米",
				},
				key6:{
					key:6,
					name:"itools",
				},
				key7:{
					key:7,
					name:"oppo",
				},
				key8:{
					key:8,
					name:"安智",
				},
				key9:{
					key:9,
					name:"多酷",
				},
				key10:{
					key:10,
					name:"华为",
				},
				key11:{
					key:11,
					name:"快用",
				},
				key12:{
					key:12,
					name:"联想",
				},
				key13:{
					key:13,
					name:"同步推",
				},
				key14:{
					key:14,
					name:"豌豆荚",
				},
				key15:{
					key:15,
					name:"爱贝-IOS",
				},
				key16:{
					key:16,
					name:"酷派",
				},
				key17:{
					key:17,
					name:"乐讯",
				},
				key18:{
					key:18,
					name:"3G门户",
				},
				key19:{
					key:19,
					name:"91助手-安卓",
				},
				key20:{
					key:20,
					name:"91助手-IOS",
				},
				key21:{
					key:21,
					name:"PP助手",
				}
			};
			$scope.mobChannelData.checkedNum = 0;
			
			//地区-代理商数据
			$scope.regionData = {
				key1:{
					name:"中国地区",
					key:1,
					childrens:{
						key11:{
							name:"畅游汇总",
							key:11,
							childrens:[
								{
									name:"1-2区",
									key:111
								},
								{
									name:"3-4区",
									key:112
								},
								{
									name:"5-20区",
									key:113
								},
								{
									name:"5-20区",
									key:114
								},
								{
									name:"5-20区",
									key:115
								},
								{
									name:"5-20区",
									key:116
								},
								{
									name:"5-20区",
									key:117
								},
								{
									name:"5-20区",
									key:118
								},
								{
									name:"5-20区",
									key:119
								},
								{
									name:"5-20区",
									key:1110
								},
								{
									name:"5-20区",
									key:1111
								},
								{
									name:"5-20区",
									key:1112
								},
								{
									name:"5-20区",
									key:1113
								},
								{
									name:"5-20区",
									key:1114
								},
								{
									name:"5-20区",
									key:1115
								},
								{
									name:"5-20区",
									key:1116
								},
								{
									name:"5-20区",
									key:1117
								},
								{
									name:"5-20区",
									key:1118
								},
								{
									name:"5-20区",
									key:1119
								}
							]
						},
						key12:{
							name:"百度汇总",
							key:12,
							childrens:[
								{
									name:"1-21区",
									key:121
								},
								{
									name:"22-41区",
									key:122
								},
								{
									name:"42-201区",
									key:123
								}
							]
						},
						key13:{
							name:"奇虎汇总",
							key:13,
							childrens:[
								{
									name:"1主区",
									key:131
								},
								{
									name:"2-41区",
									key:132
								},
								{
									name:"42-201区",
									key:133
								},
								{
									name:"201-202区",
									key:134
								},
								{
									name:"202-300区",
									key:135
								},
								{
									name:"301-401区",
									key:136
								},
								{
									name:"402-501区",
									key:137
								}
							]
						},key14:{
							name:"快播汇总",
							key:14,
							childrens:[
								{
									name:"1-21区",
									key:141
								},
								{
									name:"31-41区",
									key:142
								},
								{
									name:"51-100区",
									key:143
								},
								{
									name:"101-201区",
									key:143
								},
								{
									name:"200区",
									key:143
								}
							]
						},key15:{
							name:"37玩汇总",
							key:15,
							childrens:[
								{
									name:"11-21区",
									key:151
								},
								{
									name:"31-41区",
									key:152
								},
								{
									name:"51-201区",
									key:153
								},
								{
									name:"51-201区",
									key:154
								},
								{
									name:"51-201区",
									key:155
								},
								{
									name:"51-201区",
									key:156
								},
								{
									name:"51-201区",
									key:157
								}
							]
						},key16:{
							name:"多玩汇总",
							key:16,
							childrens:[
								{
									name:"11-21区",
									key:161
								},
								{
									name:"31-41区",
									key:162
								},
								{
									name:"51-201区",
									key:163
								},
								{
									name:"131-141区",
									key:164
								},
								{
									name:"251-301区",
									key:165
								},
								{
									name:"231-241区",
									key:166
								},
								{
									name:"51-201区",
									key:167
								}
							]
						},key17:{
							name:"百度汇总",
							key:17,
							childrens:[
								{
									name:"11-21区",
									key:121
								},
								{
									name:"31-41区",
									key:122
								},
								{
									name:"51-201区",
									key:123
								}
							]
						},key18:{
							name:"PPS 汇总",
							key:18,
							childrens:[
								{
									name:"11-21区",
									key:181
								},
								{
									name:"31-41区",
									key:182
								},
								{
									name:"51-201区",
									key:183
								}
							]
						},key19:{
							name:"4399 汇总",
							key:19,
							childrens:[
								{
									name:"11-21区",
									key:191
								},
								{
									name:"31-41区",
									key:192
								},
								{
									name:"51-201区",
									key:193
								}
							]
						},key20:{
							name:"快玩汇总",
							key:20,
							childrens:[
								{
									name:"11-21区",
									key:1201
								},
								{
									name:"31-41区",
									key:1202
								},
								{
									name:"51-201区",
									key:1203
								}
							]
						},key21:{
							name:"天空汇总",
							key:21,
							childrens:[
								{
									name:"11-21区",
									key:121
								},
								{
									name:"31-41区",
									key:122
								},
								{
									name:"51-201区",
									key:123
								}
							]
						},key22:{
							name:"百度汇总",
							key:22,
							childrens:[
								{
									name:"11-21区",
									key:121
								},
								{
									name:"31-41区",
									key:122
								},
								{
									name:"51-201区",
									key:123
								}
							]
						},key23:{
							name:"百度汇总",
							key:23,
							childrens:[
								{
									name:"11-21区",
									key:121
								},
								{
									name:"31-41区",
									key:122
								},
								{
									name:"51-201区",
									key:123
								}
							]
						}
					}
				},
				key2:{
					name:"海外地区",
					key:2,
					childrens:{
						key21:{
							name:"Facebook汇总",
							key:21,
							childrens:[
								{
									name:"11-21区",
									key:211
								},
								{
									name:"31-41区",
									key:212
								},
								{
									name:"51-201区",
									key:213
								}
							]
						}
					}
				}
			};

			//获取游戏列表宽度
			var gamePd = 40;
			$scope.gameIndex = 0;//当前游戏选中索引
			$scope.gameListWidth = 99 * $scope.gamesData.length - 10 + gamePd;//最右边的10 margin  padding 30
			$scope.showGameList = false;

			//计算游戏列表宽度
			var calculateWidth = function(){
				$scope.gameMaxWidth = jQuery(".gameWrap").width() - jQuery(".middle-nav").width() - 10 - 10 - 6; //10px箭头宽度 6px的border
				if ($scope.gameListWidth > $scope.gameMaxWidth) {
					$scope.gameTempWidth = Math.floor(($scope.gameMaxWidth - gamePd + 10) / 99) * 99 + gamePd;
					$scope.gameListStyle.width = $scope.gameTempWidth +"px";
				}else{
					$scope.gameListStyle.width = $scope.gameListWidth +"px";
				}

				if (parseInt($scope.gameListStyle.width) < 99) {
					$timeout(function(){
						calculateWidth();
					},300);
				}
			}
			
			//修改游戏滑动是的right值
			var modifyGameRight = function(){
				var isMobile = !!(jQuery(window).width() < 768);
				if (isMobile) {
					if ($scope.showGameList) {
						$scope.gameListStyle.opacity = 1;
						$scope.gameListStyle.display = "block";
						
						$scope.showContainer.region = false;
						$scope.showContainer.mobSystem = false;
						$scope.showContainer.mobChannel = false;

					}else{
						$scope.gameListStyle.display = "none";
					}
				} else {
					if ($scope.showGameList) {
						$scope.gameListStyle.right = '419px';
						$scope.gameListStyle.opacity = 1;
					}else{
						$scope.gameListStyle.right = $scope.gameListWidth > $scope.gameMaxWidth ? - $scope.gameTempWidth + 410 +'px' : - $scope.gameListWidth + 410 +'px';
					}
				}
			}

			//重新计算游戏选择框的宽度
			jQuery(window).on('resize',function(){
				if(!$scope.$$phase) {
				  	$scope.$apply(function(){
				  		$timeout(function(){
							calculateWidth();							
						},300);
					});
				}
			});
			
			//监听菜单是否隐藏变化
			$scope.$on("showSidebar",function(e,showSidebar){
				$timeout(function(){
					calculateWidth();
					modifyGameRight();
				},30);
			});

			$scope.$watch(function(){
					return $scope.showGameList;
				},
				function(newV,oldV){
					$timeout(function(){
						modifyGameRight();
					},30);					
				});

			var gameMobileFn  = function(){
				$scope.gameListStyle = {
					width:"100%",
					position:'relation',
					'z-index':1,
					top:'8px'
//					transition: 'all 0.2s ease-in-out'
				};
			}
			
			var gameDesktopFn = function(){
				$scope.gameListStyle = {
					width:$scope.gameListWidth + "px",
					position:'absolute',
					top:'10px',
					height:'80px',
					right:'-'+ ($scope.gameListWidth - 410)+'px',
					'z-index':1,
					transition: 'all 0.35s ease-in-out'
				};
				
				calculateWidth();

			}
			
			//桌面和移动端执行不同的动画函数
			var isMobile = !!(jQuery(window).width() < 768) ;
			isMobile ? gameMobileFn() : gameDesktopFn();

			//获取当前代理商列表高度
			$scope.listLineHeight = 41;
			$scope.agentListHeight = $scope.listLineHeight;
			$scope.agentListStyle = {height:'0px'};
			$scope.showAgentList = false;
			$scope.$watch(function(){
					return $scope.currentSelect.region;
				},
				function(newV,oldV){
					if(newV == oldV){return;}
					$timeout(function(){
						$scope.agentListHeight = jQuery("#agentsList").height();
						$scope.currentSelect.agent = null;
						$scope.show(1,false);
					},300);
				});

			//获取当前区服列表高度
			$scope.regionListHeight = $scope.listLineHeight;
			$scope.showRegionList = false;
			$scope.regionListStyle = {height:'0px'};
			$scope.$watch(function(){
					return $scope.currentSelect.agent;
				},
				function(newV,oldV){
					if(newV == oldV){return;}
					$timeout(function(){
						$scope.regionListHeight = jQuery("#smasllRegionsList").height();
						$scope.show(2,false);
					},300);
				});

			//获取渠道高度
			$scope.channelListHeight = 0;
			$scope.showChannelList = true;
			$scope.channelListStyle = {height:$scope.listLineHeight+'px'};
			$scope.$watch(function(){
					return $scope.mobChannelData;
				},
				function(newV,oldV){
//					if (newV,oldV) {return};	

					var fn = function(){
						$timeout(function(){
							$scope.channelListHeight = jQuery("#channelHeight").height();
							if($scope.channelListHeight > $scope.listLineHeight){
								$scope.showChannelList = true;
							}
							$scope.show(3,false);
							if ($scope.channelListHeight==0) {
								fn();
							};
						},300);
					}

					fn();//偶尔获取不到高度
				});

			//展示全部代理商或者区服动画函数
			$scope.show = function(type,isShow){
				if(type == 1){ //代理商列表
					if (!$scope.currentSelect.region) {
						$scope.agentListStyle = {height:"0px"};
						$scope.regionListStyle = {height:"0px"};
						return;
					}
					if($scope.currentSelect.region && !$scope.currentSelect.agent){
						$scope.regionListStyle = {height:"0px"};
					}

					$scope.showAgentList = typeof isShow != 'undefined' ? isShow : !$scope.showAgentList;
					if($scope.showAgentList){
						$scope.agentListStyle = {height:$scope.agentListHeight + 15 +"px"};
					}else{
						$scope.agentListStyle = {height:$scope.listLineHeight+'px'};
					}

					if($scope.regionListStyle.height == '0px' && $scope.currentSelect.agent){
						$scope.show(2,false);
					}
				}else if(type == 2){ //区服列表
					if (!$scope.currentSelect.agent) {
						$scope.regionListStyle = {height:"0px"};
						return;
					}
					$scope.showRegionList =  typeof isShow != 'undefined' ? isShow : !$scope.showRegionList;
					if($scope.showRegionList){
						$scope.regionListStyle = {height:$scope.regionListHeight + 15 +"px"};
					}else{
						$scope.regionListStyle = {height:$scope.listLineHeight+'px'};
					}
				}else if(type == 3){ //渠道列表
					$scope.showChannelList =  typeof isShow != 'undefined' ? isShow : !$scope.showChannelList;
					if($scope.showChannelList){
						$scope.channelListStyle = {height:$scope.channelListHeight + 15 +"px"};
					}else{
						$scope.channelListStyle = {height:$scope.listLineHeight+'px'};
					}
				}
			}

			//展示子级选择框
			$scope.showChildren = function(currentObj,currentSelect,name){
				//记录当前选择对象
				currentSelect = currentSelect || {};
				currentSelect[name] = 'key' + currentObj.key;
			}

			//内容选择框
			$scope.changeCheckbox = function(currentObj,parentDataObj,currentSelect,name,checkSelfNum){

				//当前是部分选择
				if(currentObj.isCheckedPart){
					currentObj.isCheckedPart = false;
					currentObj.isChecked = false;
				}else{
					currentObj.isChecked = !currentObj.isChecked;
					if(checkSelfNum){
						parentDataObj.checkedNum = parentDataObj.checkedNum || 0;
						parentDataObj.checkedNum = currentObj.isChecked ? parentDataObj.checkedNum + 1 : parentDataObj.checkedNum - 1;
					}
				}

				//记录当前选择对象
				if (currentSelect && name) {
					currentSelect = currentSelect || {};
					currentSelect[name] = 'key' + currentObj.key;
				}

				//修改父级全选/部分选择状态
				if(parentDataObj){
					var tempData = typeof parentDataObj.childrens != 'undefined' ? parentDataObj.childrens : parentDataObj;
					var hasChecked = false;
					var hasUnChecked = false;
					for (var k in tempData) {
						if(hasUnChecked && hasChecked){
							break;
						}

						if(!tempData[k].isChecked && tempData[k].name){
							hasUnChecked = true;
						}else if(tempData[k].isChecked && tempData[k].name){
							hasChecked = true;
						}
					}
					parentDataObj.isChecked = hasChecked && !hasUnChecked;
					parentDataObj.isCheckedPart = hasChecked && hasUnChecked;
				}
				
				//修改儿子状态
				for (var k in currentObj.childrens) {
					currentObj.childrens[k].isChecked = currentObj.isChecked;
				}			
			}

			//内容选择框(无父级对象，且需对本身处理) 主要用于全选
			$scope.changeCheckboxNoP = function(currentObj){

				currentObj.isChecked = !currentObj.isChecked;
								
				//修改状态
				var total = 0;
				for (var k in currentObj) {
					if(currentObj.hasOwnProperty(k) && currentObj[k].name){
						currentObj[k].isChecked = currentObj.isChecked;
						total += 1;
					}
				}
				//当前选择数量
				currentObj.checkedNum = currentObj.isChecked ? total: 0;
			}

			//切换选择框容器(地区 系统 渠道)
			$scope.showContainer = {
				region:false,
				mobSystem:false,
				mobChannel:false
			};
			$scope.switchContainer = function(index,name){
				if (index != 1) {
					$scope.showContainer.region = false;
				}

				if (index != 2) {
					$scope.showContainer.mobSystem = false;
				}

				if (index != 3) {
					$scope.showContainer.mobChannel = false;
				}
				$scope.showContainer[name] = !$scope.showContainer[name];
				if(!!(jQuery(window).width() < 768) && $scope.showContainer[name]){
					$scope.gameListStyle.display = "none";
					$scope.showGameList = false;
				}
			}
		}
	];

	return controllersObj;
});