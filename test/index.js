const assert = require('assert')
const _ = require('../')

const createActions = _.default
const dispatch = _.dispatch
const generateActions = _.generateActions

const actions = createActions('foo', {
  bar: x => x + 2,
  baz: dispatch,
})

assert(typeof actions.bar === 'object')
assert(actions.bar.id === 'foo/bar')

const fsaDispatchablePayload = actions.bar.fsa(2)

assert(typeof fsaDispatchablePayload === 'object')
assert(fsaDispatchablePayload.type === 'foo/bar')
assert(fsaDispatchablePayload.payload === 4)

assert(typeof actions.bar.dispatch === 'function')
assert(actions.bar.dispatch(2) === 4)

assert(actions.baz.fsa(6).payload === 6)
assert(actions.baz.dispatch(6) === 6)

const generated = generateActions('foo', ['bar', 'baz'])

assert(typeof generated.foo === 'undefined')
assert(typeof generated.bar === 'object')
assert(typeof generated.baz === 'object')

assert(generated.bar.dispatch(8) === 8)
