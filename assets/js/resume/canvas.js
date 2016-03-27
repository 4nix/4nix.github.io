define(['jquery'], function(jquery) {

	var canvas;

	return {
		hello: function() {
			console.log(jQuery("#content"));
		},

		draw: function(id, params) {
			var count = Object.keys(params).length;
			console.log(id);
			this.init(id);
			this.drawPolygon(count);
		},

		init: function(id) {
			var canvas = document.getElementById(id); 
			ctx = canvas.getContext("2d");
		},

		drawPolygon: function(num) {
			// var angle = (num - 2) * 180/num;
			var num = 5;
			var angle = 360/num;
			var randian = (2 * Math.PI / 360) * angle;

			ctx.beginPath();
			ctx.strokeStyle = "blue";
			ctx.moveTo(200, 0);

			var start = 1;
			var pointX, pointY;
			for (; start < num; start++) {
				pointX = 200 + Math.sin(randian * start) * 200;
				pointY = 200 - Math.cos(randian * start) * 200;
				console.log(pointX+"|"+pointY);
				ctx.lineTo(pointX, pointY);
			}

		    ctx.closePath();
		    ctx.stroke();
		}
	}
	
});