require.config({
	paths: {
		"jquery": "../jquery.min",
		"canvas": "canvas",
		"aside": "aside"
	}
});

require(["canvas"], function(canvas) {
  canvas.draw("main-ca", {});
});

require(["aside"], function(aside) {
  aside.init();
});