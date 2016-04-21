define(['jquery'], function(jquery) {
	var $this;
	var ctx;
	var canvas;
	// var iEye = 0;
	// var iSpot = 0;	//动画计数

	var screenWidth;
	var screenHeight;

	var text;
	var ani;

	// var debug = 1;

	return {
		init: function(text) {
			$this = this;
			$this.text = text;

			// $this.draw();
		},

		reset: function() {
			// iEye = 0;
			// iSpot = 0;	//动画计数
			ctx.clearRect(0, 0, screenWidth, screenHeight);
			window.cancelAnimationFrame(ani);
			// debug++;
		},

		clear: function() {
			canvas.fadeOut(500);
			window.cancelAnimationFrame(ani);

			canvas.remove();
		},

		show: function() {
			$this.draw();
			$this.reset();
			canvas.fadeIn("slow", function() {
				$this.open();
			});
		},

		open: function() {
			var iEye = 0;
			var iSpot = 0;
			function drawIt() {
				// if (debug>2) {return;}
				// console.log(iSpot);
				// ctx.beginPath();
				// ctx.fillStyle = "#000";
				// ctx.fillRect(0, 0, screenWidth, screenHeight);
				ctx.clearRect(0, 0, screenWidth, screenHeight);
				ctx.save();

				ctx.translate(screenWidth/2, screenHeight/2);

				var eyeWidth = 100;
				var eyeHeight = 80;
				var eyePotRandian = 5;	//勾玉半径

				ctx.save();
				//左眼
				$this._drawEye(ctx, eyeWidth, eyeHeight, -44, 0, iEye, 1);
				//中心勾玉
				$this._drawCenterPot(ctx, eyePotRandian);
				ctx.rotate(-(iSpot)*Math.PI/180); 
				//上勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 0, 1);
				//右下勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 120, 1);
				//左下勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 240, 1);
				ctx.restore();

				ctx.save();
				//右眼
				$this._drawEye(ctx, eyeWidth, eyeHeight, 44, 0, iEye, 0);
				//中心勾玉
				$this._drawCenterPot(ctx, eyePotRandian);
				ctx.rotate((iSpot)*Math.PI/180); 
				//上勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 0, 0);
				//右下勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 120, 0);
				//左下勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 240, 0);
				ctx.restore();

				//文f字
				ctx.fillStyle = "#fff";
				ctx.font = "40px FZShuTi";
				ctx.fillText($this.text, -140, 80);


				ctx.restore();
				iSpot += 4;
				iEye < 100 && (iEye += 4);
				
				ani = window.requestAnimationFrame(drawIt);
				// console.log(ani);
			}

			
			drawIt();
		},
		draw: function() {
			// $this = this;
			// text = txt;
			screenWidth = $(document).width();
			screenHeight = $(document).height();

			canvas = $("<canvas width='"+screenWidth+"' height='"+screenHeight+"'>");
			canvas.css({"position": "absolute", 
						"z-index": -1, 
						"top": 0, 
						"left": 0, 
						"display": "none", 
						"background-color": "#000"
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

		/**
		eyeWidth: 眼睛的宽度
		eyeHeight: 眼睛的高度
		offsetX: 相对于中心的x位移
		offsetY: 相对于中心的y位移
		iEye: 眼睛的睁开幅度
		type: 眼睛类型, true: 左眼, false: 右眼
		*/
		_drawEye: function(ctx, eyeWidth, eyeHeight, offsetX, offsetY, iEye, type) {
			var prefix = type ? -1 : 1;
			var topEyePositionX = (eyeWidth + eyeHeight)*prefix; //上眼角

			// ctx.save();
			ctx.translate(offsetX, offsetY);
			ctx.fillStyle = "#fff";

			//设置睁开眼的弧度
			var topX = (topEyePositionX/2 - topEyePositionX/8)*(100 - iEye)*0.01 + topEyePositionX/8;
			var topY = (-eyeHeight/2 - (-0.8*eyeHeight))*(100 - iEye)*0.01 + (-0.8*eyeHeight);

			var bottomX = (topEyePositionX/2 - topEyePositionX)*(100 - iEye)*0.01 + topEyePositionX;
			var bottomY = (-eyeHeight/2 - (0.3*eyeHeight))*(100 - iEye)*0.01 + (0.3*eyeHeight);
	
			//眼眶
			ctx.beginPath();
			ctx.moveTo(topEyePositionX, -eyeHeight);
			// ctx.lineTo(prefix*eyeHeight, -eyeHeight);
			// ctx.arcTo(0, -eyeHeight, 0, 0, eyeHeight);
			// ctx.quadraticCurveTo(topEyePositionX/8, -0.8*eyeHeight, 0, 0);
			ctx.quadraticCurveTo(topX, topY, 0, 0);
			// ctx.lineTo(-eyeHeight, 0);
			// ctx.arcTo(topEyePositionX, 0, topEyePositionX, -eyeHeight, eyeHeight);
			// ctx.quadraticCurveTo(topEyePositionX, 0.3*eyeHeight, topEyePositionX, -eyeHeight);
			ctx.quadraticCurveTo(bottomX, bottomY, topEyePositionX, -eyeHeight);
			ctx.fill();
			
			//眼球
			ctx.translate((topEyePositionX)/2, -eyeHeight/2);
			ctx.globalCompositeOperation = "source-atop";
			ctx.beginPath();
			ctx.fillStyle = "#b00";
			ctx.arc(0, 0, eyeHeight/2.2, 0, 2*Math.PI);
			ctx.fill();
			

			//外框
			ctx.beginPath();
			ctx.strokeStyle = "#000";
			ctx.arc(0, 0, eyeHeight/2.2, 0, 2*Math.PI);
			ctx.stroke();

			//内框
			ctx.beginPath();
			ctx.strokeStyle = "#000";
			ctx.arc(0, 0, eyeHeight/4.4, 0, 2*Math.PI);
			ctx.stroke();

			ctx.globalCompositeOperation = "source-over";

			// ctx.restore();
		},


		/**
		ctx: canvas对象
		randian: 勾玉的半径
		*/
		_drawCenterPot: function(ctx, randian) {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "#000";
			ctx.arc(0, 0, randian, 0, 2*Math.PI);
			ctx.fill();
			ctx.restore();
		},

		/**
		ctx: canvas对象
		range: 勾玉与中心的距离
		randian: 勾玉的半径
		angle: 勾玉的位置角度(不是弧度)
		type: 勾玉尾方向, true: 向右, false: 向左
		*/
		_drawAroundPot: function(ctx, range, randian, angle, type) {
			
			var prefix = type ? -1 : 1;
			ctx.save();
			ctx.globalCompositeOperation = "source-atop";
			ctx.rotate(angle*Math.PI/180);
			ctx.translate(0, -range);
			ctx.fillStyle = "#000";
			ctx.beginPath();
			ctx.arc(0, 0, randian, 0, 2*Math.PI);
			ctx.fill();
			//画尾
			ctx.beginPath();
			ctx.moveTo(prefix*randian, 0);
			ctx.quadraticCurveTo(0, -2.2*randian, -prefix*randian*2, -1.5*randian);
			ctx.quadraticCurveTo(0, -1.5*randian, -prefix*randian, 0);
			ctx.fill();
			ctx.restore();
			// ctx.globalCompositeOperation = "source-over";
		}

	}
	
});