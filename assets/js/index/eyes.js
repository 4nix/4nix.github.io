define(['jquery'], function(jquery) {

	var ctx;

	return {
		draw: function(text) {
			var $this = this;
			var screenWidth = $(document).width();
			var screenHeight = $(document).height();

			var canvas = $("<canvas width='"+screenWidth+"' height='"+screenHeight+"'>");
			canvas.css({"position": "absolute", "z-index": -1, "top": 0, "left": 0, "display": "none"});
			var ctx = canvas[0].getContext("2d");
			var i = 0;	//动画计数

			function doIt() {
				
				ctx.fillStyle = "#000";
				ctx.fillRect(0, 0, screenWidth, screenHeight);
				ctx.save();

				ctx.translate(screenWidth/2, screenHeight/2);

				var eyeWidth = 100;
				var eyeHeight = 80;
				var eyePotRandian = 5;	//勾玉半径

				ctx.save();
				//左眼
				$this._drawEye(ctx, eyeWidth, eyeHeight, -44, 0, 1);
				//中心勾玉
				$this._drawCenterPot(ctx, eyePotRandian);
				ctx.rotate(-(i)*Math.PI/180); 
				//上勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 0, 1);
				//右下勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 120, 1);
				//左下勾玉
				$this._drawAroundPot(ctx, eyeHeight/4.4, eyePotRandian, 240, 1);
				ctx.restore();

				ctx.save();
				//右眼
				$this._drawEye(ctx, eyeWidth, eyeHeight, 44, 0, 0);
				//中心勾玉
				$this._drawCenterPot(ctx, eyePotRandian);
				ctx.rotate((i)*Math.PI/180); 
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
				ctx.fillText(text, -140, 80);


				ctx.restore();
				i = i + 4;
				window.requestAnimationFrame(doIt);
			}
			doIt();





			canvas.appendTo("body");

			return canvas;
		},

		/**
		eyeWidth: 眼睛的宽度
		eyeHeight: 眼睛的高度
		offsetX: 相对于中心的x位移
		offsetY: 相对于中心的y位移
		type: 眼睛类型, true: 左眼, false: 右眼
		*/
		_drawEye: function(ctx, eyeWidth, eyeHeight, offsetX, offsetY, type) {
			var prefix = type ? -1 : 1;
			var topEyePositionX = (eyeWidth + eyeHeight)*prefix; //上眼角

			// ctx.save();
			ctx.translate(offsetX, offsetY);
			ctx.fillStyle = "#fff";
			
			//眼眶
			ctx.beginPath();
			ctx.moveTo(topEyePositionX, -eyeHeight);
			ctx.lineTo(prefix*eyeHeight, -eyeHeight);
			ctx.arcTo(0, -eyeHeight, 0, 0, eyeHeight);
			ctx.lineTo(-eyeHeight, 0);
			ctx.arcTo(topEyePositionX, 0, topEyePositionX, -eyeHeight, eyeHeight);
			ctx.fill();

			//眼球
			ctx.translate((topEyePositionX)/2, -eyeHeight/2);
			ctx.beginPath();
			ctx.fillStyle = "#f00";
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
		}

	}
	
});