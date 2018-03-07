import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pad from './Pad.jsx';
import * as utils from '../utils';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sequenceComp: [],
			sequenceUser: [],
			round: 1,
			difficulty: 'norm',
			buttonDisabled: false,
			clicksCount: 0,
			activityMessage: '',
			playButtonText: 'Start Game'
		};

		this.handlePadClick = this.handlePadClick.bind(this);
	}

	componentDidMount() {
		this.deactivatePad();
	}
	
	play() {
		this.deactivatePad();
		let _sequenceComp = utils.generateSequence(this.state.round);
		utils.animatePad(_sequenceComp, this.state.difficulty, this.getDelay());
		this.setState({ 
			sequenceComp : _sequenceComp, 
			sequenceUser: [], 
			buttonDisabled: true,
			clicksCount: 0,
			activityMessage: 'Wait...'
		});

		setTimeout(
			function() {
				ReactDOM.findDOMNode(this.refs.pad).addEventListener('click', this.handlePadClick);
				this.activatePad();
			}.bind(this),
			this.getDelay() * (this.state.round + 1)
		);
	}

	deactivatePad() {
		let pad = document.querySelector('.game__pad');
		pad.classList.remove('game__pad--active');
		pad.removeEventListener('click', this.handlePadClick);
	}

	activatePad() {
		let pad = document.querySelector('.game__pad');
		this.setState({ activityMessage: 'Repeat!'});
		pad.classList.add('game__pad--active');
		pad.addEventListener('click', this.handlePadClick);
	}

	handlePadClick(e) {
		let padIndex = e.target.dataset.index;
		let sequenceUser = this.state.sequenceUser;
		
		utils.playSound(padIndex);
		utils.lightenPadElement(e.target);
		this.setState({ clicksCount: this.state.clicksCount + 1});
		if (!this.checkUsersChoose(padIndex)) {
			this.deactivatePad();
			this.endGame();
			alert('Game over');
		} else {
			sequenceUser.push(+padIndex);
			this.setState({ sequenceUser });
		}

		if (this.state.sequenceComp.length === this.state.sequenceUser.length) {
			this.passRound();
		}
	}

	passRound() {
		this.deactivatePad();
		this.setState({ 
			round: this.state.round + 1, 
			activityMessage: 'Fine!',
			playButtonText: 'Next round',
			buttonDisabled: false
		});
	}
	
	endGame() {
		this.deactivatePad();
		this.setState({ 
			round: 1, 
			activityMessage: '',
			playButtonText: 'Start Game',
			buttonDisabled: false
		});
	}

	checkUsersChoose(index) {
		let sequenceComp = this.state.sequenceComp;
		let sequenceUser = this.state.sequenceUser;
		let clicksCount = this.state.clicksCount;

		if (sequenceComp[clicksCount - 1] != index) {
			return false
		}

		return true;
	}

	getDelay() {
		switch(this.state.difficulty) {
			case 'easy':
				return 1500;
			case 'norm':
				return 1000;
			case 'hard':
				return 400;
			default:
				return 1500;
		}
	}

	handleLevelChange(event) {
		let difficulty = event.target.options[event.target.selectedIndex].value;
		this.setState({
			difficulty, round: 1,
			playButtonText: 'Start Game'
		});
	}
	
	render() {
		return (
			<div className="app__game">
				<h2 className="game__round">
					Round: {this.state.round}
				</h2>
				
				<div className="game__level">
					<h3>Level:</h3>

					<select 
						name="difficulty" 
						id="difficulty" 
						className="game__level-difficulty"
						onChange={event => this.handleLevelChange(event)}
					>
						<option value="easy">Easy</option>
						<option value="norm" selected>Normal</option>
						<option value="hard">Hard</option>
					</select>
				</div>
				<h3 className='game__activity-message'>{this.state.activityMessage}</h3>
				<Pad ref='pad' handlePadClick={event => this.handlePadClick(event)} />
				<button 
					className="game__play"
					onClick={() => this.play()}
					disabled={this.state.buttonDisabled}
				>
					{this.state.playButtonText}
				</button>

				<div id="audio"></div>
			</div>
		);
	}
}

export default Game;
