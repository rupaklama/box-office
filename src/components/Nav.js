import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
const Nav = () => {
  return (
    <div>
      <ul>
        {LINKS.map(item => {
          const { to, text } = item;

          return (
            <li key={to}>
              <Link to={to}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(Nav);
