import React, { useState } from 'react'
import TableControls from './TableControls'

interface ControlData { // TODO: modifier les données en fonctions de la BDD 
  date: string
  animalName: string
  adoptantName: string
  adoptantAddress: string
  memberName: string // TODO: nom + prénom ?
}

const Control: React.FC = () => {
  // Supposons que tu aies des données de contrôle dans un tableau appelé controls
  const controls: ControlData[] = [ // TODO: ajouter les données de la BDD
    {
      date: '2022-01-01',
      animalName: 'Fluffy',
      adoptantName: 'John Doe',
      adoptantAddress: '123 Main St',
      memberName: 'Jane Smith'
    },
    {
      date: '2024-10-01',
      animalName: 'Pomme',
      adoptantName: 'Jacob Smith',
      adoptantAddress: '123 Main St',
      memberName: 'Bob Dylan'
    },
    {
      date: '2025-01-01',
      animalName: 'Smaug',
      adoptantName: 'Valentin Dupont',
      adoptantAddress: 'Lille',
      memberName: 'Iris Lefevre'
    },
    {
      date: '2025-01-01',
      animalName: 'Mila',
      adoptantName: 'Valentin Dupont',
      adoptantAddress: 'Lille',
      memberName: 'Iris Lefevre'
    },
    // Add more control data objects as needed
  ]


  // Fonction pour regrouper les contrôles par date et par adoptant
  const groupControls = (): { [key: string]: ControlData[] } => {
    const groupedControls: { [key: string]: ControlData[] } = {}

    // Filtrer les contrôles par date
    const filteredControls = controls.filter(control => new Date(control.date) > new Date())

    // Trier les contrôles par date
    filteredControls.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Regroupement des contrôles
    filteredControls.forEach(control => {
      const key = control.date + '-' + control.adoptantName
      if (groupedControls[key]) {
        groupedControls[key].push(control)
      } else {
        groupedControls[key] = [control]
      }
    })

    return groupedControls
  }

  // Obtenir les contrôles regroupés
  const groupedControls = groupControls()

  // Obtenir les contrôles regroupés triés par date
  const sortedControls = Object.values(groupedControls).sort(
    (a, b) => new Date(a[0].date).getTime() - new Date(b[0].date).getTime()
  )

  return (
    <>
      <div className='main-content' style={styles.mainContent}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date du contrôle</th>
              <th style={styles.th}>Nom des animaux</th>
              <th style={styles.th}>Nom de l'adoptant</th>
              <th style={styles.th}>Adresse de l'adoptant</th>
              <th style={styles.th}>Nom du membre</th>
            </tr>
          </thead>
            <TableControls/>
        </table>
      </div>
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
}

export default Control