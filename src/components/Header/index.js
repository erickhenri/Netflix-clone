import React from 'react';
import './Header.css';

export default ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header-logo">
        <a href="/">
          <img src="https://fontmeme.com/permalink/211106/b984f4042d72ae3a3a0b9f4e0b1e990b.png" href="Netflix"></img>
        </a>
      </div>
      <div className="header-user">
        <a href="/">
          <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" alt="Usuário" />
        </a>
      </div>
    </header>
  );
}
