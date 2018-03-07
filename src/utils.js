function clearLightning(element) {
	element.classList.remove('pad__element--lightened');
}

export const getRandomNumber = () => Math.floor(Math.random() * 4) + 1;
export const generateSequence = (round) => {
	let sequence = [];
	for (let i = 1; i <= round + 1; i++) {
		sequence.push(getRandomNumber());
	}

	return sequence;
}
export const animatePad = (sequence, difficulty, delay) => {
	let padElements = document.getElementsByClassName('pad__element');

	for (let i = 0; i < sequence.length; i++) {
		let element = padElements[sequence[i] - 1];
		setTimeout(lightenPadElement, delay * i, element);
		setTimeout(playSound, delay * i, sequence[i]);
	}
}
export const lightenPadElement = (element) => {
	element.classList.add('pad__element--lightened');

	setTimeout(clearLightning, 300, element);
}
export const playSound = (index) => {
	let audioParent = document.getElementById('audio');
	let src = `src/audio/${index}.wav`;

	let audio = `<audio autoplay src=${src} type="audio/wav"></audio>`;
	audioParent.innerHTML = audio;
}
