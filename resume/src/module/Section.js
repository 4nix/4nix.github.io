var React = require("react");

var Section = React.createClass({
	getDefaultProps: function() {
		return {
			title: "",
			rows: [],
		}
	},

	render: function() {

		return (
			<section>
				<h1>{this.props.title}</h1>
				{this.props.rows}
			</section>
			)
	}
});

module.exports = Section;