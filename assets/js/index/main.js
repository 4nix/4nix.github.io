require.config({
	paths: {
		"jquery": "../jquery.min",
		"eyes": "eyes",
		"consoleLocal": "consoleLocal"
	},
	urlArgs: "v=" + (new Date()).getTime()
});


require(["eyes", "jquery"], function(eyes, jquery) {
 	eyes.init("...你是一条咸鱼...");
 	
	$("#nav_eye").mouseover(function() {
		eyes.show();
	  	$("header, nav").animate({
	  		"opacity":0
	  	}, 1000);
  	});

	$("#nav_eye").mouseout(function() {
		eyes.clear();
		$("header, nav").animate({
			"opacity":1
		}, 500);
	});
});

require(["weather", "jquery"], function(weather, jquery) {
 	weather.init();
 	
	$("#nav_blog").mouseover(function() {
		weather.show();
	  	$("header, nav").animate({
	  		"opacity":0
	  	}, 1000);
  	});

	$("#nav_blog").mouseout(function() {
		weather.clear();
		$("header, nav").animate({
			"opacity":1
		}, 500);
	});
});


require(["consoleLocal"], function(consoleLocal) {
	consoleLocal.draw("咸鱼...咸鱼...")
});