import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { PieChart, Pie, Cell } from 'recharts';

// Import Components
import Loading from 'components/App/Loading';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import { makeUserIdSelector } from 'containers/App/selectors';
import messages from './messages';

import {
  getOutgoingTransfersSumAction,
  getIncomingTransfersSumAction,
} from './actions';
import {
  makeIncomingTransfersSumSelector,
  makeOutgoingTransfersSumSelector,
} from './selectors';

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
class Savings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      COLORS: null,
      procent: null,
    };

    this.handleWidgetData = this.handleWidgetData.bind(this);
  }

  componentDidMount() {
    this.props.incomingTransfersSum || this.props.outgoingTransfersSum
      ? this.handleWidgetData()
      : this.props.getTransfersSumData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.outgoingTransfersSum !== this.props.outgoingTransfersSum ||
      prevProps.incomingTransfersSum !== this.props.incomingTransfersSum
    )
      this.handleWidgetData();
  }

  handleWidgetData() {
    if (this.props.outgoingTransfersSum || this.props.incomingTransfersSum) {
      if (
        this.props.outgoingTransfersSum === 0 &&
        this.props.incomingTransfersSum === 0
      ) {
        this.setState({
          data: [{ name: 'Group A', value: 1 }],
          COLORS: ['rgba(0, 0, 0, 0.12)'],
          procent: 0,
        });
      } else {
        this.setState({
          data: [
            {
              name: 'Group A',
              value: this.props.incomingTransfersSum,
            },
            {
              name: 'Group B',
              value: this.props.outgoingTransfersSum,
            },
          ],
          COLORS: ['#15a0dd', '#ea0000'],
          procent:
            (this.props.incomingTransfersSum * 100) /
              (parseFloat(this.props.incomingTransfersSum) +
                parseFloat(this.props.outgoingTransfersSum)) || 0,
        });
      }
    }
  }

  render() {
    const { classes, outgoingTransfersSum, incomingTransfersSum } = this.props;
    const { data, COLORS, procent } = this.state;
    const socket = socketIOClient('/');

    try {
      socket.on('new notification', id => {
        id === this.props.userId ? this.props.getTransfersSumData() : null;
      });
    } catch (e) {
      /* just ignore */
    }

    return (
      <Paper className={classes.root} elevation={1}>
        {data &&
        COLORS &&
        (procent || procent === 0) &&
        (outgoingTransfersSum || incomingTransfersSum) ? (
          <Fragment>
            <div>
              <Typography variant="subtitle1">
                <FormattedMessage {...messages.savings} />
              </Typography>
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
                  {data.map((entry, index, id) => (
                    <Cell key={id++} fill={COLORS[index % COLORS.length]} />
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

Savings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  incomingTransfersSum: makeIncomingTransfersSumSelector(),
  outgoingTransfersSum: makeOutgoingTransfersSumSelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransfersSumData: () => {
      dispatch(getOutgoingTransfersSumAction()) &&
        dispatch(getIncomingTransfersSumAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(Savings);
