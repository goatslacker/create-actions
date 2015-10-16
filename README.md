# create-actions

> A tool to create action creators

Why would you use this?

If you're working with instances of alt or if you want to use action creators then this facilitates the creation of them by keeping your code concise.

Alt [supports](https://github.com/goatslacker/alt/commit/cd54ed13040ceb6edf1826ec5cbc69facdf9a19e) using action creators to dispatch, this means you can `import` your actions directly in a component to use them rather than inject it through using context.

Example action creator

```js
const CountIncremented = {
  id: 'increment',
  dispatch() {
    return 1
  }
}
```

You can then listen to this action in your store normally

```js
this.bindAction(CountIncremented, this.incrementCount)
```

and you can dispatch it using `alt.dispatch`

```js
alt.dispatch(CountIncremented)
```

Writing various actions can be tedious so this tool creates a shorthand for creating them.

Use it to create your own actions. Actions return the data they want to dispatch.
Good for use with [Alt](https://github.com/goatslacker/alt)

```js
import createActions, { dispatch } from 'create-actions'

export default createActions('UserActions', {
  loggedIn: dispatch,
  loggedOut: dispatch,
  changedName(newName) {
    request.put('/users', { id: 4, name: newName })
    return newName
  },
})
```

You can also generate actions if all they are doing is passing data directly through to the store.

```js
import { generateActions } from 'create-actions'

export default generateActions('MusicActions', [
  'genreSelected',
  'songPlayed',
  'songStopped',
  'fetchRelatedAlbums',
])
```

Using this with something like [`redux`](https://github.com/rackt/redux) is also straightforward.

```js
import { generateActions } from 'create-actions'
const DocumentActions = generateActions('DocumentActions', ['changedTitle'])

store.dispatch(DocumentActions.changedTitle.dispatch('This is the new title'))
```
