var React = require("react");
var Section = require("./Section");
var Icon = require("./Icon");

var Main = React.createClass({
	getDefaultProps: function() {

	},

	getPersonalSection: function(data) {
		var rows = data.rows.map(function(row) {
			return <div className="row">
						<div className="cols-s-1 text-justify">{row.name}</div>
						<div className="cols-f-1 ml20">{row.val}</div>
					</div>
		});

		return (
			<Section title={data.title} rows={rows}></Section>
			)
	},

	getSkills: function(data) {
		var rows = <div className="row">
						<ul className="skills">
							{data.rows.map(function(row) {
								return <li>
											<div className="svg-field" data-info={row.info}>
												<Icon type={row.name.toLowerCase()} />
											</div>
											<p>{row.name}</p>
											<div className={"star-"+row.star}></div>
										</li>
							})}
						</ul>
					</div>;
		return (
			<Section title={data.title} rows={rows}></Section>
			)
	},

	getExperience: function(data) {
		var rows = data.rows.map(function(row) {
			return <div className="row">
						<div className="cols-s-2">{row.period}</div>
						<div className="cols-f-0 work" data-info={row.info}>{row.details}</div>
					</div>
		});

		return (
			<Section title={data.title} rows={rows}></Section>
			)
	},

	getMe: function(data) {
		var rows = [<div className="row">
						<div className="cols-f-1 passage">
							{data.rows.map(function(row) {
								return <p title={row.info}>{row.paragraph}</p>
							})}
						</div>
					</div>
					];
		return (
			<Section title={data.title} rows={rows}></Section>
			)
	},

	render: function() {
		return (
			<div>
				{this.getPersonalSection(this.props.data.personal)}

				{this.getSkills(this.props.data.skills)}

				{this.getExperience(this.props.data.experience)}

				{this.getMe(this.props.data.me)}
			</div>
			)
	}
});

module.exports = Main;