import React, { Component } from 'react';

class PadElement extends Component {

	render() {
		let elementStyles = {
			background: this.props.color
		};

		return (
			<div 
				className="pad__element"
				data-index={this.props.index}
				style={elementStyles}
			></div>
		);
	}
}

export default PadElement;
