import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import AuthenticatedRoute from "../components/authenticated-route";
import UnauthenticatedRoute from '../components/unauthenticated-route';
import Loadable from 'react-loadable';
import { handleOrderProcess } from '../../modules/nbnPlans/actions';
import NotFound from './not-found';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const Home = Loadable({
  loader: () => import('./home'),
  loading: () => null,
  modules: ['home'],
});

const DLink2600 = Loadable({
  loader: () => import('./dlink-2600'),
  loading: () => null,
  modules: ['dlink-2600'],
});

const DLinkDva2800 = Loadable({
  loader: () => import('./dlink-2800'),
  loading: () => null,
  modules: ['dlink-2800'],
});

const DLinkAC750 = Loadable({
  loader: () => import('./dlink-ac750'),
  loading: () => null,
  modules: ['dlink-ac750'],
});

const NbnPlans = Loadable({
  loader: () => import('./nbn-plans'),
  loading: () => null,
  modules: ['nbn-plans'],
});

const NbnExplained = Loadable({
  loader: () => import('./nbn-explained'),
  loading: () => null,
  modules: ['nbn-explained'],
});

const Spread = Loadable({
  loader: () => import('./spread'),
  loading: () => null,
  modules: ['spread'],
});

const Login = Loadable({
  loader: () => import('./login'),
  loading: () => null,
  modules: ['login'],
});

const About = Loadable({
  loader: () => import('./about'),
  loading: () => null,
  modules: ['about'],
});

const Moving = Loadable({
  loader: () => import('./moving'),
  loading: () => null,
  modules: ['moving'],
});

const Speed = Loadable({
  loader: () => import('./nbn-speed'),
  loading: () => null,
  modules: ['speed'],
});

const OrderConfirmation = Loadable({
  loader: () => import('./order-confirmation'),
  loading: () => null,
  modules: ['order-success'],
});

const Trust = Loadable({
  loader: () => import('./trust-pilot'),
  loading: () => null,
  modules: ['trust-pilot'],
});

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/nbn-plans"
      component={NbnPlans}
      onEnter={() => this.props.handleOrderProcess()}
    />
    <Route exact path="/nbn-explained" component={NbnExplained} />
    <Route exact path="/spread" component={Spread} />
    <Route exact path="/moving-nbn" component={Moving} />
    <Route exact path="/speed" component={Speed} />
    <Route exact path="/order-confirmation" component={OrderConfirmation} />
    <Route exact path="/about-us" component={About} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/trustpilot-reviews" component={Trust} />
    <Route exact path="/modems/d-link-dsl2878" component={DLinkAC750} />
    <Route exact path="/modems/dlink-dva-2800" component={DLinkDva2800} />
    <Route exact path="/modems/dlink-viper-2600" component={DLink2600} />
    {/* <UnauthenticatedRoute exact path="/login" component={Login} /> */}
    {/* <AuthenticatedRoute exact path="/logout" component={Logout} /> */}
    <Route component={NotFound} />
  </Switch>
);
