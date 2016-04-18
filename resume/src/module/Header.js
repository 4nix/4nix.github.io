var React = require("react");
var Icon = require("./Icon");

// class Header extends React.Component {

// 	render() {
// 		return (
// 		<div className="row">
// 			<div className="cols-f-0">
// 				  <Icon width="340" height="150" viewBox="0 0 40 40" />
// 			</div>
// 			<div className="cols-f-1">
// 				<h1>武续涛</h1>
// 				<p>wublue124@126.com</p>
// 				<p><a href="http://4nix.github.io">4nix.github.io</a></p>
// 				<p>+86 131 2113 3797</p>
// 			</div>
// 		</div>
// 	}

// }

// exports default Header;

var Header = React.createClass({

	render: function() {
		return (
		<div className="row">
			<div className="cols-f-0">
				  <Icon type="avatar" width="340" height="150" viewBox="0 0 40 40" />
			</div>
			<div className="cols-f-1">
				<h1>{this.props.data.name}</h1>
				<p>{this.props.data.email}</p>
				<p><a href={"http://"+this.props.data.site}>{this.props.data.site}</a></p>
				<p>{this.props.data.tel}</p>
			</div>
		</div>
		);
	}

});

module.exports = Header;