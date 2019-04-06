/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Footer from 'components/Footer';

// Import Material UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  formItem: {
    padding: 10,
    height: 36,

    border: '1px solid grey',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 2,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
  },
  formSubmit: {
    display: 'block',
    margin: '20px auto 0',
    padding: 5,
    height: 36,
    backgroundColor: '#0098db',
    borderRadius: 2,
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },

    '&:hover': {
      backgroundColor: '#15a0dd',
      cursor: 'pointer',
      transition: '0.150s',
    },
  },

  formContainer: {
    textAlign: 'center',
    margin: '15px 0',
    width: '100%',
    backgroundColor: '#f2f4f7',
    padding: '25px 12px',
  },
  formError: {
    border: '1px solid red',
    borderRadius: 2,
  },
  pageContainer: {
    textAlign: 'center',
  },
  alertContainer: {
    maxWidth: '1024px',
    padding: '10px 3%',
    margin: '10px auto 0',
    borderRadius: 2,
    backgroundColor: '#0098db',
    color: 'white',
  },
  messageContainer: {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 130px',
    },
  },
  footerContainer: {
    maxWidth: 550,
    margin: '15px auto',
  },
  textField: {
    margin: '10px auto 0',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    textAlign: 'left',
    fontSize: '18px',
    letterSpacing: 0.3,
  },
  textError: {
    color: 'red',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    margin: '0 auto',
    fontSize: 14.5,
  },
  footerText: {
    textAlign: 'left',
    padding: '0 15px',
    margin: '10px -4px',
  },
  footerInfoText: {
    position: 'relative',
    top: 1,
    fontSize: 13,
  },
  footerAlertText: {
    color: 'red',
    fontSize: 13,
  },
  errorIcon: {
    fontSize: 35,
  },
  footerLink: {
    color: '#0098db',
  },
  buttonText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class NotFoundPage extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <FormattedMessage {...messages.helmetNotFoundPageTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <Header />
        <FormattedMessage {...messages.notFoundPage}>
          {title => <Subheader headerText={title} />}
        </FormattedMessage>

        <div className={classes.pageContainer}>
          <div className={classes.formContainer}>
            <Typography variant="h5">
              <FormattedMessage {...messages.sorryThisPageIsUnavailable} />
            </Typography>
            <FormattedMessage {...messages.sorrySubheader} />
          </div>
        </div>

        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(NotFoundPage));
