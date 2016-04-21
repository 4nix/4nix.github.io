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
		                currentWind = weatherInfo.p1.split("-");
		            }
		        });
		    });
		},

		reset: function() {
			ctx.clearRect(0, 0, screenWidth, screenHeight);
			window.cancelAnimationFrame(ani);
		},

		clear: function() {
			canvas.fadeOut(500);
			window.cancelAnimationFrame(ani);

			canvas.remove();
		},

		show: function() {console.log('a00');
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

		

	}
	
});