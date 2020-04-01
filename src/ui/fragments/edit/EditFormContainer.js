import { connect } from 'react-redux';

import FragmentForm from 'ui/fragments/common/FragmentForm';
import { sendPutFragment } from 'state/fragments/actions';
import { submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const EDIT_MODE = 'edit';

export const mapStateToProps = () => (
  {
    mode: EDIT_MODE,
  });


export const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: fragment => dispatch(sendPutFragment(fragment)),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('fragment')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_FRAGMENT_LIST)); },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(FragmentForm));
