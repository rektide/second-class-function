# Second Class Function

Second Class Function imagines a semantic underpinning for what might underwrite a function. This experiment stages:
* A `makeSecondClassFunction`, which returns a skeleton function that can then be built on/composed and executed
* Executions of SecondClassFunction creates a continuation
* The continuation is passed through a an array (chain) of handlers (commands).
* Each handler gets the current continuation, computes, and returns the new continuation
* The overarching second class function passes each resultant continuation to the next handler (command) in the array (chain).

Second Class Function adds a semantic/expressive composition layer to a function. Rather than inheritance's explicit and static compositional model, the Second Class Function hoists the composition of functions into a thing that is expressed in the language itself and is manipulable at runtime. Since a function is expressing itself semantically in the language rather than being a part per se of the language, the function becomes once removed from the first class function basis and is thus, *The Second Class Function.*

# Continuation Contents

Inner functions are passed in a continuation object, containing:

* `self`, the `this` of whatever called the SecondClassFunction
* `chain`, the command chain being sequenced
* `i`, the current position of the continuation
* `last`, the return of the previous iteration whose value was not undefined

Inner functions are free to modify the state of the continuation or to add state to it as they see fit. The continuation is a container for the execution state, and it's up to commands to mung record and modify that state as they see fit.

# Setting Results

After the chain runs to completion, the SecondClassFunction will:

* Look for a `result` property to resolve to
* Fall back to the `last` property

# Gotchas/Awesomenesses

* A second class function always returns a promise, and composed functions may themselves return promises.

# Further Confusion

* [Chain of Command, the: Receiver-side Handling A Generalized First Class Model of Context Passing Processing](https://gist.github.com/rektide/5998727)
