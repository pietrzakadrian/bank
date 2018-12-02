import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// Import Components
import LoadingCircular from 'components/LoadingCircular';

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
  tableCell: {
    fontSize: theme.spacing.unit * 1.7,
  },
  loadingCircular: {
    display: 'flex',
    height: 193,
    flexDirection: 'row',
  },
});

let id = 0;
function createData(name, protein) {
  id += 1;
  return { id, name, protein };
}
const rows = [
  createData('59 2000 1100 2231 3002 0000 1312 2131', `${140.12} PLN`),
  // createData('59 4141 3123 5555 3242 0000 4433 4333', `${1200.12} PLN`),
  // createData('59 4141 3123 5555 3242 0000 4433 4333', `${1200.12} PLN`),
  // createData('59 4141 3123 5555 3242 0000 4433 4333', `${1200.12} PLN`),
];

class AccountBills extends Component {
  state = {
    accountBills: null,
  };

  // test
  componentDidMount() {
    fetch('https://randomuser.me/api/?format=json&results=1')
      .then(res => res.json())
      .then(json => this.setState({ accountBills: json.results }));
  }

  render() {
    const { classes } = this.props;
    const { accountBills } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.root}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.typographyTitle}
          >
            <FormattedMessage {...messages.bills} />
            <CardActions className={classes.cardAction}>
              <Button size="small">
                <FormattedMessage {...messages.makeTransferBtn} />
              </Button>
            </CardActions>
          </Typography>

          {accountBills ? (
            <Table>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} numeric>
                      {row.protein}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className={classes.loadingCircular}>
              <LoadingCircular />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

AccountBills.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountBills);
