import React from 'react';
import './Error.scss';
import errorImage from '../errorImg/Error.jpg';

export default function Error({ message }) {
  return (
    <>
      <img className="picture" src={errorImage} alt="sadcat" />
      <p className="param">{message}</p>
    </>
  );
}
