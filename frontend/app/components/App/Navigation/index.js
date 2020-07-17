/**
 *
 * Navigation
 *
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

// Import Components
import CardIcon from '@material-ui/icons/CreditCard';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SettingsIcon from '@material-ui/icons/Settings';
import NavLinkWrapper from './NavLinkWrapper';
import Ul from './Ul';
import TextWrapper from './TextWrapper';
import messages from './messages';

// Import Actions
import { toggleNavigationMobileAction } from 'containers/App/actions';

// Import Selectors
import { makeIsOpenNavigationMobileSelector } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenNavigationMobile: makeIsOpenNavigationMobileSelector(),
});

export default function Navigation() {
  const dispatch = useDispatch();
  const onToggleNavigationMobile = () =>
    dispatch(toggleNavigationMobileAction());
  const { isOpenNavigationMobile } = useSelector(stateSelector);

  return (
    <nav>
      <Ul>
        <li>
          <NavLinkWrapper
            onClick={isOpenNavigationMobile ? onToggleNavigationMobile : null}
            to="/dashboard"
          >
            <HomeIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.dashboardItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
        <li>
          <NavLinkWrapper
            to="/payment"
            onClick={isOpenNavigationMobile ? onToggleNavigationMobile : null}
          >
            <SwapVertIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.paymentItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
        <li>
          <NavLinkWrapper
            to="/history"
            onClick={isOpenNavigationMobile ? onToggleNavigationMobile : null}
          >
            <HistoryIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.historyItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
        <li>
          <NavLinkWrapper
            to="/credits"
            disabled
            onClick={e => e.preventDefault()}
          >
            <AccountBalanceIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.creditsItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
        <li>
          <NavLinkWrapper
            to="/deposits"
            disabled
            onClick={e => e.preventDefault()}
          >
            <TrendingUpIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.depositsItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
        <li>
          <NavLinkWrapper
            to="/cards"
            disabled
            onClick={e => e.preventDefault()}
          >
            <CardIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.cardsItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
        <li>
          <NavLinkWrapper
            to="/settings"
            onClick={isOpenNavigationMobile ? onToggleNavigationMobile : null}
          >
            <SettingsIcon className="icon" />
            <TextWrapper>
              <FormattedMessage {...messages.settingsItem} />
            </TextWrapper>
          </NavLinkWrapper>
        </li>
      </Ul>
    </nav>
  );
}
