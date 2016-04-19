require.config({
	paths: {
		"jquery": "../jquery.min",
		"eyes": "eyes",
		"consoleLocal": "consoleLocal"
	},
	urlArgs: "v=" + (new Date()).getTime()
});


require(["eyes", "jquery"], function(eyes, jquery) {
 	var canvasObj;

	$("#nav_eye").mouseover(function() {
		canvasObj = eyes.draw("...你是一条咸鱼...");
		eyes.reset();
  		canvasObj.fadeIn("slow");
	  	$("header, nav").animate({
	  		"opacity":0
	  	}, 1000, function() {
	  		eyes.open();
	  	});
  	});

	$("#nav_eye").mouseout(function() {
		canvasObj.fadeOut(500);
		eyes.clear();
		canvasObj.remove();
		$("header, nav").animate({
			"opacity":1
		}, 500);
	});
});


require(["consoleLocal"], function(consoleLocal) {
	consoleLocal.draw("咸鱼...咸鱼...")
});