import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import store from './redux/store';
import Study from './pages/study';
import Login from './pages/login';
import Signup from './pages/signup';

import 'bootswatch/dist/simplex/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/study' />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/study'>
            <Study />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>

          <Route>
            {/* Not found */}
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;