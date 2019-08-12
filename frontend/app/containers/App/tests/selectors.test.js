import { 
  makeSelectLocation,
  makeNotificationsSelector,
  makeMessagesSelector,
  makeSnackbarsSelector,
  makeErrorSelector,
  makeIsOpenNavigationMobileSelector,
  makeIsOpenNavigationDesktopSelector,
  makeIsOpenNotificationsSelector,
  makeIsOpenMessagesSelector,
  makeIsNewMessagesSelector,
  makeIsNewNotificationsSelector,
  makeNotificationCountSelector,
  makeMessageCountSelector,
  makeIsOpenMessageModalSelector,
  makeIsLoggedSelector,
} from 'containers/App/selectors';

describe('makeNotificationsSelector', () => {
  it('should select the notifications', () => {
    const notificationSelector = makeNotificationsSelector();
    const notifications = ['test'];
    const mockedState = {
      global: {
        notifications
      },
    };
    expect(notificationSelector(mockedState)).toEqual(notifications);
  });
});

describe('makeMessagesSelector', () => {
  it('should select the messages', () => {
    const messagesSelector = makeMessagesSelector();
    const messages = ['test'];
    const mockedState = {
      global: {
        messages
      },
    };
    expect(messagesSelector(mockedState)).toEqual(messages);
  });
});

describe('makeSnackbarsSelector', () => {
  it('should select the snackbars', () => {
    const snackbarSelector = makeSnackbarsSelector();
    const snackbars = ['test'];
    const mockedState = {
      global: {
        snackbars
      },
    };
    expect(snackbarSelector(mockedState)).toEqual(snackbars);
  });
});

describe('makeErrorSelector', () => {
  it('should select the error', () => {
    const errorSelector = makeErrorSelector();
    const error = "error";
    const mockedState = {
      global: {
        error
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeIsOpenNavigationMobileSelector', () => {
  it('should select the isOpenNavigationMobile', () => {
    const isOpenNavigationMobileSelector = makeIsOpenNavigationMobileSelector();
    const isOpenNavigationMobile = true;
    const mockedState = {
      global: {
        isOpenNavigationMobile
      },
    };
    expect(isOpenNavigationMobileSelector(mockedState)).toEqual(isOpenNavigationMobile);
  });
});

describe('makeIsOpenNavigationDesktopSelector', () => {
  it('should select the isOpenNavigationDesktop', () => {
    const isOpenNavigationDesktopSelector = makeIsOpenNavigationDesktopSelector();
    const isOpenNavigationDesktop = true;
    const mockedState = {
      global: {
        isOpenNavigationDesktop
      },
    };
    expect(isOpenNavigationDesktopSelector(mockedState)).toEqual(isOpenNavigationDesktop);
  });
});

describe('makeIsOpenNotificationsSelector', () => {
  it('should select the makeIsOpenNotificationsSelector', () => {
    const isOpenNotificationsSelector = makeIsOpenNotificationsSelector();
    const isOpenNotifications = true;
    const mockedState = {
      global: {
        isOpenNotifications
      },
    };
    expect(isOpenNotificationsSelector(mockedState)).toEqual(isOpenNotifications);
  });
});

describe('makeIsOpenMessagesSelector', () => {
  it('should select the makeIsOpenMessagesSelector', () => {
    const isOpenMessagesSelector = makeIsOpenMessagesSelector();
    const isOpenMessages = true;
    const mockedState = {
      global: {
        isOpenMessages
      },
    };
    expect(isOpenMessagesSelector(mockedState)).toEqual(isOpenMessages);
  });
});

describe('makeIsNewMessagesSelector', () => {
  it('should select the makeIsNewMessagesSelector', () => {
    const isNewMessagesSelector = makeIsNewMessagesSelector();
    const isNewMessages = true;
    const mockedState = {
      global: {
        isNewMessages
      },
    };
    expect(isNewMessagesSelector(mockedState)).toEqual(isNewMessages);
  });
});

describe('makeIsNewNotificationsSelector', () => {
  it('should select the makeIsNewNotificationsSelector', () => {
    const isNewNotificationsSelector = makeIsNewNotificationsSelector();
    const isNewNotifications = true;
    const mockedState = {
      global: {
        isNewNotifications
      },
    };
    expect(isNewNotificationsSelector(mockedState)).toEqual(isNewNotifications);
  });
});

describe('makeNotificationCountSelector', () => {
  it('should select the makeNotificationCountSelector', () => {
    const notificationCountSelector = makeNotificationCountSelector();
    const notificationCount = 1;
    const mockedState = {
      global: {
        notificationCount
      },
    };
    expect(notificationCountSelector(mockedState)).toEqual(notificationCount);
  });
});

describe('makeMessageCountSelector', () => {
  it('should select the makeMessageCountSelector', () => {
    const messageCountSelector = makeMessageCountSelector();
    const messageCount = 1;
    const mockedState = {
      global: {
        messageCount
      },
    };
    expect(messageCountSelector(mockedState)).toEqual(messageCount);
  });
});

describe('makeIsOpenMessageModalSelector', () => {
  it('should select the makeIsOpenMessageModalSelector', () => {
    const isOpenMessageModalSelector = makeIsOpenMessageModalSelector();
    const isOpenMessageModal = true;
    const mockedState = {
      global: {
        isOpenMessageModal
      },
    };
    expect(isOpenMessageModalSelector(mockedState)).toEqual(isOpenMessageModal);
  });
});

describe('makeIsLoggedSelector', () => {
  it('should select the makeIsLoggedSelector', () => {
    const isLoggedSelector = makeIsLoggedSelector();
    const isLogged = true;
    const mockedState = {
      global: {
        isLogged
      },
    };
    expect(isLoggedSelector(mockedState)).toEqual(isLogged);
  });
});

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(makeSelectLocation()(mockedState)).toEqual(router.location);
  });
});
