# minibex-vscode README

This plugin provides syntax highlighting and snippets for the Minibex file format, featured in the [IBEX library](http://www.ibex-lib.org). It also allows to immediately launch the ibex optimizer or solver in the editor.

## Features

* Minimal syntax highlighting for the Minibex language.
* Various snippets for Minibex (if you forget the syntax!):
  * comments: `linecomment`, `blockcomment`,
  * variables: `variables` (block), `varvector`, `varmatrix`,
  * constants: `constants` (block),
  * goal: `minimize` (block),
  * constraints: `constraints` (block), `ForLoop`, `addconstraint`,
  * values: `vector`, `matrix`, `interval`,
  * functions: `function`.
* Commands `runSolve` and `runOpt` to launch a solver or optimizer on the current Minibex file.

## Requirements

There is no requirements.

## Extension Settings

This extension contributes the following settings:

* `minibex.ibexOptimPath`: path to `ibexopt`
* `minibex.ibexSolverPath`: path to `ibexsolve`,
* `minibex.solverMinEps`: paving precision
* `minibex.optGoalEps`: precision on objective

## Known Issues

* Syntax highlighting is still minimal, and could not work in more complex cases. The defined grammar is very basic.
* Colors are a bit ugly.

## Release Notes

### 0.0.1

Initial release.

**Enjoy!**