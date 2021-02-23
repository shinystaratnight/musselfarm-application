import React from 'react';

interface IOwnProps {
  active: boolean;
}

export default ({ active }: IOwnProps) => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M26.4792 24.8327L21.4307 19.7843C21.3351 19.6886 21.2103 19.6387 21.0773 19.6387H20.5283C21.8383 18.1208 22.6326 16.1455 22.6326 13.9831C22.6326 9.20492 18.7609 5.33331 13.9828 5.33331C9.20461 5.33331 5.33301 9.20492 5.33301 13.9831C5.33301 18.7613 9.20461 22.6329 13.9828 22.6329C16.1452 22.6329 18.1205 21.8386 19.6384 20.5286V21.0776C19.6384 21.2106 19.6925 21.3354 19.7839 21.431L24.8324 26.4795C25.0279 26.675 25.3439 26.675 25.5394 26.4795L26.4792 25.5397C26.6747 25.3442 26.6747 25.0282 26.4792 24.8327ZM13.9828 20.6368C10.3066 20.6368 7.32911 17.6592 7.32911 13.9831C7.32911 10.3069 10.3066 7.32941 13.9828 7.32941C17.6589 7.32941 20.6365 10.3069 20.6365 13.9831C20.6365 17.6592 17.6589 20.6368 13.9828 20.6368Z'
      fill={active ? '#07689F' : '#131523'}
    />
  </svg>
);