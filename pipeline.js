var when = require('when')

function pipeline(self, chain, args){
	var last= args.length > 1 ? args : args[0]
	var ctx= {self:self, chain:chain, last:last, args:args, i:0}
	var step= function(){
		// find next command in chain
		var command= ctx.chain[ctx.i++]
		if(!command)
			return ctx
		// run command
		when(command(ctx)).then(function(last){
			if(last !== undefined)
				// capture value
				ctx.last= last
			// check for end of chain
			if(ctx.i >= ctx.chain.length)
				return ctx
			// pass command output in to next chain step
			return step()
		})
	}
	return when(step(last)
}
module.exports= pipeline
