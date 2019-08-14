import {
    IS_LOGGED,
    IS_LOGGED_SUCCESS,
    IS_LOGGED_ERROR,
    LOGGED_IN,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    ENQUEUE_SNACKBAR,
    REMOVE_SNACKBAR,
    TOGGLE_NAVIGATION_DESKTOP,
    TOGGLE_NAVIGATION_MOBILE,
    TOGGLE_MESSAGES,
    TOGGLE_NOTIFICATIONS,
    CHECK_NEW_MESSAGES,
    CHECK_NEW_MESSAGES_SUCCESS,
    CHECK_NEW_MESSAGES_ERROR,
    CHECK_NEW_NOTIFICATIONS,
    CHECK_NEW_NOTIFICATIONS_SUCCESS,
    CHECK_NEW_NOTIFICATIONS_ERROR,
    GET_NEW_NOTIFICATIONS,
    GET_NEW_NOTIFICATIONS_SUCCESS,
    GET_NEW_NOTIFICATIONS_ERROR,
    UNSET_NEW_NOTIFICATIONS,
    UNSET_NEW_NOTIFICATIONS_SUCCESS,
    UNSET_NEW_NOTIFICATIONS_ERROR,
    GET_NEW_MESSAGES,
    GET_NEW_MESSAGES_SUCCESS,
    GET_NEW_MESSAGES_ERROR,
    UNSET_NEW_MESSAGES,
    UNSET_NEW_MESSAGES_SUCCESS,
    UNSET_NEW_MESSAGES_ERROR,
    UNSET_MANUAL_NEW_NOTIFICATIONS,
    UNSET_MANUAL_NEW_MESSAGES,
    TOGGLE_MESSAGE_MODAL,
  } from './constants';

import {
    checkNewMessagesAction,
    checkNewMessagesSuccessAction,
    checkNewMessagesErrorAction,
    checkNewNotificationsAction,
    checkNewNotificationsSuccessAction,
    checkNewNotificationsErrorAction,
    getNewNotificationsAction,
    getNewNotificationsSuccessAction,
    getNewNotificationsErrorAction,
    getNewMessagesAction,
    getNewMessagesSuccessAction,
    getNewMessagesErrorAction,
    unsetNewNotificationsAction,
    unsetNewNotificationsSuccessAction,
    unsetNewNotificationsErrorAction,
    unsetNewMessagesAction,
    unsetNewMessagesSuccessAction,
    unsetNewMessagesErrorAction,
    unsetManualNewNotificationsAction,
    unsetManualNewMessagesAction, 
    isLoggedAction, 
    isLoggedSuccessAction,
    isLoggedErroAction,
    loggedInAction,
    logoutAction, 
    logoutSuccessAction,
    logoutErrorAction,
    toggleNavigationDesktopAction,
    toggleNavigationMobileAction,
    toggleMessagesAction,
    toggleMessageModalAction,
    toggleNotificationsAction,
    enqueueSnackbarAction,
    removeSnackbarAction
} from '../actions';

describe('App Actions', () => {
  describe('checkNewMessagesAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHECK_NEW_MESSAGES,
      };

      expect(checkNewMessagesAction()).toEqual(expectedResult);
    });
  });

  describe('checkNewMessagesSuccessAction', () => {
    it('should return the correct type and the data', () => {
      const messageCount = 1;
      const isNewMessage = true;
      const expectedResult = {
        type: CHECK_NEW_MESSAGES_SUCCESS,
        messageCount,
        isNewMessage,
      };

      expect(checkNewMessagesSuccessAction(messageCount, isNewMessage)).toEqual(expectedResult);
    });
  });

  describe('checkNewMessagesErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: CHECK_NEW_MESSAGES_ERROR,
        error,
      };

      expect(checkNewMessagesErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('checkNewNotificationsAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHECK_NEW_NOTIFICATIONS,
      };

      expect(checkNewNotificationsAction()).toEqual(expectedResult);
    });
  });

  describe('checkNewMessagesSuccessAction', () => {
    it('should return the correct type and the data', () => {
      const notificationCount = 1;
      const expectedResult = {
        type: CHECK_NEW_NOTIFICATIONS_SUCCESS,
        notificationCount,
      };

      expect(checkNewNotificationsSuccessAction(notificationCount)).toEqual(expectedResult);
    });
  });

  describe('checkNewNotificationsErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: CHECK_NEW_NOTIFICATIONS_ERROR,
        error,
      };

      expect(checkNewNotificationsErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('getNewNotificationsAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_NEW_NOTIFICATIONS,
      };

      expect(getNewNotificationsAction()).toEqual(expectedResult);
    });
  });

  describe('getNewNotificationsSuccessAction', () => {
    it('should return the correct type and the data', () => {
      const notifications = ["test"];
      const expectedResult = {
        type: GET_NEW_NOTIFICATIONS_SUCCESS,
        notifications,
      };

      expect(getNewNotificationsSuccessAction(notifications)).toEqual(expectedResult);
    });
  });

  describe('getNewNotificationsErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: GET_NEW_NOTIFICATIONS_ERROR,
        error,
      };

      expect(getNewNotificationsErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('getNewMessagesAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_NEW_MESSAGES,
      };

      expect(getNewMessagesAction()).toEqual(expectedResult);
    });
  });

  describe('getNewMessagesSuccessAction', () => {
    it('should return the correct type and the data', () => {
      const notifications = ["test"];
      const expectedResult = {
        type: GET_NEW_MESSAGES_SUCCESS,
        notifications,
      };

      expect(getNewMessagesSuccessAction(notifications)).toEqual(expectedResult);
    });
  });

  describe('getNewMessagesErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: GET_NEW_MESSAGES_ERROR,
        error,
      };

      expect(getNewMessagesErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('unsetNewNotificationsAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_NEW_NOTIFICATIONS,
      };

      expect(unsetNewNotificationsAction()).toEqual(expectedResult);
    });
  });

  describe('unsetNewNotificationsSuccessAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_NEW_NOTIFICATIONS_SUCCESS,
      };

      expect(unsetNewNotificationsSuccessAction()).toEqual(expectedResult);
    });
  });

  describe('unsetNewNotificationsErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: UNSET_NEW_NOTIFICATIONS_ERROR,
        error,
      };

      expect(unsetNewNotificationsErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('unsetNewMessagesAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_NEW_MESSAGES,
      };

      expect(unsetNewMessagesAction()).toEqual(expectedResult);
    });
  });

  describe('unsetNewMessagesSuccessAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_NEW_MESSAGES_SUCCESS,
      };

      expect(unsetNewMessagesSuccessAction()).toEqual(expectedResult);
    });
  });

  describe('unsetNewMessagesErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: UNSET_NEW_MESSAGES_ERROR,
        error,
      };

      expect(unsetNewMessagesErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('unsetManualNewNotificationsAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_MANUAL_NEW_NOTIFICATIONS,
      };

      expect(unsetManualNewNotificationsAction()).toEqual(expectedResult);
    });
  });

  describe('unsetManualNewMessagesAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_MANUAL_NEW_MESSAGES,
      };

      expect(unsetManualNewMessagesAction()).toEqual(expectedResult);
    });
  });

  describe('isLoggedAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: IS_LOGGED,
      };

      expect(isLoggedAction()).toEqual(expectedResult);
    });
  });

  describe('isLoggedSuccessAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: IS_LOGGED_SUCCESS,
      };

      expect(isLoggedSuccessAction()).toEqual(expectedResult);
    });
  });

  describe('isLoggedErroAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: IS_LOGGED_ERROR,
      };

      expect(isLoggedErroAction()).toEqual(expectedResult);
    });
  });

  describe('loggedInAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGGED_IN,
      };

      expect(loggedInAction()).toEqual(expectedResult);
    });
  });

  describe('logoutAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGOUT,
      };

      expect(logoutAction()).toEqual(expectedResult);
    });
  });

  describe('logoutSuccessAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGOUT_SUCCESS,
      };

      expect(logoutSuccessAction()).toEqual(expectedResult);
    });
  });

  describe('logoutErrorAction', () => {
    it('should return the correct type and the error', () => {
      const error = "error";
      const expectedResult = {
        type: LOGOUT_ERROR,
        error
      };

      expect(logoutErrorAction(error)).toEqual(expectedResult);
    });
  });

  describe('toggleNavigationDesktopAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_NAVIGATION_DESKTOP,
      };

      expect(toggleNavigationDesktopAction()).toEqual(expectedResult);
    });
  });

  describe('toggleNavigationMobileAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_NAVIGATION_MOBILE,
      };

      expect(toggleNavigationMobileAction()).toEqual(expectedResult);
    });
  });

  describe('toggleMessagesAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_MESSAGES,
      };

      expect(toggleMessagesAction()).toEqual(expectedResult);
    });
  });

  describe('toggleMessageModalAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_MESSAGE_MODAL,
      };

      expect(toggleMessageModalAction()).toEqual(expectedResult);
    });
  });

  describe('toggleNotificationsAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_NOTIFICATIONS,
      };

      expect(toggleNotificationsAction()).toEqual(expectedResult);
    });
  });

  describe('enqueueSnackbarAction', () => {
    it('should return the correct type and the data', () => {
      const snackbar = {snackkar: ['dkey']};
      const expectedResult = {
        type: ENQUEUE_SNACKBAR,
        snackbar,
      };

      expect(enqueueSnackbarAction()).toEqual(expectedResult);
    });
  });

  describe('removeSnackbarAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: REMOVE_SNACKBAR,
      };

      expect(removeSnackbarAction()).toEqual(expectedResult);
    });
  });
  
});