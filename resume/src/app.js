// import React from "react";
// import ReactDOM from "react-dom";
// import Header from "./Header";
// import Main from "./Main";
var React = require("react");
var ReactDOM = require("react-dom");
var Header = require("./module/Header");
var Main = require("./module/Main");



var headerInfo = {
	"name": "武续涛",
	"email": "wublue124@126.com",
	"site": "4nix.github.io",
	"tel": "+86 131 2113 3797",
	"avatar": ""
};
ReactDOM.render(
  <Header data={headerInfo} />,
  document.getElementById("header")
);


var mainInfo = {
	"personal": {
		"title": "个人资料",
	 	"rows": [
			{"name": "出生日期", "val": "1987.08.29"},
			{"name": "教育", "val": "江汉大学/计算机科学与技术"},
			{"name": "学历", "val": "本科"},
			{"name": "英语能力", "val": "四级"}
		]
	},

	"skills": {
		"title": "专业能力",
		"rows": [
			{"name": "HTML", "star": 4, "info": "基本元素过得去, canvas还行, svg还在学..."},
			{"name": "JavaScript", "star": 4,"info": "掌握程度算熟练吧"},
			{"name": "CSS", "star": 4, "info": "我喜欢这个... 多年前用less"},
			{"name": "PHP", "star": 4, "info": "6年PHP经验, 用过很多框架和开源程序, 目前用phalcon"},
			{"name": "Linux", "star": 3,"info": "日常操作没问题"},
			{"name": "MySQL", "star": 4,"info": "掌握程度熟练, 一般优化都会"},
			{"name": "Nginx", "star": 3,"info": "基本配置都没问题, 平常操作的比较少"},
			{"name": "jQuery", "star": 4, "info": "平常js都是使用这个库"},
			{"name": "React", "star": 2, "info": "刚接触不久, 把原来的简历改成react了, 感觉完全不是js了..."},
			{"name": "Git", "star": 2, "info": "工作开发都是svn, 只有自己的项目才是git"}
		]
	},

	"experience": {
		"title": "工作经历",
		"rows": [
			{"period": "2014.5 – ", "details": "喜地电子商务有限公司", "info": "负责公司后台管理系统, 使用phalcon, http://www.xidibuy.com/"},
			{"period": "2013.6 – 2014.5", "details": "瑞友科技软件公司", "info": "外包公司, 做的是内部电梯管理系统, 使用zend framework"},
			{"period": "2011.11 - 2013.6", "details": "开联通网络技术服务有限公司", "info": "ecshop二次开发商城, 公司已卖- - |"},
			{"period": "2010.3 - 2011.3", "details": "美创贸易北京分公司", "info": "zencart二次开发商城, 外贸公司, 已倒"},
			{"period": "2009.5 - 2010.3", "details": "广州特泊儿珠宝公司", "info": "外贸公司, 仍然坚挺, 主站还跟6年前一样, - - |, http://www.topearl.com/"}
		]
	},

	"me": {
		"title": "关于我",
		"rows": [
			{"paragraph": "性格开朗随和,喜欢前端.", "info": "这句话我整整用了近6年..."},
			{"paragraph": "工作主要是商城系统. 用过很多php框架, 如thinkphp, zend, yii等, 现在使用的是phalcon.", "info": "框架用一个忘一个, - - |"},
			{"paragraph": "最近有意想转向前端, 因为我终于承认自己对后端和服务器没有兴趣这件事了, 反倒是前端的一直吸引着我, 所以我下决心要做自己喜欢的事了. 对于前端技术, 目前还在学requireJs, react中, 处在重新起步阶段.", "info": "前端很炫酷有木有!!!!"},
			{"paragraph": "多在创业团队工作, 自认为还是比较能吃苦.", "info": "什么的都得干, 样样都得会, 哪里缺人补哪哪里"},
			{"paragraph": "兴趣首排电影动漫, 也游个泳跑个步什么的, 天气好的时候喜欢出门散步.", "info": "我不是宅, 只是家里比外面好玩罢了"}
		]
	}
};
ReactDOM.render(
	<Main data={mainInfo} />,
	document.getElementById("main")
);

console.log("我的pdf简历", "http://4nix.github.io/resume/%E6%AD%A6%E7%BB%AD%E6%B6%9B%E7%9A%84%E7%AE%80%E5%8E%86.pdf");