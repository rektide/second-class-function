var when = require('when')

function pipeline(self, chain, args){
	var ctx= {self:self, chain:chain, last:args, args:args, i:0}
	var step= function(previous){
		// find next command in chain
		var command= ctx.chain[ctx.i++]
		if(!command)
			return ctx
		// run command
		var next= command(ctx, previous)
		if(next)
			// capture value
			ctx.last= next
		// check for end of chain
		if(ctx.i >= ctx.chain.length)
			return ctx
		// pass command output in to next chain step
		return when(next, step)
	}

	var command= ctx.chain[ctx.i++]
	if(!command)
		return ctx

	// instead of running the command on ctx, previous, run it on the full args
	// this is the only difference from the normal step
	var args= Array.prototype.slice.call(arguments, 0)
	args.unshift(ctx)
	var next= command.apply(null, ctx, args)

	if(next)
		ctx.last= next
	if(ctx.i >= ctx.chain.length)
		return ctx
	return when(next, step)
}

module.exports= pipeline
