import React, {Component, cloneElement} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, Link, IndexLink} from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';
import configureStore from './store/configureStore';
import 'babel-polyfill';

import HomePage from './pages/HomePage';
import Alert from './components/Alert';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import SharePage from './pages/SharePage';
import CommentPage from './pages/CommentPage';
import SpreadPage from './pages/SpreadPage';
import './style/main.styl';

import {fetchFromSeed} from './actions/seed';
import {fetchCurrentUser} from './actions/user';

// FastClick
import FastClick from 'fastclick';
FastClick.attach(document.body);

// import DevTools from './pages/DevTools';

// History-Router
// const history = createBrowserHistory();
// import createBrowserHistory from 'history/lib/createBrowserHistory';
const store = configureStore();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionName: 'right',
    };
  }

  componentWillReceiveProps(nextProps) {
    const currntPathname = this.props.location.pathname;
    const nextPathname = nextProps.location.pathname;
    let transitionName = 'right';

    console.log('context', this.this);
    if (currntPathname == '/' || nextPathname.includes('/detail')) transitionName = 'left';
    this.setState({transitionName});
  }

  devNav() {
    if (__ENV__ == 'DEV') {
      return (
        <ul className="nav">
          {/* <DevTools /> */}
          <li><IndexLink to="/" activeClassName="active">/</IndexLink></li>
          <li><Link to="/list" activeClassName="active">list</Link></li>
          <li><Link to="/detail/1" activeClassName="active">detail</Link></li>
          <li><Link to="/comment/1" activeClassName="active">comment</Link></li>
          <li><Link to="/share/1" activeClassName="active">share</Link></li>
          <li><Link to="/spread" activeClassName="active">spread</Link></li>
        </ul>
      );
    }
  }

  render() {
    const {pathname} = this.props.location;
    return (
      <div>
        <Alert history={this.props.history}/>
        <TransitionGroup transitionName={this.state.transitionName} component="div" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {cloneElement(this.props.children || <div/>, { key: pathname })}
        </TransitionGroup>
      </div>
    );
  }
}

function changeRouteHandle() {
  const {query} = this.state.location;
  const state = store.getState();
  if (query.fromSeed) {
    store.dispatch(fetchFromSeed(query.fromSeed));
    localStorage.setItem('from_seed_id', query.fromSeed);
    localStorage.setItem('from_seed_expire_time', Date.now() + 15 * 60 * 1000);
  }

  const {currentUser} = state.user;
  if (!currentUser || currentUser.id < 0) {
    store.dispatch(fetchCurrentUser());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={changeRouteHandle} >
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/list" component={ListPage}/>
        <Route path="detail/:id" component={DetailPage}/>
        <Route path="/comment/:pmo_grab_id/:order_id" component={CommentPage} />
        <Route path="/share/:evaluation_id" component={SharePage} />
        <Route path="/spread" component={SpreadPage} />
        <Route path="*" component={HomePage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
