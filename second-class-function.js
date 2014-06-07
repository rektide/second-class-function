module.exports = makeSecondClassFunction

function makeSecondClassFunction() {
	var chain= []
	function secondFunction(){
		return chain2(chain, this, arguments)
	}
	secondFunction.chain= chain
	return secondFunction
}
