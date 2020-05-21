import React, { Fragment } from 'react';
import spinner from '../../utils/imgs/spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: '200px',
        margin: 'auto',
        display: 'block',
        color: '#000',
        opacity: 0.6,
      }}
    />
  </Fragment>
);

export default Spinner;
