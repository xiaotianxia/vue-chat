let tool = {
	genUserId () {
		return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
	},

	randomColor () {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	},

    filterXSS (str) {
        return str.replace('<', '&lt;')
                  .replace('>', '&gt;');
    }
};
module.exports = tool;