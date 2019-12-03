import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  setupDataFromStorage,
  runAddressQualification,
  setServiceQualificationData,
} from '../modules/checkAddress/actions';
import { setLeadDataFromSessionStorage } from '../modules/leads/actions';
import { Helmet } from 'react-helmet';
import {
  setupPath,
  setupOrderStatus,
  handleOrderProcess,
} from '../modules/nbnPlans/actions';
import CheckAddressModal from './components/CheckAddressModal';
import SpeedAvailabilityReport from './components/SpeedAvailabilityReport';
import ScrollToTop from './components/ScrollToTop';
import { isServer } from '../store';
import BurgerMenu from './components/BurgerMenu';
import Header from './containers/header';
import Routes from './containers';
import AddressBar from './components/AddressBar';
import 'react-modal-video/scss/modal-video.scss';
import './app.css';

class App extends Component {
  componentWillMount() {
    if (!isServer) {
      //  this.props.establishCurrentUser();
    }
  }
  componentDidMount() {
    const {
      setupDataFromStorage,
      setupOrderStatus,
      setServiceQualificationData,
      location,
      setupPath,
      setLeadDataFromSessionStorage,
    } = this.props;
    const address = localStorage.getItem('address');
    const directoryId = localStorage.getItem('directoryId');
    const copperPairRecords = JSON.parse(
      localStorage.getItem('copperPairRecords')
    );
    const leadData = JSON.parse(sessionStorage.getItem('leadData'));

    leadData && setLeadDataFromSessionStorage(leadData);

    let addressState = 'DEFAULT';
    const isOrderOwnerDataStored = localStorage.getItem(
      'isOrderOwnerDataStored'
    );
    if (copperPairRecords !== null) {
      const { serviceType } = copperPairRecords;
      addressState = copperPairRecords.addressState;
      const isSaved = [address, serviceType, addressState].every(
        item => item !== null && item.length !== 0
      );
      setupDataFromStorage({
        savedData: { address, addressState, serviceType, directoryId },
        isSaved,
      });
      setServiceQualificationData(copperPairRecords);
    }
    setupOrderStatus(isOrderOwnerDataStored);
    setupPath(location.pathname);
  }

  componentDidUpdate(props) {
    const { location, setupPath, isOrderProcess } = this.props;
    const IsNbnPath = this.props.location.pathname === '/nbn-plans';
    setupPath(location.pathname);
    if (!IsNbnPath && isOrderProcess) {
      this.props.handleOrderProcess();
    }
  }
  render() {
    const { isAuthenticated, location, isOrderProcess } = this.props;
    const IsNbnPath = this.props.location.pathname === '/nbn-plans';
    return (
      <ScrollToTop>
        <div id="app">
          <Helmet>
            <script>
              {`
            var trackByDefault = true;
 
            function acEnableTracking() {
                var expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30);
                document.cookie = "ac_enable_tracking=1; expires= " + expiration + "; path=/";
                acTrackVisit();
            }
             
            function acTrackVisit() {
                var trackcmp_email = '';
                var trackcmp = document.createElement("script");
                trackcmp.async = true;
                trackcmp.type = 'text/javascript';
                trackcmp.src = '//trackcmp.net/visit?actid=89573374&e='+encodeURIComponent(trackcmp_email)+'&r='+encodeURIComponent(document.referrer)+'&u='+encodeURIComponent(window.location.href);
                var trackcmp_s = document.getElementsByTagName("script");
                if (trackcmp_s.length) {
                    trackcmp_s[0].parentNode.appendChild(trackcmp);
                } else {
                    var trackcmp_h = document.getElementsByTagName("head");
                    trackcmp_h.length && trackcmp_h[0].appendChild(trackcmp);
                }
            }
             
            if (trackByDefault || /(^|; )ac_enable_tracking=([^;]+)/.test(document.cookie)) {
                acEnableTracking();
            }
          `}
            </script>
            <script>
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-5H88LQN');

                window['_fs_ready'] = function() {
                  window.fsSessionURL = FS.getCurrentSessionURL();
                  window.fsSessionUrlAtCurrentTime = FS.getCurrentSessionURL(true);
                }
              `}
            </script>
            <noscript>
              {`
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-5H88LQN"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              />
             `}
            </noscript>
          </Helmet>
          <div className="desktop-only">
            <Header
              isAuthenticated={isAuthenticated}
              current={location.pathname}
            />
            {isOrderProcess && IsNbnPath ? null : <AddressBar />}
          </div>
          <div className="mobile-only">
            <BurgerMenu />
            {isOrderProcess && IsNbnPath ? null : <AddressBar />}
          </div>
          <div id="content">
            <Routes />
          </div>
          <CheckAddressModal
            isOpen={this.props.isModalOpened}
            title={'Address'}
          />
          <SpeedAvailabilityReport />
        </div>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isOrderProcess: state.nbnPlansStore.isOrderProcess,
  isModalOpened: state.checkAddressStore.isModalOpened,
});
const mapDispatchToProps = dispatch => ({
  setupDataFromStorage: data => dispatch(setupDataFromStorage(data)),
  setupPath: path => dispatch(setupPath(path)),
  setupOrderStatus: data => dispatch(setupOrderStatus(data)),
  runAddressQualification: directoryId =>
    dispatch(runAddressQualification(directoryId)),
  setServiceQualificationData: data =>
    dispatch(setServiceQualificationData(data)),
  setLeadDataFromSessionStorage: data =>
    dispatch(setLeadDataFromSessionStorage(data)),
  handleOrderProcess: () => dispatch(handleOrderProcess()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
