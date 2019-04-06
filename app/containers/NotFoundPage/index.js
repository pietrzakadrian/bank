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
  formContainer: {
    textAlign: 'center',
    margin: '15px 0',
    width: '100%',
    backgroundColor: '#f2f4f7',
    padding: '25px 12px',
  },

  pageContainer: {
    textAlign: 'center',
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
