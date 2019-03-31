/*
 *
 * App actions
 *
 */

import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from './constants';

export const enqueueSnackbarAction = notification => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeSnackbarAction = key => ({
  type: REMOVE_SNACKBAR,
  key,
});
