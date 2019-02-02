import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { PieChart, Pie, Cell } from 'recharts';

// Import Components
import Loading from 'components/App/Loading/Loading';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AuthService from '../../services/AuthService';

// Import Styles
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 95,
    boxShadow: 'none',
    border: '1.3px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
    backgroundColor: '#f3f3f3',
    position: 'relative',
  },
  typographyMain: {
    display: 'inline-block',
  },
  loadingCircular: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
  pieChartContainer: {
    position: 'absolute!important',
    right: 20,
    top: 6.5,
    width: '75px!important',
    height: '75px!important',
  },
  typographyText: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.33,
  },
});

class SavedMoney extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      availableFunds: [],
      outgoingTransfersSum: [],
      incomingTransfersSum: [],
      procent: null,
      isNothingTransfersSum: 1
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.availableFunds(this.props.id)
      .then(res => {
        if (res) {
          const procentd =
            (res[0].additionals[0].incoming_transfers_sum * 100) /
              (res[0].additionals[0].incoming_transfers_sum +
                res[0].additionals[0].outgoing_transfers_sum) || 0;

          this.setState({
            isLoading: true,
            outgoingTransfersSum: res[0].additionals[0].outgoing_transfers_sum,
            incomingTransfersSum: res[0].additionals[0].incoming_transfers_sum,
            procent: procentd,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      outgoingTransfersSum,
      incomingTransfersSum,
      isNothingTransfersSum,
      procent,
    } = this.state;

    let id = 0;
    let data;
    let COLORS;

    outgoingTransfersSum == 0 && incomingTransfersSum == 0 ? (
      data = [{ name: 'Group A', value: isNothingTransfersSum },
      ],
      COLORS = ['rgba(0, 0, 0, 0.12)']
    ) : (
      data = [
      { name: 'Group A', value: incomingTransfersSum },
      { name: 'Group B', value: outgoingTransfersSum },
    ],
    COLORS = ['#15a0dd', '#ea0000'])

    return (
      <Paper className={classes.root} elevation={1}>
        {isLoading ? (
          <Fragment>
            <div>
              <Typography variant="subtitle1">Zaoszczędzone środki</Typography>
              <span className={classes.typographyText}>
                {procent.toFixed(1).replace('.', ',')}
                &nbsp;
                <Typography
                  variant="subtitle1"
                  className={classes.typographyMain}
                >
                  %
                </Typography>
              </span>
              <PieChart
                width={200}
                height={200}
                className={classes.pieChartContainer}
              >
                <Pie
                  data={data}
                  dataKey="value"
                  cx={100}
                  cy={100}
                  innerRadius={70}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                >
                  {data.map((entry, index) => (
                    (id += 1),
                    <Cell key={id} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </Fragment>
        ) : (
          <div className={classes.loadingCircular}>
            <Loading />
          </div>
        )}
      </Paper>
    );
  }
}

SavedMoney.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SavedMoney);
