import React from 'react';
import ReactDOM from 'react-dom';
import {Auth} from 'aws-amplify';
import config from './config';
import './index.css';
import App from './App';

Auth.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
