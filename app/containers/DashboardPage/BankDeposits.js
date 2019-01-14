import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Import Styles
const styles = theme => ({
  root: {
    padding: 0,
  },
  card: {
    height: 245,
    borderRadius: 0,
  },
  typographyTitle: {
    backgroundColor: '#f7f7f7',
    padding: '10px 25px',
    position: 'relative',
  },
  cardAction: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
  },
});

function BankDeposits({ classes }) {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.root}>
        <Typography
          variant="h6"
          component="h2"
          className={classes.typographyTitle}
        >
          <FormattedMessage {...messages.bankDeposits} />
          <CardActions className={classes.cardAction}>
            <Button size="small">
              <FormattedMessage {...messages.makeTransferBtn} />
            </Button>
          </CardActions>
        </Typography>
        <p>tekst</p>
      </CardContent>
    </Card>
  );
}

BankDeposits.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BankDeposits);
