import React from 'react';
import Image404 from '../static/images/404.png';

const NotFound = () => {
  return (
    <div
      style={{
        color: '#fff',
        backgroundColor: '#000',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundImage: `url(${Image404})`, // Ajoute l'image en arrière-plan
        backgroundRepeat: 'no-repeat', // Empêche la répétition de l'image
        backgroundSize: 'cover', // Couvre toute la zone disponible
        backgroundPosition: 'center', // Centre l'image
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>VOUS VOUS ÊTES PERDU ?</h1>
      <p style={{ fontSize: '22px', marginBottom: '30px', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
        Désolé, nous ne pouvons pas trouver cette page. Vous trouverez beaucoup à explorer sur la
        page d'accueil.
      </p>
      <button
        style={{
          backgroundColor: '#E50914',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          margin: '0 0 20px',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f6121d')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E50914')}
      >
        Accueil Netflix
      </button>
      <span style={{ display: 'block', marginTop: '20px', color: '#bbb', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
        Code d'Erreur <strong>NSES-404</strong>
      </span>
      <span style={{ display: 'block', color: '#bbb', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
        DE <strong>PERDU DANS L'ESPACE</strong>
      </span>
    </div>
  );
};

export default NotFound;
