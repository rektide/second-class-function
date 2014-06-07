var pipeline= require("./pipeline")

module.exports = makeSecondClassFunction

function _results(ctx){
	return ctx.results || ctx.last
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
		var args= Array.prtotype.slice.call(arguments, 0)
		return pipeline(this, chain, args).then(_results, _fail)
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
		return pipeline(chain, this, args)
	}
	SecondClassFunction.applyRaw = applyRaw

	return SecondClassFunction
}
