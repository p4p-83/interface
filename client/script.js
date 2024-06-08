const { WebRTCPlayer } = require('@eyevinn/webrtc-player');

const CONSTANTS = {
	WHEP_URL: 'http://localhost:8889/facetime/whep',
	CIRCLE_SIZE: 10,
};

/** @type {Document} */
let document;

document.addEventListener('DOMContentLoaded', async () => {
	const video = document.querySelector('video');
	const player = new WebRTCPlayer({
		video: video,
		type: 'whep',
		statsTypeFilter: '^candidate-*|^inbound-rtp',
	});
	await player.load(new URL(CONSTANTS.WHEP_URL));
	player.unmute();

	player.on('no-media', () => {
		console.log('media timeout occured');
	});
	player.on('media-recovered', () => {
		console.log('media recovered');
	});

	// Subscribe for RTC stats: `stats:${RTCStatsType}`
	player.on('stats:inbound-rtp', (report) => {
		if (report.kind === 'video') {
			console.log(report);
		}
	});

	const clickCircle = document.getElementById('click-circle');
	const followCircle = document.getElementById('follow-circle');
	const submitButton = document.getElementById('submit-button');
	let clickCirclePosition = { x: 0, y: 0 };

	// Show the circle at the click position
	document.body.addEventListener('click', (e) => {
		clickCircle.style.left = `${e.clientX - (CONSTANTS.CIRCLE_SIZE / 2)}px`;
		clickCircle.style.top = `${e.clientY - (CONSTANTS.CIRCLE_SIZE / 2)}px`;
		clickCircle.style.display = 'block';
		clickCirclePosition = { x: e.clientX, y: e.clientY };
	});

	// Make the circle follow the mouse
	document.body.addEventListener('mousemove', (e) => {
		followCircle.style.left = `${e.clientX - (CONSTANTS.CIRCLE_SIZE / 2)}px`;
		followCircle.style.top = `${e.clientY - (CONSTANTS.CIRCLE_SIZE / 2)}px`;
	});

	// Log the position of the click circle on submit
	submitButton.addEventListener('click', (e) => {
		console.log(`Circle position: X: ${clickCirclePosition.x}, Y: ${clickCirclePosition.y}`);
		e.preventDefault();
		e.stopImmediatePropagation();
	});
});