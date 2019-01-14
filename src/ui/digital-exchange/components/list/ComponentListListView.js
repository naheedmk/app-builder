import React from 'react';
import PropTypes from 'prop-types';
import { componentType } from 'models/digital-exchange/components';

const ComponentListListView = ({ components }) => (
  components.map(component => (
    <div key={component.id}>
      <h2>{component.name}</h2>
      <ul>
        <li> marketplace: {component.digitalExchange} </li>
        <li> rating: {component.rating} </li>
        <li> category: {component.type} </li>
      </ul>
    </div>
  ))
);


ComponentListListView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
};

export default ComponentListListView;