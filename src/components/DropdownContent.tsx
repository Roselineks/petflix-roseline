import React from 'react';
import { NavLink } from 'react-router-dom';

const dropdownContent = () => (
  <div className="dropdownContainer">
    <div className="navigation__container--userLogo">
      <div className="dropdownContent">
        <div>
          <div className="dropdownContent--user"></div>
          <p className="dropdownContent--user-text">Maxence Norroy</p>
        </div>
        <div>
          <div className="dropdownContent--user dropdownContent--user-2"></div>
          <p className="dropdownContent--user-text">Timothé Deschildre</p>
        </div>
        <div>
          <div className="dropdownContent--user dropdownContent--user-3"></div>
          <p className="dropdownContent--user-text">Aurore Philippe</p>
        </div>
        <p className="dropdownContent-text">Gérer Profils</p>
        <NavLink to="/control" className='navigation__container-link pseudo-link dropdownContent-text'>Prochains contrôles</NavLink>
      </div>
      <div className="dropdownContent dropdownContent--2">
        <NavLink to="/adoption" className='navigation__container-link pseudo-link dropdownContent-text'>Réaliser une adoption</NavLink>
        <p className="dropdownContent-textOutside">Aide</p>
        <p className="dropdownContent-textOutside">Déconnecter de Petflix</p>
      </div>
    </div>
  </div>
);

export default dropdownContent;
