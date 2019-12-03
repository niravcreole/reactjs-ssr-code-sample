import { isServer } from '../store';

export default chargebeeGlobal => {
  const chargebee =
    typeof chargebeeGlobal !== 'undefined'
      ? chargebeeGlobal
      : !isServer && window.Chargebee
      ? window.Chargebee
      : null;
  if (typeof chargebee !== 'undefined' || chargebee !== null) {
    const chargebeeInstance = chargebee.init({
      site: process.env.REACT_APP_CHARGEBEE_SITE || 'australiabroadband',
    });
    return chargebee.getInstance();
  }
  return false;
};
