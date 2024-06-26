import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Reports from './components/Reports'
import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'
import './App.css'

// #region - Use these lists in your code.

// #endregion

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/reports" component={Reports} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
