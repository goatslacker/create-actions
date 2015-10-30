export const dispatch = (x, ...a) => {
  return a.length
    ? [x].concat(a)
    : x == null ? null : x
}

const createActions = (namespace, obj) => {
  return Object.keys(obj).reduce((actions, name) => {
    const id = `${namespace}/${name}`
    const action = x => ({ type: id, payload: obj[name](x) })
    action.id = id
    action.dispatch = obj[name]
    actions[name] = action
    return actions
  }, {})
}

export const generateActions = (namespace, actions) => {
  return createActions(namespace, actions.reduce((o, name) => {
    o[name] = dispatch
    return o
  }, {}))
}

export default createActions
