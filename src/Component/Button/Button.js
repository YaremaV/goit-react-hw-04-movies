import React from 'react';
import s from './button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <button onClick={onClick} type="button" className={s.button}>
      &#10094; Back
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
