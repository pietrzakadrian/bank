/**
 *
 * HomePage
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { isLoggedAction } from './actions';

import saga from './saga';

export function HomePage({ isLogged }) {
  useInjectSaga({ key: 'homePage', saga });
  useEffect(() => {
    isLogged();
  }, []);

  return null;
}

HomePage.propTypes = {
  isLogged: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    isLogged: () => dispatch(isLoggedAction()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
