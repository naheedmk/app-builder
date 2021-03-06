import { initialize } from 'redux-form';
import { clearErrors } from '@entando/messages';

import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/page-templates/common/PageTemplateFormContainer';
import {
  getPageTemplateFormCellMap,
  getPageTemplateFormErrors,
} from 'state/page-templates/selectors';
import {
  initPageTemplateForm,
  updatePageTemplate,
  createPageTemplate,
} from 'state/page-templates/actions';

jest.mock('state/page-templates/selectors', () =>
  jest.genMockFromModule('state/page-templates/selectors'),);

jest.mock('state/page-templates/actions', () =>
  jest.genMockFromModule('state/page-templates/actions'),);

const routerProps = {
  match: {
    params: {
      pageTemplateCode: 'pageTemplateCode',
    },
  },
};

const ERRORS = [{ id: 'err' }];
const CELL_MAP = { some: 'value' };
const dispatch = jest.fn(() => new Promise(r => r()));

describe('PageTemplateFormContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      getPageTemplateFormCellMap.mockReturnValue(CELL_MAP);
      getPageTemplateFormErrors.mockReturnValue(ERRORS);
      props = mapStateToProps(null); // state is useless since we're using mocked selectors
    });

    it('maps "previewCellMap" prop', () => {
      expect(props).toHaveProperty('previewCellMap', CELL_MAP);
    });

    it('maps "previewErrors" prop', () => {
      expect(props).toHaveProperty('previewErrors', ERRORS);
    });
  });

  describe('mapDispatchToProps (mode = "add")', () => {
    let props;
    const ownProps = {
      ...routerProps,
      mode: 'add',
    };
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, ownProps);
      jest.clearAllMocks();
    });

    it('onSubmit dispatches createPageTemplate action', () => {
      createPageTemplate.mockReturnValue('createPageTemplate_result');
      props.onSubmit({ data: true });
      expect(dispatch).toHaveBeenCalledWith('createPageTemplate_result');
      expect(createPageTemplate).toHaveBeenCalledWith({
        data: true,
        configuration: {},
      });
    });

    it('onWillMount dispatches redux-form initialize action and clearErrors', () => {
      initialize.mockReturnValue('initialize_result');
      props.onWillMount();
      expect(dispatch).toHaveBeenCalledWith('initialize_result');
      expect(initialize).toHaveBeenCalledWith('pageTemplate', {
        configuration: '{\n  "frames": []\n}',
      });
      expect(clearErrors).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps (mode = "edit")', () => {
    let props;
    const ownProps = {
      ...routerProps,
      mode: 'edit',
    };
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, ownProps);
      jest.clearAllMocks();
    });

    it('onSubmit dispatches updatePageTemplate action', () => {
      updatePageTemplate.mockReturnValue('updatePageTemplate_result');
      props.onSubmit({ data: true });
      expect(dispatch).toHaveBeenCalledWith('updatePageTemplate_result');
      expect(updatePageTemplate).toHaveBeenCalledWith({
        data: true,
        configuration: {},
      });
    });

    it('onWillMount dispatches redux-form initialize action and clearErrors', () => {
      initPageTemplateForm.mockReturnValue('initPageTemplateForm_result');
      props.onWillMount();
      expect(dispatch).toHaveBeenCalledWith('initPageTemplateForm_result');
      expect(initPageTemplateForm).toHaveBeenCalledWith('pageTemplateCode');
      expect(clearErrors).toHaveBeenCalled();
    });
  });
});
