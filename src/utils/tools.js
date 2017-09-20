let tool = {
	genUserId () {
		return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
	}
};
module.exports = tool;