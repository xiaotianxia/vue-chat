window.onresize = function () {
    windowResize();
};
	windowResize();

function windowResize () {
    var wWidth = window.screen.width;
    // var wWidth = document.documentElement.clientWidth;
    if(wWidth > 750) {
    	document.documentElement.style.fontSize = '100px';
    } else {
		document.documentElement.style.fontSize = (wWidth / 750 * 100) + 'px';
    }
}