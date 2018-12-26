import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontSize: 20.5,
    marginTop: -5,
  },
  appBar: {
    boxShadow: 'none', // box-shadow dla header
  },
  toolBar: {
    padding: '0 3%',
    color: 'black', // color dla header
    backgroundColor: 'white', // background color dla header
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // border bottom dla header
    minHeight: '55px!important',
  },
  headerSubheading: {
    fontSize: '12.8px',
    marginTop: '-4px',
    color: '#15a0dd',
  },
};

function headerSubheading(props) {
  const { classes, headerText } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.grow}>{headerText}</div>
          <div>PL / EN / DE</div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

headerSubheading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(headerSubheading);
