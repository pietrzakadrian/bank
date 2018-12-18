/*
 * Payment
 *
 * This is the first page thing users see of our App after logging in, at the '/login' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { FormattedMessage } from 'react-intl';
import withAuth from '../../services/withAuth';
import messages from './messages';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  container: {
    margin: '10px auto',
    width: '1100px',
  },
});

function getSteps() {
  return ['Znajdź odbiorcę', 'Wprowadź kwotę', 'Potwierdź dane'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div style={{ textAlign: 'center' }}>
          <TextField
            id="standard-label"
            label="Nazwa odbiorcy"
            style={{ margin: 8, width: '50%' }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="standard-number"
            label="Numer rachunku"
            type="number"
            style={{ margin: 8, width: '50%' }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>
      );
    case 1:
      return (
        <div style={{ textAlign: 'center' }}>
          <TextField
            id="standard-number"
            label="Kwota pieniędzy"
            type="number"
            style={{ margin: 8, width: '50%' }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

          <TextField
            id="standard-label"
            label="Tytuł przelewu"
            style={{ margin: 8, width: '50%' }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      );
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

class PaymentPage extends Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.container}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

PaymentPage.propTypes = {
  classes: PropTypes.object,
};

export default withAuth(withStyles(styles)(PaymentPage));
