require.config({
	paths: {
		"jquery": "../jquery.min",
		"canvas": "canvas",
		"aside": "aside"
	}
});

require(["canvas"], function(canvas) {
  canvas.draw("main-ca", {'后端': 0.8, '前端': 0.8, '服务器': 0.6, '数据库': 0.5, '其他': 0.4});
});

require(["aside"], function(aside) {
  aside.init();
});