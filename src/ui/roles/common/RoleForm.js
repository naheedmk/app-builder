import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { required, maxLength, code } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import PermissionGrid from 'ui/roles/common/PermissionGrid';

export const maxLength50 = maxLength(50);
export const maxLength20 = maxLength(20);

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const msgs = defineMessages({
  appName: {
    id: 'app.name',
    defaultMessage: 'Name',
  },
  appCode: {
    id: 'app.code',
    defaultMessage: 'Code',
  },
});

export class RoleFormBody extends Component {
  constructor(props) {
    super(props);
    this.handleToggleSuperuser = this.handleToggleSuperuser.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  handleToggleSuperuser(superuserToggled) {
    const { onToggleSuperuser, permissions } = this.props;
    onToggleSuperuser({ superuserToggled, permissions });
  }

  render() {
    const {
      intl, invalid, submitting, mode, onChangeName, permissions, loading, superuserToggled,
    } = this.props;

    const isEdit = mode === EDIT_MODE;

    return (
      <form onSubmit={this.onSubmit} className="RoleForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="RoleForm__required-fields text-right">
                  * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="name"
                label={<FormLabel labelId="app.name" helpId="role.name.help" required />}
                placeholder={intl.formatMessage(msgs.appName)}
                validate={[required, maxLength50]}
                onChange={(ev) => { if (onChangeName) onChangeName(ev.currentTarget.value); }}
              />
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="app.code" helpId="role.code.help" required />}
                placeholder={intl.formatMessage(msgs.appCode)}
                validate={[required, maxLength20, code]}
                disabled={isEdit}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="RoleForm__permissions">
                  <FormattedMessage id="app.permissions" />
                </div>
              </legend>
              <PermissionGrid
                permissions={permissions}
                loading={loading}
                onToggleSuperuser={this.handleToggleSuperuser}
                superuserToggled={superuserToggled}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

RoleFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  onChangeName: PropTypes.func,
  onWillMount: PropTypes.func,
  onToggleSuperuser: PropTypes.func.isRequired,
  superuserToggled: PropTypes.bool.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.shape({
    descr: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
};

RoleFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  onChangeName: null,
  onWillMount: null,
  permissions: [],
  loading: false,
};

const RoleForm = reduxForm({
  form: 'role',
})(RoleFormBody);

export default injectIntl(RoleForm);
