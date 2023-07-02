import React from 'react';

const ButtonComponent = ({ openModal }) => {
  return (
    <button onClick={openModal}>
      Open Modal
    </button>
  );
};

export default ButtonComponent;