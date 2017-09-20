window.onresize = function () {
    windowResize();
};
	windowResize();

function windowResize () {
	console.log(window.screen.width);
	document.documentElement.style.fontSize = ((window.screen.width / 750) * 100) + 'px';
}