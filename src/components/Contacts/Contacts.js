import React from 'react';
import s from './Contacts.module.css';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, onDeleteBtnClick }) => (
  <div>
    <ul>
      {contacts.map(person => (
        <li key={person.id} className={s.search__contact}>
          {person.name} : {person.number}
          <button
            className={s.search__button}
            type="button"
            onClick={() => onDeleteBtnClick(person.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteBtnClick: PropTypes.func.isRequired,
};

export default Contacts;
