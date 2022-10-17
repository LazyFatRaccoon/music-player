import React from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ setLibraryIsOpen, libraryIsOpen }) => {
  return (
    <nav className={style.nav}>
      <button onClick={() => setLibraryIsOpen(!libraryIsOpen)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
