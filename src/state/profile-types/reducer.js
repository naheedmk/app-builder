import { combineReducers } from 'redux';
import {
  SET_PROFILE_TYPES,
  REMOVE_PROFILE_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_PROFILE_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  SET_SELECTED_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_PROFILE_TYPE_REFERENCE_STATUS,
} from 'state/profile-types/types';

import { swapItems } from 'state/attributes/utils';

const toMap = array => array.reduce((acc, profileType) => {
  acc[profileType.code] = profileType;
  return acc;
}, {});

const toIdList = array => array.map(profileType => profileType.code);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPES: {
      return toIdList(action.payload.profileTypes);
    }
    case REMOVE_PROFILE_TYPE: {
      const { profileTypeCode } = action.payload;
      return state.filter(item => item !== profileTypeCode);
    }
    default: return state;
  }
};

const profileTypeMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPES: {
      return toMap(action.payload.profileTypes);
    }
    case REMOVE_PROFILE_TYPE: {
      const { profileTypeCode } = action.payload;
      const newState = { ...state };
      delete newState[profileTypeCode];
      return newState;
    }
    default: return state;
  }
};

export const attributeList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ATTRIBUTES: {
      return action.payload.attributes;
    }
    default: return state;
  }
};

export const selectedProfileType = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PROFILE_TYPE: {
      return action.payload.profileType;
    }
    case SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE: {
      return { ...state, attributeSelected: action.payload.attribute };
    }
    case MOVE_ATTRIBUTE_UP: {
      const { attributeIndex } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeIndex, true),
      };
    }
    case MOVE_ATTRIBUTE_DOWN: {
      const { attributeIndex } = action.payload;
      const { attributes } = state;
      const newState = { ...state };
      return {
        ...newState,
        attributes: swapItems(attributes, attributeIndex, false),
      };
    }
    case REMOVE_ATTRIBUTE: {
      const { attributeCode } = action.payload;
      const attributes =
        state.attributes.filter(f => f.code !== attributeCode);
      return { ...state, attributes };
    }
    default: return state;
  }
};
export const selectedAttribute = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_ATTRIBUTE: {
      return action.payload.attribute;
    }
    default: return state;
  }
};

export const status = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PROFILE_TYPE_REFERENCE_STATUS: {
      return action.payload.profileTypeStatus;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: profileTypeMap,
  selected: selectedProfileType,
  attributes: combineReducers({
    list: attributeList,
    selected: selectedAttribute,
  }),
  references: combineReducers({
    status,
  }),
});
