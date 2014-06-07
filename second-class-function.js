var pipeline2= require("./pipeline2")

module.exports = makeSecondClassFunction

function _results(ctx){
	return ctx.results
}

function _fail(ctx){
	return ctx.error || new Error("SecondClassComputation error")
}

/**
* @factory
*/
function makeSecondClassFunction() {
	// build chain from any passed in functions or promised-functions.
	var chain= Array.prototype.slice(arguments, 0)

	/**
	* SecondClassFunction
	* @class
	*/
	function SecondClassFunction(){
		var ctx = {arguments:arguments}
		return pipeline(chain, this, ctx).then(_results, _fail)
	}
	/**
	* The underlying command chain
	* @memberOf SecondClassFunction
	*/
	SecondClassFunction.chain= chain

	/**
	* apply, returning the continuation, rather than the continuation's results.
	* @memberOf SecondClassFunction
	*/
	function applyRaw(self, args){
		return chain(chain, this, {arguments:args})
	}
	SecondClassFunction.applyRaw = applyRaw

	return secondFunction
}
