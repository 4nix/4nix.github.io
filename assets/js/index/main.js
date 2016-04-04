require.config({
	paths: {
		"jquery": "../jquery.min",
		"eyes": "eyes",
		"consoleLocal": "consoleLocal"
	}
});


require(["eyes", "jquery"], function(eyes, jquery) {
 	var canvasObj = eyes.draw("你是一条咸鱼...你是一条咸鱼...")
	$("#nav_eye").mouseover(function() {
  		canvasObj.fadeIn("slow");
	  	$("header, nav").animate({
	  		"opacity":0
	  	}, 1000);
  	});

	$("#nav_eye").mouseout(function() {
		canvasObj.fadeOut(500);
		$("header, nav").animate({
			"opacity":1
		}, 500);
	});
});


require(["consoleLocal"], function(consoleLocal) {
	consoleLocal.draw("咸鱼...咸鱼...")
});