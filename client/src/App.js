import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Main from './Pages/Main'
import Auth from './Pages/Auth/Auth'
import Search from './Pages/Search/Search'
import Staff from './Pages/Sheet/Sheet'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/auth' component={Auth} />
        <Route path='/search' component={Search} />
        <Route path='/:id' render={(props) => <Staff {...props} viewOnly={true} />} />
      </Switch>
    </div>
  )
}

export default App
