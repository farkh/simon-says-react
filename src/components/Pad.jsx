import React, { Component } from 'react';
import PadElement from './PadElement.jsx';

class Pad extends Component {
	render() {
		return (
			<div className="game__pad">
				<PadElement key={0} index={1} />
				<PadElement key={1} index={2} />
				<PadElement key={2} index={3} />
				<PadElement key={3} index={4} />
			</div>
		);
	}
}

export default Pad;
