import React, { Component } from 'react';

class PadElement extends Component {

	render() {
		return (
			<div 
				className="pad__element"
				data-index={this.props.index}
			></div>
		);
	}
}

export default PadElement;
