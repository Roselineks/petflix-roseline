import React, { useState } from 'react'

import MainContent from '../components/MainContent'
import Modal from '../components/Modal'
import ModalMovieDetails from '../components/ModalMovieDetails'
import { IMovieDetails } from '../store/slices/movieDetailsSlice'

const Birds = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>({
    poster_path: '',
    backdrop_path: '',
    nom_type: '' ,
    nom_animal:'',
    date_controle:'',
    nom_adoptant:'',
    adresse_adoptant: '',
    nom_refuge:'',
    id_type: -1,
    
  })

  const selectMovieHandler = async (movie: IMovieDetails) => {
    setToggleModal(true)
    setMovieDetails(movie)
  }

  const closeModal = () => {
    setToggleModal(false)
  }

  return (
    <>
      <div className='main-content'>
        <MainContent selectMovieHandler={selectMovieHandler} />
      </div>
      <Modal
        show={toggleModal}
        toggleBackdrop={closeModal}
        backgroundImage={movieDetails.backdrop_path || movieDetails.poster_path}
      >
        <ModalMovieDetails {...movieDetails} />
      </Modal>
    </>
  )
}

export default Birds
