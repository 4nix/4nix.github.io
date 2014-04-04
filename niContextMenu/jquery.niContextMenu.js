(function($){
$.niContextMenu = function(options){
	var defaults = {
		area: document, 
		theme: "default", 
		id:"niContextMenu",
		arrowColor:["#000000","#000000"],
		items:[
			{title:"test1", disable:false},
		]
	}

	

	var options = $.extend(defaults,options);
	var isOver;
	var theme;
	var menuFrame;

	var themeCss = { firefox: 'div.firefox{ border:1px solid #979797; padding: 2px 1px; position:absolute; list-style-type: none; cursor: default; box-shadow: 5px 5px 2px -3px #888888; display: none; z-index:100; background: #f0f0f0; font-family: Tahoma; font-size: 12px;width: 214px;line-height: 10px;} \
								div.firefox ul { padding: 0px; color:#000; border-radius: 5px;list-style-type: none;float: left;width: 212px;margin:0px;border:0px solid #f0f0f0;height: 24px; padding-left: 1px;} \
								div.firefox ul:hover{ background: -moz-linear-gradient(top, #f3f5f7, #e7eef7); border: 1px solid #aecff7; height: 22px;line-height: 8px; padding-left: 0px;} \
								div.firefox ul:after{clear:both;} \
								div.firefox ul:hover > li:first-child { padding-top: 3px;} \
								div.firefox ul li{height: 20px; float: left;padding-top: 5px;} \
								div.firefox ul li:first-child{ width: 22px; border-right: 1px solid #e0e0e0;padding-top: 4px;padding-left: 4px;} \
								div.firefox ul li:nth-child(2){ padding-left: 4px; border-left: 1px solid #ffffff;width: 158px;} \
								div.firefox ul li:nth-child(3){ width: 17px;padding-left: 5px;} \
								div.firefox ul.disable{ color:#6d6d6d; } \
								div.firefox ul.disable:hover { color: #a1a192; background: -moz-linear-gradient(top, #f3f3f3, #e6e6e6); border:1px solid #d4d3d3} \
								div.firefox ul.line {height: 2px; border: 0px;} \
								div.firefox ul.line li {height: 2px;} \
								div.firefox ul.line li:nth-child(2){ width: 184px;padding:0px;} \
								div.firefox ul.line li hr {margin: 0px;border:0px;border-top: 1px solid #e0e0e0;border-bottom: 1px solid #ffffff;} \
								div.firefox ul.line:hover { background: #f0f0f0; height: 2px; border: 0px;padding-left: 1px;}',
					chrome: 'div.chrome{ border:1px solid #bababa; padding: 2px 0px; position:absolute; list-style-type: none; cursor: default; box-shadow: 5px 5px 2px -3px #888888; display: none; z-index:100; background: #ffffff; font-family: Arial; font-size: 12px;width: 171px;line-height: 13px;} \
								div.chrome ul { padding: 0px; color:#000; list-style-type: none;float: left;width: 171px;margin:0px;} \
								div.chrome ul.hover{ background: #4281f4; } \
								div.chrome ul:after{clear:both;} \
								div.chrome ul li{height: 18px; float: left;padding-top: 5px} \
								div.chrome ul li:first-child{ width: 25px; padding-top: 4px; padding-left: 9px;} \
								div.chrome ul li:nth-child(2){ padding-left: 4px; width: 111px;} \
								div.chrome ul li:nth-child(3){ width: 22px;} \
								div.chrome ul.disable{ color:#6d6d6d; } \
								div.chrome ul.disable:hover { background-color: #ffffff;} \
								div.chrome ul.line{height: 11px; } \
								div.chrome ul.line li:nth-child(1){ width: 0px;padding: 0px;} \
								div.chrome ul.line li:nth-child(2){ width: 171px;height: 1px; padding:5px 0px;} \
								div.chrome ul.line li hr{ margin: 0px;height:0px;border:0px;border-top: 1px solid #e9e9e9;;} \
								div.chrome ul.line:hover { background: #ffffff;} '}

	init();

	function init(){
		//init mouse click value
		var mouseClick = {
			"Netscape" : {
				left:0,
				right:[2],
				center:1
			},
			"Microsoft Internet Explorer" : {
				left:1,
				right:[0,2],
				center:4,
				leftAndRight:3
			},
			"Opera" : {
				left:0,
				right:[2]
			}
		};

		//init theme
		if(options.theme == 'default'){
			theme = getCurrentBrower();
		}else{
			theme = options.theme;
			if(theme == "chrome"){
				options.arrowColor = ["#ffffff","#7a7a7a"];
			}
		}
		$("body").append("<style type='text/css'>"+themeCss[theme]+"</style>");

		//init contextmenu
		menuFrame = initContext(options.items,options.id);

		//init contextmenu position
		$(options.area).mousedown(function(e){
			var event = e || event;
			if($.inArray(event.button, mouseClick[navigator.appName].right) >=0 ){
				this.oncontextmenu = function(){ return false};

				var left = event.pageX || event.offsetX;
				var top = event.pageY || event.offsetY;

				showContext(menuFrame,top + 5,left + 5);
				menuFrame.show();
				isOver = false;
			}
		});

		//init whether mouse is on contextmenu
		$("div[id^='"+options.id+"']").mouseover(function(){isOver=true;});
		$("div[id^='"+options.id+"']").mouseout(function(){isOver=false;});

		//init mouse action
		$(document).mousedown(function(e){
			var event = e;
			if(mouseClick[navigator.appName].left == event.button && !isOver){
				hideAll();
			}
		});
	}

	function hideAll(){
		$("div[id^='"+options.id+"']").hide();
	}

	function showContext(frame,top,left){
		frame.css({left:left+5,top:top+5}).show();
	}

	function getCurrentBrower(){
		var str = navigator.userAgent;
		// support chrome and firefox

		if(str.match(/chrome/i)){
			return "chrome";
		}else{
			return "firefox";
		}
	}

	function initContext(items,id){

		var frame = $("<div />",{
			"class": theme,
			"id": id
		});

		$("body").append(frame);

		var increateH = 5;
		for(var i in items){
			var item = items[i];
			if(item.isHorizon == true){
				frame.append('<ul class="line"><li></li><li><hr /></li></ul>');
				increateH+=11;
			}else{
				var _ul = $("<ul />",{
					"data-sub":id+"_"+i
				});
				var _liFirst = $("<li />");
				var _liSecond = $("<li />");
				var _liThird = $("<li />");

				_ul.bind({
					mouseover:function(){mouseOverUL(this)},
					mouseout:function(){mouseOutUL(this)}
				});
				if(item.disable){
					_ul.addClass("disable");
				}

				if(item.src){
					createIcon(_liFirst, item.src);
				}

				if(item.func){
					_ul.attr("onclick",item.func);
					_ul.bind("click",function(){hideAll();});
				}
		
				_liSecond.append(item.title);
				if(item.sub){
					createArrow(_liThird);
					_ul.bind({
						mouseover:function(){mouseOverArrow(this)},
						mouseout:function(){mouseOutArrow(this)}
					});
					initContext(item.sub,id+"_"+i);
				}

				increateH += 23;

				_ul.append(_liFirst);
				_ul.append(_liSecond);
				_ul.append(_liThird);
				frame.append(_ul);
			}
		}
		return frame;
	}

	function createIcon(node, src){
		var img = new Image();
		img.src = src;
		var _canvas = $("<canvas />");
		var _ctx = _canvas[0].getContext("2d");

		node.append(_canvas[0]);
		_canvas[0].width = 16;
		_canvas[0].height = 16;

		img.onload = function(){
			_ctx.drawImage(img,0,0);
		}
	}

	function createArrow(node){
		var _canvas = $("<canvas />");
		var _ctx = _canvas[0].getContext("2d");

		node.append(_canvas[0]);
		_canvas[0].width = 16;
		_canvas[0].height = 16;
		_ctx.fillStyle = options.arrowColor[1];
		drawArrow(_ctx);

		return _canvas;
	}
	//obj is ul object
	function mouseOverUL(obj){
		var sub_id = $(obj).attr("data-sub");
		hideSubUL(obj);
		showContext($("#"+sub_id),$(obj).offset().top-5,$(obj).offset().left+$(obj).width()-10);
		$(obj).addClass("hover");
	}

	//obj is ul object
	function hideSubUL(obj){
		$(obj).parent().children("ul").each(function(){
			if($(this).attr("data-sub") && this !== obj){
				$(this).removeClass("hover");
				$("#"+$(this).attr("data-sub")).hide();
				hideSubUL($("#"+$(this).attr("data-sub")).children("ul")[0]);
			}
		});
	}

	//obj is ul object
	function mouseOutUL(obj){
		if($("#"+$(obj).attr("data-sub")).is(":visible") == false){
			$(obj).removeClass("hover");
		}
	}

	function mouseOverArrow(obj){
		var canvas = $(obj).find("canvas");
		var ctx = canvas[0].getContext("2d");
		ctx.fillStyle = options.arrowColor[0];
		drawArrow(ctx);
	}

	function mouseOutArrow(obj){
		var canvas = $(obj).find("canvas");
		var ctx = canvas[0].getContext("2d");
		ctx.fillStyle = options.arrowColor[1];
		drawArrow(ctx);
	}

	function drawArrow(ctx){
		var _ctxP = [6,3];
		ctx.fillRect(_ctxP[0],_ctxP[1],1,1);
		ctx.fillRect(_ctxP[0],_ctxP[1]+1,2,1);
		ctx.fillRect(_ctxP[0],_ctxP[1]+2,3,1);
		ctx.fillRect(_ctxP[0],_ctxP[1]+3,4,1);
		ctx.fillRect(_ctxP[0],_ctxP[1]+4,3,1);
		ctx.fillRect(_ctxP[0],_ctxP[1]+5,2,1);
		ctx.fillRect(_ctxP[0],_ctxP[1]+6,1,1);
	}

}
})(jQuery);