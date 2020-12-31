import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Toolbar } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'

import Artists from './components/Artists/Artists'
import Albums from './components/Albums/Albums'
import Bookmarks from './components/Bookmarks/Bookmarks'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Toolbar />
      <Switch>
        <Route exact path='/' component={Artists} />
        <Route path='/bookmarks' component={Bookmarks} />
        <Route path='/:id' component={Albums} />
      </Switch>
    </Router>
  )
}

export default App
