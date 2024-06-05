import React, { useEffect, useState } from 'react'
import axios from '../axios-movies';
import SelectorTypeAnimals from '../components/SelectorTypeAnimals'
import SelectorTypeRefuges from '../components/SelectorRefuges'


const Abandonment: React.FC = () => {

  const [refuges, setRefuges] = useState([])
  const [selectedRefuge, setSelectedRefuge] = useState('')
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState('')

  // Fonction pour charger la liste des refuges depuis l'API
  useEffect(() => {
    axios.get('/api/refuges')
      .then(response => {
        setRefuges(response.data)
      })
      .catch(error => {
        console.error('Error fetching refuges:', error)
      })
  }, [])

  // Fonction pour charger la liste des membres d'un refuge sélectionné depuis l'API
  useEffect(() => {
    if (selectedRefuge) {
      axios.get(`/api/refuges/${selectedRefuge}/members`)
        .then(response => {
          setMembers(response.data)
        })
        .catch(error => {
          console.error('Error fetching members:', error)
        })
    }
  }, [selectedRefuge])

  const handleRefugeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedRefuge(value); // Met à jour l'état local du refuge sélectionné
    setAnimalInfo(prevState => ({
        ...prevState,
        refuge: value // Met à jour l'info de l'animal pour inclure l'ID du refuge sélectionné
    }));
}

const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { value } = e.target;
  setAnimalInfo(prevState => ({
      ...prevState,
      species: value // Assurez-vous que ceci envoie l'ID de l'espèce
  }));
}

  // Fonction pour gérer le changement de membre sélectionné
  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMember = e.target.value
    setSelectedMember(selectedMember)
  }

  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [animalInfo, setAnimalInfo] = useState({
    name: '',
    arrivalDate: '',
    age: '',
    species: '',
    race: '',
    descriptionAnimal: '',
    adoptionFee: '',
    refuge: '',
    caretaker: '',
    urlVideo: '',
    titleVideo: '',
    descriptionVideo: '',
    dateVideo: new Date(), // Date de la vidéo d'arrivée de l'animal (par défaut, la date actuelle)
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setAnimalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowConfirmationModal(true) // Afficher la modale de confirmation
  }

  const handleConfirmSubmit = () => {
    // Préparer les données à envoyer
    const data = {
        nom_animal: animalInfo.name,
        date_arrivee: "2024-04-15 00:00:00",
        age_animal: animalInfo.age,
        race_animal: animalInfo.race,
        desc_animal: animalInfo.descriptionAnimal,
        frais_adoption: animalInfo.adoptionFee,
        id_type: 1, // Assurez-vous que 'species' corresponde à l'ID type attendu par l'API
        id_membre: 1, // Assurez-vous que 'caretaker' contient l'ID du membre
        id_refuge: 2 // Assurez-vous que 'refuge' contient l'ID du refuge
    };

    // Envoyer les données à l'API
    axios.post('/api/add/animals', data)
        .then(response => {
            console.log('Success:', response.data);
            // Réinitialiser le formulaire après envoi réussi
            resetForm();
            setShowConfirmationModal(false); // Fermer la modale de confirmation
        })
        .catch(error => {
            console.error('Error submitting animal:', error);
            alert('Une erreur est survenue lors de l\'envoi des données.');
        });
}

const resetForm = () => {
    setAnimalInfo({
        name: '',
        arrivalDate: '',
        age: '',
        species: '',
        race: '',
        descriptionAnimal: '',
        adoptionFee: '',
        refuge: '',
        caretaker: '',
        urlVideo: '',
        titleVideo: '',
        descriptionVideo: '',
        dateVideo: new Date(),
    });
}

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false) // Fermer la modale de confirmation
  }

  return (
    <>
      <div className="main-content" style={styles.mainContent}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.h1}>Formulaire d'accueil d'un animal au refuge</h1>
          <label style={styles.label}>
            Nom de l'animal :{' '}
            <span style={styles.required}>(obligatoire)</span>
            <input
              type="text"
              name="name"
              value={animalInfo.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <br />
          <label style={styles.label}>
            Date d'arrivée :{' '}
            <span style={styles.required}>(obligatoire)</span>
            <input
              type="date"
              name="arrivalDate"
              value={animalInfo.arrivalDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <br />
          <label style={styles.label}>
            Âge de l'animal :{' '}
            <span style={styles.required}>(estimation en année, obligatoire)</span>
            <input
              type="number"
              min={0}
              name="age"
              value={animalInfo.age}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <br />
          <label style={styles.label}>
            Espèce de l'animal :{' '}
            <span style={styles.required}>(obligatoire)</span>
            <SelectorTypeAnimals onChange={handleSpeciesChange} />
              
          </label>
          <br />
          <label style={styles.label}>
            Race de l'animal :{' '}
            <span style={styles.required}>(obligatoire)</span>
            <input
              type="text"
              name="race"
              value={animalInfo.race}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <br />
          <label style={styles.label}>
            Description de l'animal :
            <textarea
              name="descriptionAnimal"
              value={animalInfo.descriptionAnimal}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Frais d'adoption :{' '}
            <span style={styles.required}>(obligatoire)</span>
            <input
              type="number"
              min={0}
              name="adoptionFee"
              value={animalInfo.adoptionFee}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <br />
          
          <label style={styles.label}>
            Refuge :{' '}
            <span style={styles.required}>(obligatoire)</span>
           <SelectorTypeRefuges/>
          </label>
          <br />
          {/* TODO: choix du membre */}
            <label style={styles.label}>Vidéo d'arrivée de l'animal :{' '}
              <span style={styles.required}>(obligatoire)</span>
              <input
                style={styles.input}
                type="url"
                name="urlVideo"
                value={animalInfo.urlVideo}
                onChange={handleChange}
                placeholder="https://www.youtube.com/iii"
                pattern="https://.*"
                required
              />
            </label>
            <label style={styles.label}>Titre et description de la vidéo:{' '}
              <span style={styles.required}>(obligatoire)</span>
              <input
                style={styles.input}
                type="text"
                name="titleVideo"
                value={animalInfo.titleVideo}
                onChange={handleChange}
                required
              />
              <textarea
              name="descriptionVideo"
              value={animalInfo.descriptionVideo}
              onChange={handleChange}
              style={styles.input}
            />
            </label>
          <br />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f6121d')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E50914')}
          >
            Abandonner mon animal
          </button>
        </form>
      </div>
      {/* Modale de confirmation*/}
      {showConfirmationModal && (
        <div className="confirmation-modal-overlay" style={styles.overlay}>
          <div className="confirmation-modal" style={styles.confirmationModal}>
            <p style={styles.confirmationModalText}>Voulez-vous vraiment abandonner cet animal ?</p>
            <div>
              <button
                onClick={handleConfirmSubmit}
                style={styles.confirmationModalButton}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f6121d')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#999')}
              >
                Confirmer
              </button>
              <button
                onClick={handleCloseConfirmationModal}
                style={styles.confirmationModalButton}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f6121d')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#999')}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  mainContent: {
    maxWidth: '600px',
    margin: '10rem auto 0',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    width: '100%',
  },
  h1: {
    fontSize: '24px',
    margin: '0 auto 20px',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#333',
    fontSize: '18px',
  },
  required: {
    fontSize: '12px',
  },
  input: {
    width: '100%',
    marginTop: '5px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    margin: '0 0 20px',
  },
  // Styles pour la modale de confirmation
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  confirmationModalText: {
    fontSize: '18px',
  },
  confirmationModalButton: {
    backgroundColor: '#999',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
}

export default Abandonment
