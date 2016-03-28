define(['jquery'], function(jquery) {

	var ctx;

	return {

		draw: function(id, params) {
			var count = Object.keys(params).length;
			console.log(id);
			this.init(id);
			this.drawPolygon(params);
			this.drawSkills(params);
			this.drawBase(count);
		},

		init: function(id) {
			var canvas = document.getElementById(id); 
			ctx = canvas.getContext("2d");
		},

		drawPolygon: function(params) {
			// var angle = (num - 2) * 180/num;
			var num = Object.keys(params).length;
			var angle = 360/num;
			var randian = (2 * Math.PI / 360) * angle;

			// ctx.beginPath();
			// ctx.strokeStyle = "blue";
			// ctx.moveTo(200, 0);

			// var start = 1;
			// var pointX, pointY;
			// for (; start < num; start++) {
			// 	pointX = 200 + Math.sin(randian * start) * 200;
			// 	pointY = 200 - Math.cos(randian * start) * 200;
			// 	console.log(pointX+"|"+pointY);
			// 	ctx.lineTo(pointX, pointY);
			// }

			ctx.translate(200, 200);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#fff";
			if (num % 2 == 0) {
				ctx.moveTo(0, 200);
			} else {
				ctx.moveTo(0, 200);
			}

			// ctx.fillText("Hello World!",0,0);
			
			ctx.fillStyle = "#fff";
			ctx.beginPath();
			// for (i = 0; i < num; i ++) {
			// 	ctx.rotate(randian);
			// 	ctx.lineTo(0, -200);
			// }
			for (var item in params) {
				ctx.rotate(randian);
				ctx.lineTo(0, -200);
				ctx.fillText(item, -5, -180);
			}

		    ctx.closePath();
		    ctx.stroke();
		},

		drawBase: function(num) {
			// var num = 5;
			var angle = 360/num;
			var randian = (2 * Math.PI / 360) * angle;

			// ctx.translate(200, 200);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#aaa";
			if (num % 2 == 0) {
				ctx.moveTo(0, 200);
			} else {
				ctx.moveTo(0, 200);
			}
			ctx.rotate(randian);
			ctx.beginPath();
			for (i = 0; i < num; i ++) {
				ctx.rotate(randian);
				ctx.lineTo(0, 0 );
				ctx.moveTo(0, -200);
			}
			ctx.lineTo(0, 0);

		    ctx.closePath();
		    ctx.stroke();
		},

		drawSkills: function(params) {
			var r = [1, 0.8, 0.1, 0.4, 0.7];
			var num = Object.keys(params).length;
			var angle = 360/num;
			var randian = (2 * Math.PI / 360) * angle;

			// ctx.translate(200, 200);
			ctx.lineWidth = 1;
			ctx.fillStyle = "green";
			ctx.globalAlpha=0.2;
			if (num % 2 == 0) {
				ctx.moveTo(0, 200);
			} else {
				ctx.moveTo(0, 200);
			}
			ctx.rotate(-randian);
			ctx.beginPath();
			// for (i = 0; i < num; i ++) {
			// 	ctx.rotate(randian);
			// 	ctx.lineTo(0, -200 * r[i]);
			// }
			for (var item in params) {
				ctx.rotate(randian);
				ctx.lineTo(0, -200 * params[item]);
			}

		    ctx.closePath();
		    ctx.fill();
		}
	}
	
});