import React from 'react'
import ReactPlayer from 'react-player'
interface IBackdrop {
  toggleBackdrop?: () => void
  show: boolean
}

interface IModal extends IBackdrop {
  backgroundImage: string // Cette prop sera l'URL de votre vidéo
  children: JSX.Element
}

const Backdrop = ({ toggleBackdrop, show }: IBackdrop) =>
  show ? <div onClick={toggleBackdrop} className='backdrop'></div> : null

const Modal = ({ show, toggleBackdrop, children, backgroundImage }: IModal) => {
  return (
    <div>
      <Backdrop show={show} toggleBackdrop={toggleBackdrop} />
      {show ? (
        <div className='modal show'>
          <ReactPlayer
            playing={true}
            loop={true}
            width='100%'
            height='100%'
            volume={1}
            muted={true}
            controls={false} // Désactive les contrôles de lecture
            config={{
              // Configure les attributs de la vidéo
              file: {
                attributes: {
                  controlsList: 'nodownload noremoteplayback', // Empêche le téléchargement et la lecture à distance
                  disablePictureInPicture: true, // Empêche le mode picture-in-picture
                },
              },
            }}
            className='header__video'
            url={`${backgroundImage}`}
          />
          <div style={{ zIndex: '1', position: 'relative', height: '100%' }}>{children}</div>
        </div>
      ) : (
        <div className='modal hide'>{children}</div>
      )}
    </div>
  )
}

export default Modal
