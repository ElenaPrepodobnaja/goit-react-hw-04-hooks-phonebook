import React from 'react';
import s from '../Contacts/Contacts.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <label htmlFor="search">
    <p className={s.search__label}>Find contacts by name</p>
    <input
      type="search"
      name="search"
      id="search"
      onChange={onChange}
      value={value}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
