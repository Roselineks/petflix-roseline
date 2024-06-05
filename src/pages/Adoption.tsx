import React, { useState, useEffect } from 'react';

const Adoption: React.FC = () => {
  // State pour les données du formulaire
  const [formData, setFormData] = useState({
    animalId: '',
    adoptantId: '',
    frais: '',
    dateDebutAdoption: '',
    dateFinAdoption: '',
    dateControle: '',
    
  });

  // State pour stocker les options des animaux et des adoptants
  const [animals, setAnimals] = useState([]);
  const [adoptants, setAdoptants] = useState([]);

  // Fonction pour récupérer les données des animaux et des adoptants depuis la base de données
  const fetchData = async () => {
    try {
      // Récupérer les données des animaux depuis l'API
      const animalResponse = await fetch('/api/animals');
      const animalData = await animalResponse.json();
      setAnimals(animalData);

      // Récupérer les données des adoptants depuis l'API
      const adoptantResponse = await fetch('/api/adoptants');
      const adoptantData = await adoptantResponse.json();
      setAdoptants(adoptantData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Appeler la fonction fetchData lors du premier rendu de la page
  useEffect(() => {
    fetchData();
  }, []);

  // Gestionnaire de changement pour mettre à jour les données du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Si le champ modifié est l'animal sélectionné, mettre à jour la somme payée en fonction du frais d'adoption de l'animal
    if (name === 'animalId') {
      const selectedAnimal = animals.find((animal: any) => animal.id_animal === Number(value));
      if (selectedAnimal) {
        setFormData({
          ...formData,
          [name]: value,
          frais: selectedAnimal.frais_adoption.toString(), // Mettre à jour la somme payée avec le frais d'adoption de l'animal
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Gestionnaire pour soumettre le formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter votre logique pour soumettre les données
    console.log(formData); // Pour l'exemple, affichage des données dans la console
  };

  return (
    <div className='main-content' style={styles.mainContent}>
      <h2 style={styles.h2}>Formulaire d'adoption</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label htmlFor='animalId' style={styles.label}>Animal:</label>
          <select style={styles.input} name='animalId' value={formData.animalId} onChange={handleChange}>
            {/* Options pour sélectionner un animal */}
            {animals.map((animal: any) => (
              <option key={animal.id_animal} value={animal.id_animal}>
                {animal.nom_animal} - {animal.race_animal}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label} htmlFor='adoptantId'>Adoptant:</label>
          <select style={styles.input} name='adoptantId' value={formData.adoptantId} onChange={handleChange}>
            {/* Options pour sélectionner un adoptant */}
            {adoptants.map((adoptant: any) => (
              <option key={adoptant.id_adoptant} value={adoptant.id_adoptant}>
                {adoptant.nom_adoptant} {adoptant.prenom_adoptant}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label} htmlFor='frais'>Frais à régler: 
          <span style={styles.span}> {formData.frais} €</span></label>
        </div>
        <div>
          <label style={styles.label} htmlFor='dateDebutAdoption'>Date de début d'adoption:</label>
          <input style={styles.input} type='date' name='dateDebutAdoption' value={formData.dateDebutAdoption} onChange={handleChange} />
        </div>
        <div>
          <button style={styles.button} type='submit'>Soumettre</button>
        </div>
      </form>
    </div>
  );
};

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
    h2: {
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
    span: {
        marginBottom: '10px',
        color: '#333',
        fontSize: '18px',
    },
    required: {
        fontSize: '12px',
    },
    input: {
        width: '100%',
        marginBottom: '15px',
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
        margin: '10px 0 10px',
    },
};

export default Adoption;
