import { 
    makeGridDataSelector,
    makeErrorSelector,
    makePageSizeSelector,
    makeCurrentPageSelector,
    makeTotalCountSelector,
  } from 'containers/HistoryPage/selectors';

  describe('makeGridDataSelector', () => {
    it('should select the makeGridDataSelector', () => {
      const gridDataSelector = makeGridDataSelector();
      const gridData = ["test"];
      const mockedState = {
        historyPage: {
            gridData
        },
      };
      expect(gridDataSelector(mockedState)).toEqual(gridData);
    });
  });

  describe('makeErrorSelector', () => {
    it('should select the makeErrorSelector', () => {
      const errorSelector = makeErrorSelector();
      const error = ["error"];
      const mockedState = {
        historyPage: {
            error
        },
      };
      expect(errorSelector(mockedState)).toEqual(error);
    });
  });

  describe('makePageSizeSelector', () => {
    it('should select the makePageSizeSelector', () => {
      const pageSizeSelector = makePageSizeSelector();
      const pageSize = 1;
      const mockedState = {
        historyPage: {
            pageSize
        },
      };
      expect(pageSizeSelector(mockedState)).toEqual(pageSize);
    });
  });

  describe('makeCurrentPageSelector', () => {
    it('should select the makeCurrentPageSelector', () => {
      const currentPageSelector = makeCurrentPageSelector();
      const currentPage = 1;
      const mockedState = {
        historyPage: {
            currentPage
        },
      };
      expect(currentPageSelector(mockedState)).toEqual(currentPage);
    });
  });

  describe('makeTotalCountSelector', () => {
    it('should select the makeTotalCountSelector', () => {
      const totalCountSelector = makeTotalCountSelector();
      const totalCount = 12;
      const mockedState = {
        historyPage: {
            totalCount
        },
      };
      expect(totalCountSelector(mockedState)).toEqual(totalCount);
    });
  });