/**
 *
 * PrivacyPage
 *
 */

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Footer from 'components/Footer';

// Import Material UI
import { withStyles } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  formContainer: {
    textAlign: 'left',
    margin: '15px 0',
    backgroundColor: '#f2f4f7',
    [theme.breakpoints.down('sm')]: {
      padding: '25px 10px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '25px 100px',
    },
  },

  pageContainer: {
    textAlign: 'center',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class PrivacyPage extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <FormattedMessage {...messages.helmetPrivacyTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <Header />
        <FormattedMessage {...messages.privacy}>
          {title => <Subheader headerText={title} />}
        </FormattedMessage>

        <div className={classes.pageContainer}>
          <div className={classes.formContainer}>
            <FormattedMessage {...messages.rodo1} />
            <br />
            <br />
            <FormattedMessage {...messages.rodo2} />
            <br />
            <br />
            <FormattedMessage {...messages.rodo3} />
            <br />
            <br />
            <FormattedMessage {...messages.rodo4} />
          </div>
        </div>

        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(PrivacyPage));
