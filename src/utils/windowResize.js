window.onresize = function () {
    windowResize();
};
	windowResize();

function windowResize () {
	console.log(window.screen.width);
    var wWidth = window.screen.width > 750 ? 750 : window.screen.width;
	document.documentElement.style.fontSize = (wWidth / 750 * 100) + 'px';
}