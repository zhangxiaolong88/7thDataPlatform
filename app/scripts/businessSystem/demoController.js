'use strict';

define(['highcharts','funnel','highchartsMore','map'],function(highcharts,funnel){
	var controllersObj = {};
	controllersObj.demoController = ['$scope','GlobalConfig',function($scope,GlobalConfig){

		//搜索区域
		$scope.kpiData = [
			{
				key:'1',
				name:"注册用户数"
			},{
				key:'2',
				name:"登录用户数"
			},{
				key:'3',
				name:"活跃用户数"
			},{
				key:'4',
				name:"在线峰值"
			},{
				key:'5',
				name:"付费用户数"
			},{
				key:'6',
				name:"付费金额"
			}
		];
		//搜索区域
		$scope.current = {
			type:1
		};
		$scope.typeData = [
			{
				key:'1',
				name:"日看盘"
			},{
				key:'2',
				name:"周看盘"
			},{
				key:'3',
				name:"月看盘"
			}
		];

		//设置默认配置
		Highcharts.setOptions({ 
			colors: GlobalConfig.highcharts.colors,
			chart:{
				backgroundColor: "none"
			},
			title: {
				style: {
					color: GlobalConfig.highcharts.fontColor,
					fontFamily: GlobalConfig.highcharts.fontFamily
				}
			},
			xAxis: {
				gridLineColor:GlobalConfig.highcharts.lineColor,
				lineColor: GlobalConfig.highcharts.lineColor,
				tickColor:GlobalConfig.highcharts.lineColor,
				labels:{
	                style: {
	                    color: GlobalConfig.highcharts.fontColor,
	                    fontFamily: GlobalConfig.highcharts.fontFamily
	                }
	            }
			},
			yAxis: {
				title: {
					style: {
						color: GlobalConfig.highcharts.fontColor,
						fontFamily: GlobalConfig.highcharts.fontFamily
					}
				},
				gridLineColor:GlobalConfig.highcharts.lineColor,
				lineColor: GlobalConfig.highcharts.lineColor,
				labels:{
	                style: {
	                    color: GlobalConfig.highcharts.fontColor
	                }
	            }
			},
			legend: {
				itemStyle: {
					color: GlobalConfig.highcharts.fontColor,
					fontFamily: GlobalConfig.highcharts.fontFamily,
					fontWeight: 'normal',
				}
			},
			tooltip: {
				style: {
					fontFamily: GlobalConfig.highcharts.fontFamily,
				}
			}
		});

		//demo spline
		var splineData = {
			title: null,
			yAxisTitle: "金额($)",
			unit: "$",
			xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			series: [{
				name: '弹弹堂',
				data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
				name: '神曲',
				data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			}, {
				name: '海神',
				data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			}, {
				name: '龙之皇冠',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}]
		};
		$scope.splinechart = {
			chart: {
				type: 'spline',
				backgroundColor: "none"
			},
			title: {
				text: splineData.title || '',
				x: -20 //center
			},
			xAxis: {
				categories: splineData.xAxis,
				gridLineWidth: 1,
				gridLineDashStyle: "Solid",
				
			},
			yAxis: {
				title: {
					text: splineData.yAxisTitle || '',
					style: {
						fontSize: "14px"
					}
				},
				min: 0,
				gridLineDashStyle: "Solid",
				plotLines: [{
					value: 0,
					width: 1,
				}]
			},
			tooltip: {
				valueSuffix: splineData.unit || '',
				crosshairs: true,
				shared: true,
				style: {
					color: '#000000',
					fontSize: "12px"
				}
			},
			legend: {
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'bottom',
				itemStyle: {
					fontSize: "12px",
					fontWeight: 'normal',
				}
			},
			plotOptions: {
				spline: {
					lineWidth: 2,
					states: {
						hover: {
							lineWidth: 3
						}
					},
					marker: {
						enabled: false,
						radius: 1,
						lineColor: '#666666'
					}
				}
			},
			series: splineData.series || []
		};

		//demo 曲饼
		$scope.piechartData = {
			chart: {
				plotBackgroundColor: null,
				plotShadow: false,
				backgroundColor: "none",
			},
			title: {
				text: null,
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
				style: {
					color: '#000000',
					fontFamily: "微软雅黑",
					fontSize: "12px"
				}
			},
			legend: {
				enabled: true,
				align: 'bottom',
				symbolWidth: 8,
				itemWidth: 70
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				type: 'pie',
				name: 'Browser share',
				data: [
					['Firefox', 45.0],
					['IE', 26.8], {
						name: 'Chrome',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['Safari', 8.5],
					['Opera', 6.2],
					['Others', 0.7]
				]
			}]
		};

		//demo 动态曲线
		$scope.dynamicchart = {
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE
				// marginRight:40,
				margin: [20, 20, 40, 60],
				backgroundColor: "none",
				events: {
					load: function() {

						// set up the updating of the chart each second
						var series = this.series[0];
						setInterval(function() {
							var x = (new Date()).getTime(), // current time
								y = Math.random() * 10000;
							series.addPoint([x, y], true, true);
						}, 5000);
					}
				}
			},
			title: {
				text: '',
				style: {
					color: '#000000',
					fontFamily: "微软雅黑",
					fontSize: "16px"
				}
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 100
			},
			yAxis: {
				title: {
					text: ''
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				min: 0
			},
			tooltip: {
				formatter: function() {
					return '<b>' + this.series.name + '</b><br/>' +
						Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
						Highcharts.numberFormat(this.y, 0) + '人';
				},
				style: {
					color: '#000000',
					fontFamily: "微软雅黑",
					fontSize: "12px"
				}

			},
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: '在线人数',
				data: (function() {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;

					for (i = -19; i <= 0; i += 1) {
						data.push({
							x: time + i * 5000,
							y: Math.random() * 10000
						});
					}
					return data;
				}())
			}]
		};

		//demo 蜘蛛网
		$scope.spiderweb = {
			chart: {
				polar: true,
				type: 'line',
				backgroundColor: "none"
			},

			title: {
				text: null,
			},

			pane: {
				size: '60%'
			},

			xAxis: {
				categories: ['Sales', 'Markg', 'Devent', 'Customer',
					'Informat', 'Admin'
				],
				tickmarkPlacement: 'on',
				lineWidth: 0
			},

			yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				min: 0
			},

			tooltip: {
				shared: true,
				pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
			},

			legend: {
				// align: 'right',
				verticalAlign: 'bottom',
				// y: 10,
				layout: 'horizontal'
			},

			series: [{
				name: 'Budget',
				data: [43000, 19000, 60000, 35000, 17000, 10000],
				pointPlacement: 'on'
			}, {
				name: 'pending',
				data: [50000, 39000, 42000, 31000, 26000, 14000],
				pointPlacement: 'on'
			}]
		};

		//demo 漏斗模型
		$scope.funnelData = {
			chart: {
				type: 'funnel',
				marginRight: 150,
				backgroundColor: "none"
			},
			title: {
				text: null,
				x: -50
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b> ({point.y:,.0f})',
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						softConnector: true
					},
					neckWidth: '30%',
					neckHeight: '25%'
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: 'Unique users',
				data: [
					['注册人数', 15654],
					['登录人数', 4064],
					['活跃人数', 1987],
					['付费人数', 976]
				]
			}]
		};

		//demo 世界地图
		function initMap(key) {
			var mapGeoJSON = Highcharts.maps[key],
				mapData = [{
					key: "cn",
					value: "934"
				}, {
					key: "n_us",
					value: "323"
				}, {
					key: "br",
					value: "435"
				}, {
					key: "ru",
					value: "234"
				}, {
					key: "es",
					value: "534"
				}, {
					key: "hk_tw",
					value: "677"
				}, {
					key: "de",
					value: "845"
				}, {
					key: "fr",
					value: "457"
				}, {
					key: "pl",
					value: "644"
				}, {
					key: "it",
					value: "657"
				}, {
					key: "my",
					value: "888"
				}, {
					key: "kr",
					value: "456"
				}, {
					key: "th",
					value: "526"
				}, {
					key: "pt",
					value: "157"
				}, {
					key: "se",
					value: "674"
				}];
			$scope.chart_mapData = {
				title: {
					text: null
				},
				mapNavigation: {
					enabled: false
				},

				colorAxis: {
					min: 0,
					max: 1000,
					stops: [
						[0, '#EFEFFF'],
						// [0.5, Highcharts.getOptions().colors[0]],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
					]
				},

				legend: {
					enabled: true,
					verticalAlign: 'top',
					layout: 'vertical',
					align: 'left',
					title: {
						text: "充值金额趋势"
					}
				},
				tooltip: {
					enabled: true
				},

				series: [{
					data: mapData,
					mapData: mapGeoJSON,
					joinBy: ['hc-key', 'key'],
					name: '充值金额',
					states: {
						hover: {
							color: Highcharts.getOptions().colors[2]
						}
					},
					dataLabels: {
						enabled: true,
						formatter: function() {
							// return this.point.options.value && this.point.name?this.point.name+":"+this.point.options.value:null;
							return this.point.options.value && this.point.name ? this.point.key : null;
						}
					},
					point: {
						events: {
							// On click, look for a detailed map
							click: function() {
								if (this.key === "cn") {
									initMap('countries/' + this.key.substr(0, 2) + '/' + this.key + '-all');
								}
							}
						}
					}
				}]
			};
		}

		initMap('custom/world');

		//双Y轴
		$scope.splineDoubleData = {
                    chart: {
                        type: 'spline',
                    },
                    title: {
                        text: ''
                    },
                    xAxis: [{
                        tickInterval: 1,
                        categories: [
                        '09-01',
                        '09-02',
                        '09-03',
                        '09-04',
                        '09-05',
                        '09-06',
                        '09-07',
                        '09-08'
                        ]
                    }],
                    yAxis: [{
                        title: {
                            text: '人数(人)',
                        },
                        labels: {
                            format: '{value} 人'
                        },
                        min:0
                    }, { // 第二个 yAxis
                        title: {
                            text: '金额(元)',
                        },
                        labels: {
                            format: '{value} 元'
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true,
                        crosshairs: true,
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 2,
                            states: {
                                hover: {
                                    lineWidth: 3
                                }
                            },
                            marker: {
                                enabled: false,
                                radius: 1,
                                lineColor: '#666666'
                            }
                        }
                    },
                    legend: {
                        layout: 'horizontal',
                        verticalAlign: 'top',
                        floating: false
                    },
                    series: [
                        {
                            name: '注册人数',
                            data: [1231,3435,45346,4435,6634,46677,5634,6345],
                            tooltip: {
                                valueSuffix: ' 人'
                            }
                        },
                        {
                            name: '登录人数',
                            data: [1531,1435,5346,2435,6834,16677,634,1345],
                            tooltip: {
                                valueSuffix: ' 人'
                            }
                        },
                        {
                            name: '活跃人数',
                            data: [531,435,346,435,834,6677,534,145],
                            tooltip: {
                                valueSuffix: ' 人'
                            }
                        },
                        {
                            name: '在线峰值',
                            data: [2531,2435,3346,7435,4834,8877,9534,1145],
                            tooltip: {
                                valueSuffix: ' 人'
                            }
                        },
                        {
                            name: '付费人数',
                            data: [231,435,346,435,434,877,534,145],
                            tooltip: {
                                valueSuffix: ' 人'
                            }
                        },
                        {
                            name: '付费金额',
                            data: [23231,44535,36676,48635,47734,86777,58634,19745],
                            yAxis: 1,
                            tooltip: {
                                valueSuffix: ' 元'
                            }
                        }]
                };
	}];

	return controllersObj;
});