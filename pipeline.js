var when = require('when')

function pipeline(self, chain, args){
	var ctx= {self:self, chain:chain, last:args, args:args, i:0}
	var step= function(previous){
		var command= ctx.chain[ctx.i++]
		if(!command)
			return ctx
		var next= command(ctx, previous)
		if(next)
			ctx.last= next
		if(ctx.i >= ctx.chain.length)
			return ctx
		return when(next, step)
	}
	var command= ctx.chain[ctx.i++]
	if(!command)
		return ctx
	var args= Array.prototype.slice.call(arguments, 0)
	args.unshift(ctx)
	var next= command.apply(null, args)
	if(next)
		ctx.last= next
	if(ctx.i >= ctx.chain.length)
		return ctx
	return when(next, step)
}

module.exports= pipeline
