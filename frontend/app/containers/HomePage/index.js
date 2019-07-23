/**
 *
 * HomePage
 *
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';

// Import Actions
import { isLoggedAction } from './actions';

import saga from './saga';

export default function HomePage() {
  const dispatch = useDispatch();
  const isLogged = () => dispatch(isLoggedAction());

  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    isLogged();
  }, []);

  return null;
}
