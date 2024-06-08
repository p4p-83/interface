document.addEventListener('DOMContentLoaded', () => {
	const clickCircle = document.getElementById('click-circle');
	const followCircle = document.getElementById('follow-circle');
	const submitButton = document.getElementById('submit-button');
	let clickCirclePosition = { x: 0, y: 0 };

	// Show the circle at the click position
	document.body.addEventListener('click', (e) => {
		clickCircle.style.left = `${e.clientX - 25}px`;
		clickCircle.style.top = `${e.clientY - 25}px`;
		clickCircle.style.display = 'block';
		clickCirclePosition = { x: e.clientX, y: e.clientY };
	});

	// Make the circle follow the mouse
	document.body.addEventListener('mousemove', (e) => {
		followCircle.style.left = `${e.clientX - 25}px`;
		followCircle.style.top = `${e.clientY - 25}px`;
	});

	// Log the position of the click circle on submit
	submitButton.addEventListener('click', (e) => {
		console.log(`Circle position: X: ${clickCirclePosition.x}, Y: ${clickCirclePosition.y}`);
		e.preventDefault();
		e.stopImmediatePropagation();
	});
});