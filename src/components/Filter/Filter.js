import React from 'react';
import PropTypes from 'prop-types';
import s from '../styles/Input.module.css';

const Filter = ({ value, onChange }) => (
  <label className={s.Label}>
    Find contacts by name
    <input type="text" value={value} onChange={onChange} className={s.Input} />
  </label>
);

export default Filter;
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
