export const dispatch = (x, ...a) => {
  return a.length
    ? [x].concat(a)
    : x == null ? null : x
}

const createActions = (namespace, obj) => {
  return Object.keys(obj).reduce((actions, name) => {
    const id = `${namespace}/${name}`
    actions[name] = {
      id,
      dispatch: obj[name],
      fsa: x => ({ type: id, payload: obj[name](x) }),
    }
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
