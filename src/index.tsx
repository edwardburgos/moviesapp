import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import Detail from './components/Detail/Detail'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Genre from './components/Genre/Genre';
import Collection from './components/Collection/Collection';
import Company from './components/Company/Company';
import Person from './components/Person/Person';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/detail/:id/:name" render={({ match }) => <Detail id={parseInt(match.params.id)} />} />
          <Route path="/genre/:id/:name" render={({ match }) => <Genre id={parseInt(match.params.id)} />} />
          <Route path="/collection/:id/:name" render={({ match }) => <Collection id={parseInt(match.params.id)} />} />
          <Route path="/company/:id/:name" render={({ match }) => <Company id={parseInt(match.params.id)} />} />
          <Route path="/person/:id/:name" render={({ match }) => <Person id={parseInt(match.params.id)} />} />
        </Switch>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
