import React from 'react'

import AddIcon from '../static/images/add.svg'
import PlayIcon from '../static/images/play-button.svg'
import { IMovieDetails } from '../store/slices/movieDetailsSlice'

const MovieDetails = (props: IMovieDetails) => {
  const { // TODO : remplacer par titre de valeurs de la BDD
    name,
    vote_average,
    first_air_date,
    number_of_episodes,
    number_of_seasons,
    overview,
    backdrop_path,
    nom_membre,
    prenom_membre,
    email_membre,
    tel_membre,
  } = props
  console.log(props);
  return (
    <div className='modal__container'>
      <h1 className='modal__title'>{name}</h1>
      <p className='modal__info'>
        <span className='modal__rating'>Sociabilité : {vote_average * 10}% </span>
        Date d'arrivée: {first_air_date}
      </p>
      <p className='modal__overview'>{overview}</p>
      <a href={backdrop_path}>{/* TODO: mettre lien exacte vidéo, url dans BDD  */}
        <button className='modal__btn modal__btn--red'>
          <PlayIcon className='modal__btn--icon' />
          Regarder sur YouTube
        </button>
      </a>
      <br />
      <p className='modal__contact'>Pour rencontrer cette boule d'amour, contactez :</p>
      <a href={'mailto:' + email_membre} className='modal__contact--btn'>
        {prenom_membre} {nom_membre}
        <br />tel : {tel_membre}
        <br />{email_membre}
      </a>
    </div>
  )
}

export default MovieDetails
