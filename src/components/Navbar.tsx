import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useScroll } from '../hooks/useScroll';
import Search from '../static/images/search-icon.svg';
import NetflixLogo from '../static/images/Netflix_Logo_RGB.png';
import BellLogo from '../static/images/bell-logo.svg';
import DropdownArrow from '../static/images/drop-down-arrow.svg';
import DropdownContent from './DropdownContent';

const Navbar = () => {
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [userInput, setUserInput] = useState('');
  const [scrollDimensions] = useScroll();
  const { scrollY } = scrollDimensions;

  const onChange = (event:any) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    if (document.activeElement === searchInput.current && userInput.length === 0) {
      navigate('/browse');
    }
    if (userInput.length > 0) navigate(`/search?q=${userInput}`);
  }, [userInput, searchInput, navigate]);

  const onLogoClick = () => {
    setUserInput('');
    navigate('/');
  };

  return (
    <nav className={'navigation ' + (scrollY > 50 ? 'black' : '')}>
      <ul className='navigation__container'>
        <li onClick={onLogoClick}>
          <img
            className='navigation__container--logo'
            src={NetflixLogo}
            alt='Netflix logo'
            style={{ height: '7vh', marginRight: '1vw', paddingBottom: '1vh', opacity: '0.8' }}
          />
        </li>
        {/* Assume the pseudo-link classes will handle the cursor style to indicate clickable items */}
        <NavLink to="/adopt" className='navigation__container-link pseudo-link'>❤️ J'adopte !</NavLink>
        <NavLink to="/dogs" className='navigation__container-link pseudo-link'>🐕 Chiens</NavLink>
        <NavLink to="/cats" className='navigation__container-link pseudo-link'>🐈 Chats</NavLink>
        <NavLink to="/horses" className='navigation__container-link pseudo-link'>🐎 Chevaux</NavLink>
        <NavLink to="/rabbits" className='navigation__container-link pseudo-link'>🐇 Lapins</NavLink>
        <NavLink to="/rodents" className='navigation__container-link pseudo-link'>🐀 Rongeurs</NavLink>
        <NavLink to="/birds" className='navigation__container-link pseudo-link'>🕊️ Oiseaux</NavLink>
        <NavLink to="/abandonment" className='navigation__container-link pseudo-link'>💔 Je me sépare de mon animal</NavLink>
        <div className='navigation__container--left'>
          <Search className='logo' />
          <input
            ref={searchInput}
            value={userInput}
            onChange={onChange}
            className='navigation__container--left__input'
            type='text'
            placeholder="Recherchez par Nom, Type d'Animal, ou Contact"
          />
        </div>
        <BellLogo className='navigation__container--bellLogo' />
        <DropdownContent />
        <DropdownArrow className='navigation__container--downArrow' />
      </ul>
    </nav>
  );
};

export default Navbar;
