import React from 'react';

const LinkIcon = ({ icon, onClick }) => (
  <img src={require(`../../utils/imgs/${icon}`)} onClick={onClick} alt="icon" />
);

export default LinkIcon;
