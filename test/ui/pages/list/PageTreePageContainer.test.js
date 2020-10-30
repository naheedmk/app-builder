
import { formValueSelector } from 'redux-form';

import { mapStateToProps, mapDispatchToProps } from 'ui/pages/list/PageTreePageContainer';

formValueSelector.mockReturnValue(() => () => 'test');

const FAKE_STATE = {
  locale: 'en',
  pages: {
    map: {},
    childrenMap: {},
    titlesMap: {},
  },
  loading: {},
};

const dispatchMock = jest.fn(() => new Promise(() => {}));

describe('ui/page-tree-page/PageTreePageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps(FAKE_STATE);
      expect(props.locale).toBeDefined();
      expect(props.searchPageCodeToken).toBeDefined();
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
