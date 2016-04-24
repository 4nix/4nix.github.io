define(['jquery'], function(jquery) {
	var $this;

	var currentCity;	//当前城市
	var currentCondition;	//当前天气
	var currentConditionLetter;	//当前天气的拼音
	var currentDegree;	//气温
	var currentWind;	//风速

	var canvas;
	var ctx;
	var ani;
	var iSpot;

	var weatherPic;	//天气图片对应表

	return {
		init: function() {
			$this = this;

			weatherPic = {
				"qing": "sunny.jpg",
				"duoyun": "cloudy.jpg",
				"xiaoyu": "rain.jpg",
				"dayu": "rain.jpg",
				"default": "cloudy.jpg"
			};

			$this.getWeather();
			$this.preload();
		},

		getWeather: function() {
			var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';

		    $.getScript(cityUrl, function(script, textStatus, jqXHR) {
		        var citytq = remote_ip_info.city ;// 获取城市
		        var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
		        currentCity = remote_ip_info.city;

		        $.ajax({
		            url : url,
		            dataType : "script",
		            scriptCharset : "gbk",
		            success : function(data) {
		                var weatherInfo = window.SWther.w[citytq][0];
		                currentCondition = [weatherInfo.s1, weatherInfo.s2];
		                currentConditionLetter = [weatherInfo.f1, weatherInfo.f2];
		                currentDegree = [weatherInfo.t1, weatherInfo.t2];
		                currentWind = weatherInfo.p1;
		            }
		        });
		    });
		},

		reset: function() {
			ctx.clearRect(0, 0, screenWidth, screenHeight);
			window.cancelAnimationFrame(ani);
		},

		

		show: function() {
			$this.draw();
			$this.reset();

			$this.paint();

			canvas.fadeIn("slow", function() {
				// $this.paint();
			});
		},

		paint: function() {

			var pic = weatherPic.hasOwnProperty(currentConditionLetter[0]) ? weatherPic[currentConditionLetter[0]] : weatherPic.default;
			canvas.css("background-image","url(assets/images/" + pic + ")");

			//文f字
			var txt = currentCity + ", " + currentCondition[0] + " " + currentDegree[0] + " ~ " + currentDegree[1] + " ℃, " + "风速 " + currentWind + "级";
			ctx.fillStyle = "#fff";
			ctx.font = "40px 微软雅黑";

			var metrics = ctx.measureText(txt);
      		var width = metrics.width;

			ctx.fillText(txt, screenWidth - width - 40, 80);

			iSpot = 0;
			$this.sunshine();
		},

		preload: function() {
			for (var pic in weatherPic) {
				new Image().src = 'assets/images/' + weatherPic[pic];
			}
		},

		draw: function() {
			screenWidth = $(document).width();
			screenHeight = $(document).height();

			canvas = $("<canvas width='"+screenWidth+"' height='"+screenHeight+"'>");
			canvas.css({"position": "absolute", 
						"z-index": -1, 
						"top": 0, 
						"left": 0, 
						"display": "none"
					});
			ctx = canvas[0].getContext("2d");

			//改变窗口时处理
			window.onresize = function() {
	           ctx.width = screenWidth = $(document).width();
	           ctx.height = screenHeight = $(document).height();
	        }

			canvas.appendTo("body");

			return canvas;
		},


		//阳光
		sunshine: function() {
			ctx.save();

			ctx.clearRect(0, 0, screenWidth, screenHeight);
			ctx.translate(340, 130);
			ctx.rotate((iSpot)*Math.PI/180); 

			//最大光圈半径
			var maxRadian = 240;
			//光线位置, 值为角度
			var pathLine = [0, 60, 120, 180, 240, 300];
			//光圈在光线上的位置, 为最大屏幕的百分比
			var pathRadian = [0.1, 0.3, 0.4, 0.8];

			//线渐变
			var lineGradient = ctx.createLinearGradient(0, 0, screenWidth, screenHeight);
			lineGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
			lineGradient.addColorStop(0.05, "rgba(255, 255, 255, 0)");
			lineGradient.addColorStop(0.12, "rgba(255, 255, 255, 0.3)");
			lineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");

			for (var i in pathLine) {
				ctx.save();
				ctx.rotate(pathLine[i]*Math.PI/180);
				//光线
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(screenWidth, 0);
				ctx.rotate(10*Math.PI/180);
				ctx.lineTo(screenWidth, 0);
				ctx.fillStyle = lineGradient;
				ctx.fill();

				//光圈
				ctx.save();
				ctx.rotate(-5*Math.PI/180);
				var offsetRadian = (iSpot % 250)*0.004;
				pathRadian.forEach(function(j) {
					
					var _path = j + offsetRadian;
					_path = _path >= 1 ? _path - 1 : _path;

					if (_path <= 0.08) {
						return;
					}

					
					//圆渐变
					var radianGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadian*_path);
					radianGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
					radianGradient.addColorStop(0.99, "rgba(255, 255, 255, 0.3)");
					radianGradient.addColorStop(1, "rgba(255, 255, 255, 0.6)");

					ctx.save();
					ctx.translate(screenWidth*_path, 0);
					ctx.beginPath();
					ctx.arc(0, 0, maxRadian*_path, 0, 2*Math.PI);
					ctx.fillStyle = radianGradient;
					ctx.fill();
					ctx.restore();
				});
				ctx.restore();

				ctx.restore();	//还原光线
			}

			ctx.restore();

			iSpot += 0.5;
			ani = window.requestAnimationFrame($this.sunshine);
		},

		//雨
		rain: function() {

		},

		//雪
		snow: function() {

		},

		//多云
		cloud: function() {

		},

		//天气信息
		weatherInfo: function() {

		},

		clear: function() {
			canvas.fadeOut(500);
			window.cancelAnimationFrame(ani);

			canvas.remove();
		}

	}
	
});