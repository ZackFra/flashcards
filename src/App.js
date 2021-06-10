import { Provider } from 'react-redux';

import Routes from 'components/routes';
import store from './redux/store';

import 'bootswatch/dist/simplex/bootstrap.min.css';

function App() {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;