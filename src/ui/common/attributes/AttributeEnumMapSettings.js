import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required } from '@entando/utils';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';

export const elements = value =>
  (value && !/^(\w+)=([^\s]+)$/i.test(value)
    ? <FormattedMessage id="validateForm.elements" /> : undefined);

const msgs = defineMessages({
  help: {
    id: 'app.enumeratorStaticItemsMap.help',
    defaultMessage: 'Help',
  },
});

const AttributeEnumEnumMapSettings = ({ intl, enumeratorMapExtractorBeans }) => {
  const selectAllowedOptions = enumeratorMapExtractorBeans.map(item => (
    {
      value: item.code,
      text: item.descr,
    }
  ));
  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="app.settings" />
          </legend>
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItems"
            label={
              <FormLabel labelId="app.enumeratorStaticItems" required />
          }
            validate={[required, elements]}
            placeholder={intl.formatMessage(msgs.help)}
          />
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItemsSeparator"
            label={
              <FormLabel labelId="app.enumeratorStaticItemsSeparator" />
            }
          />
          {
            enumeratorMapExtractorBeans.length > 0 ?
              <Field
                component={RenderSelectInput}
                options={selectAllowedOptions}
                defaultOptionId="app.chooseAnOption"
                label={
                  <FormLabel labelId="app.enumeratorExtractorBean" />
              }
                name="enumeratorMapExtractorBeans"
              /> : null
          }

        </fieldset>
      </Col>
    </Row>
  );
};
AttributeEnumEnumMapSettings.propTypes = {
  intl: intlShape.isRequired,
  enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
};

AttributeEnumEnumMapSettings.defaultProps = {
  enumeratorMapExtractorBeans: [],
};


export default injectIntl(AttributeEnumEnumMapSettings);
