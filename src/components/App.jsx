import React, { Component } from 'react';
import Game from './Game.jsx';

class App extends Component {
		
	render() {
		return (
			<div className="app">
				<h1 className="app__header">Simon The Game</h1>
					
				<Game />
			</div>
		);
	}
}

export default App;
